using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class RequestLog
{
    [Key]
    public int Id { get; set; }
    public string Method { get; set; } = "";
    public string Path { get; set; } = "";
    public int StatusCode { get; set; }
    public DateTime Timestamp { get; set; }
}
