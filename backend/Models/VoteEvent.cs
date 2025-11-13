using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;
public class VoteEvent : Event
{
    public int Votes { get; set; }
}