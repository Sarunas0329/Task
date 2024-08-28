using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace Duombaze.Models.ViewModels
{
    public class MotherboardModel
    {
        [Key]
        public int Id { get; set; }
        public string Model { get; set; }
        public int RAM_Slots { get; set; }
        public string Socket { get; set; }
        public string RAM_Type { get; set; }
        public int RAM_TypeId { get; set; }
        public int SocketId { get; set; }
        public virtual IEnumerable<SelectListItem> RAM_TypesList { get; set; }
        public virtual IEnumerable<SelectListItem> SocketTypesList { get; set; }
        public MotherboardModel()
        {
            Id = 0;
            Model = "Select Model";
            RAM_Slots = 0;
            Socket = "Select Socket";
            RAM_Type = "Select RAM Type";
            RAM_TypesList = new List<SelectListItem>();
            SocketTypesList = new List<SelectListItem>();
        }
    }
}
