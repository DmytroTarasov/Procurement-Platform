using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class MakeRequestOrderIdOptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Subdivisions_SubdivisionId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "Requests",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Subdivisions_SubdivisionId",
                table: "AspNetUsers",
                column: "SubdivisionId",
                principalTable: "Subdivisions",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Subdivisions_SubdivisionId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "Requests",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Subdivisions_SubdivisionId",
                table: "AspNetUsers",
                column: "SubdivisionId",
                principalTable: "Subdivisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
