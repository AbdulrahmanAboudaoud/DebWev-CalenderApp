using backend.Models;
using FluentValidation;

namespace backend.Validation;

public class RoomBookingValidation : AbstractValidator<RoomBooking>
{
    public RoomBookingValidation()
    {
        RuleFor(rb => rb.StartTime).LessThanOrEqualTo(rb => rb.EndTime);
        RuleFor(rb => rb.EndTime).GreaterThanOrEqualTo(rb => rb.StartTime);
    }
}