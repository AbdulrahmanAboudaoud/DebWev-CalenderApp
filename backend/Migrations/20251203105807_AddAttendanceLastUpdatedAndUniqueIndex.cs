using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddAttendanceLastUpdatedAndUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OfficeAttendances_UserId",
                table: "OfficeAttendances");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "OfficeAttendances",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_OfficeAttendances_UserId_Date",
                table: "OfficeAttendances",
                columns: new[] { "UserId", "Date" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OfficeAttendances_UserId_Date",
                table: "OfficeAttendances");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "OfficeAttendances");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeAttendances_UserId",
                table: "OfficeAttendances",
                column: "UserId");
        }
    }
}
