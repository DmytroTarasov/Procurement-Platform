using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class MakeProposalShipmentAddressOptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proposals_Addresses_ShipmentAddressId",
                table: "Proposals");

            migrationBuilder.AlterColumn<int>(
                name: "ShipmentAddressId",
                table: "Proposals",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Proposals_Addresses_ShipmentAddressId",
                table: "Proposals",
                column: "ShipmentAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proposals_Addresses_ShipmentAddressId",
                table: "Proposals");

            migrationBuilder.AlterColumn<int>(
                name: "ShipmentAddressId",
                table: "Proposals",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Proposals_Addresses_ShipmentAddressId",
                table: "Proposals",
                column: "ShipmentAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
