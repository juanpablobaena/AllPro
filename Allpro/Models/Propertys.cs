using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Allpro.Models
{
    public class Propertys
    {
        public int PropertyID { get; set; }
        public string Address { get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public string Location{ get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public string Area { get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public int Num_rooms { get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public int Num_bathrooms { get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public byte Parking{ get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public int Price { get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public int Stratum { get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public string Image{ get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public int Condition{ get; set; }
        public int ClientID { get; set; }
        public int TypeHouseID{ get; set; }
        [Required(ErrorMessage = "El campo es obligatorio ")]
        public int TypePropertyID { get; set; }
    }
}
