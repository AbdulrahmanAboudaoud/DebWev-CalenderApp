namespace backend.DTOs
{
    public record RoomDto(int roomId, string roomName, int capacity, string location)
    {
        int RoomId = roomId;
        string RoomName = roomName;
        int Capacity = capacity;
        string Location = location;
    }

    public record CreateRoomDto(string RoomName, int Capacity, string Location);
    public record UpdateRoomDto(string RoomName, int Capacity, string Location);
}