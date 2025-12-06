namespace backend.DTOs;

// DTO for creating a new event
public record CreateEventDto(
    string Title,
    string Location,
    string Description,
    DateTime StartTime,
    DateTime EndTime,
    int CreatedBy
);

// DTO for updating an existing event
public record UpdateEventDto(
    string Title,
    string Location,
    string Description,
    DateTime StartTime,
    DateTime EndTime
);
