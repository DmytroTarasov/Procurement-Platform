FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 8080

COPY "ProcurementPlatform.sln" "ProcurementPlatform.sln"
COPY "API/API.csproj" "API/API.csproj"
COPY "Application/Application.csproj" "Application/Application.csproj"
COPY "Infrastructure/Infrastructure.csproj" "Infrastructure/Infrastructure.csproj"
COPY "Domain/Domain.csproj" "Domain/Domain.csproj"
RUN dotnet restore "ProcurementPlatform.sln"

COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]


