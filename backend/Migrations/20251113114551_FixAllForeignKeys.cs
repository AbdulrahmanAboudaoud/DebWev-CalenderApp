using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FixAllForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventParticipations_Employees_EmployeeUserId",
                table: "EventParticipations");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Employees_CreatorUserId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupMemberships_Employees_EmployeeUserId",
                table: "GroupMemberships");

            migrationBuilder.DropForeignKey(
                name: "FK_OfficeAttendances_Employees_EmployeeUserId",
                table: "OfficeAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_Employees_EmployeeUserId",
                table: "RoomBookings");

            migrationBuilder.DropIndex(
                name: "IX_RoomBookings_EmployeeUserId",
                table: "RoomBookings");

            migrationBuilder.DropIndex(
                name: "IX_OfficeAttendances_EmployeeUserId",
                table: "OfficeAttendances");

            migrationBuilder.DropIndex(
                name: "IX_GroupMemberships_EmployeeUserId",
                table: "GroupMemberships");

            migrationBuilder.DropIndex(
                name: "IX_Events_CreatorUserId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_EventParticipations_EmployeeUserId",
                table: "EventParticipations");

            migrationBuilder.DropColumn(
                name: "EmployeeUserId",
                table: "RoomBookings");

            migrationBuilder.DropColumn(
                name: "EmployeeUserId",
                table: "OfficeAttendances");

            migrationBuilder.DropColumn(
                name: "EmployeeUserId",
                table: "GroupMemberships");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "EmployeeUserId",
                table: "EventParticipations");

            migrationBuilder.CreateIndex(
                name: "IX_RoomBookings_UserId",
                table: "RoomBookings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeAttendances_UserId",
                table: "OfficeAttendances",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_CreatedBy",
                table: "Events",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_EventParticipations_UserId",
                table: "EventParticipations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventParticipations_Employees_UserId",
                table: "EventParticipations",
                column: "UserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Employees_CreatedBy",
                table: "Events",
                column: "CreatedBy",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMemberships_Employees_UserId",
                table: "GroupMemberships",
                column: "UserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OfficeAttendances_Employees_UserId",
                table: "OfficeAttendances",
                column: "UserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_Employees_UserId",
                table: "RoomBookings",
                column: "UserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventParticipations_Employees_UserId",
                table: "EventParticipations");

            migrationBuilder.DropForeignKey(
                name: "FK_Events_Employees_CreatedBy",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupMemberships_Employees_UserId",
                table: "GroupMemberships");

            migrationBuilder.DropForeignKey(
                name: "FK_OfficeAttendances_Employees_UserId",
                table: "OfficeAttendances");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_Employees_UserId",
                table: "RoomBookings");

            migrationBuilder.DropIndex(
                name: "IX_RoomBookings_UserId",
                table: "RoomBookings");

            migrationBuilder.DropIndex(
                name: "IX_OfficeAttendances_UserId",
                table: "OfficeAttendances");

            migrationBuilder.DropIndex(
                name: "IX_Events_CreatedBy",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_EventParticipations_UserId",
                table: "EventParticipations");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeUserId",
                table: "RoomBookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeUserId",
                table: "OfficeAttendances",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeUserId",
                table: "GroupMemberships",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CreatorUserId",
                table: "Events",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeUserId",
                table: "EventParticipations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RoomBookings_EmployeeUserId",
                table: "RoomBookings",
                column: "EmployeeUserId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficeAttendances_EmployeeUserId",
                table: "OfficeAttendances",
                column: "EmployeeUserId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMemberships_EmployeeUserId",
                table: "GroupMemberships",
                column: "EmployeeUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_CreatorUserId",
                table: "Events",
                column: "CreatorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_EventParticipations_EmployeeUserId",
                table: "EventParticipations",
                column: "EmployeeUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventParticipations_Employees_EmployeeUserId",
                table: "EventParticipations",
                column: "EmployeeUserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Employees_CreatorUserId",
                table: "Events",
                column: "CreatorUserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMemberships_Employees_EmployeeUserId",
                table: "GroupMemberships",
                column: "EmployeeUserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OfficeAttendances_Employees_EmployeeUserId",
                table: "OfficeAttendances",
                column: "EmployeeUserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_Employees_EmployeeUserId",
                table: "RoomBookings",
                column: "EmployeeUserId",
                principalTable: "Employees",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
