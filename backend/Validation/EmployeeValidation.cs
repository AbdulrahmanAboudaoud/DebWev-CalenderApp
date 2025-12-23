// Validation/EmployeeValidation.cs
using backend.Models;
using FluentValidation;

namespace backend.Validation;

public class EmployeeValidation : AbstractValidator<Employee>
{
    public EmployeeValidation()
    {
        RuleFor(e => e.Name)
            .NotEmpty().WithMessage("Name is required")
            .Length(2, 50).WithMessage("Name must be between 2 and 50 characters")
            .Matches(@"^[a-zA-Z\s]+$").WithMessage("Name can only contain letters and spaces");

        RuleFor(e => e.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Valid email address is required")
            .MaximumLength(100).WithMessage("Email cannot exceed 100 characters");

        RuleFor(e => e.Role)
            .NotEmpty().WithMessage("Role is required")
            .Must(BeAValidRole).WithMessage("Role must be one of: Admin, Employee, Manager");

        RuleFor(e => e.Department)
            .NotEmpty().WithMessage("Department is required")
            .Length(2, 50).WithMessage("Department must be between 2 and 50 characters");

        RuleFor(e => e.Password)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters")
            .MaximumLength(100).WithMessage("Password cannot exceed 100 characters");
    }

    private bool BeAValidRole(string role)
    {
        var validRoles = new[] { "Admin", "Employee", "Manager" };
        return validRoles.Contains(role);
    }
}