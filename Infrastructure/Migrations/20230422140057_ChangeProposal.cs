using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class ChangeProposal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proposals_AspNetUsers_TransporterId",
                table: "Proposals");

            migrationBuilder.AlterColumn<decimal>(
                name: "TransporterSum",
                table: "Proposals",
                type: "numeric",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<int>(
                name: "TransporterId",
                table: "Proposals",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Proposals",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SupplierAdditionalInfo",
                table: "Proposals",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransporterAdditionalInfo",
                table: "Proposals",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Proposals_AspNetUsers_TransporterId",
                table: "Proposals",
                column: "TransporterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proposals_AspNetUsers_TransporterId",
                table: "Proposals");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Proposals");

            migrationBuilder.DropColumn(
                name: "SupplierAdditionalInfo",
                table: "Proposals");

            migrationBuilder.DropColumn(
                name: "TransporterAdditionalInfo",
                table: "Proposals");

            migrationBuilder.AlterColumn<decimal>(
                name: "TransporterSum",
                table: "Proposals",
                type: "numeric",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "numeric",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TransporterId",
                table: "Proposals",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Proposals_AspNetUsers_TransporterId",
                table: "Proposals",
                column: "TransporterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
