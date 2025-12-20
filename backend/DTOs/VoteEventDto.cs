namespace backend.DTOs;

// DTO for creating a new vote event
public record CreateVoteEventDto(
    string Title,
    string Location,
    string Description,
    DateTime StartTime,
    DateTime EndTime,
    int CreatedBy
);

// DTO for updating an existing vote event
public record UpdateVoteEventDto(
    string Title,
    string Location,
    string Description,
    DateTime StartTime,
    DateTime EndTime
);
