using System.ComponentModel.DataAnnotations;
namespace Duombaze.Models
{
    public class Motherboard
    {
        [Key]
        public int Id { get; set; }
        public string Model { get; set; }
        public int RAM_Slots { get; set; } 
        public int Socket { get; set; }
        public int RAM_Type { get; set; }
    }
}
