using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class AddContactPeopleToOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuyerContactPersonId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SupplierContactPersonId",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TransporterContactPersonId",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BuyerContactPersonId",
                table: "Orders",
                column: "BuyerContactPersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_SupplierContactPersonId",
                table: "Orders",
                column: "SupplierContactPersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_TransporterContactPersonId",
                table: "Orders",
                column: "TransporterContactPersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_BuyerContactPersonId",
                table: "Orders",
                column: "BuyerContactPersonId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_SupplierContactPersonId",
                table: "Orders",
                column: "SupplierContactPersonId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_TransporterContactPersonId",
                table: "Orders",
                column: "TransporterContactPersonId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_BuyerContactPersonId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_SupplierContactPersonId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_TransporterContactPersonId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_BuyerContactPersonId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_SupplierContactPersonId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_TransporterContactPersonId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BuyerContactPersonId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SupplierContactPersonId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TransporterContactPersonId",
                table: "Orders");
        }
    }
}
