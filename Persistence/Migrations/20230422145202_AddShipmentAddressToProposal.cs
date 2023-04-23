using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class AddShipmentAddressToProposal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShipmentAddressId",
                table: "Proposals",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Proposals_ShipmentAddressId",
                table: "Proposals",
                column: "ShipmentAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Proposals_Addresses_ShipmentAddressId",
                table: "Proposals",
                column: "ShipmentAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proposals_Addresses_ShipmentAddressId",
                table: "Proposals");

            migrationBuilder.DropIndex(
                name: "IX_Proposals_ShipmentAddressId",
                table: "Proposals");

            migrationBuilder.DropColumn(
                name: "ShipmentAddressId",
                table: "Proposals");
        }
    }
}
