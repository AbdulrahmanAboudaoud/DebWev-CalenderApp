namespace backend.DTOs
{
    public record RoomDtos(int roomId, string roomName, int capacity, string location)
    {
        int RoomId = roomId;
        string RoomName = roomName;
        int Capacity = capacity;
        string Location = location;
    }
}