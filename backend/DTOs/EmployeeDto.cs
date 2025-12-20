namespace backend.DTOs
{
    public record EmployeeDto(string name, string email, string role, string department, string password)
    {
        string Name = name;
        string Email = email;
        string Role = role;
        string Department = department;
        string Password = password;
    }
}