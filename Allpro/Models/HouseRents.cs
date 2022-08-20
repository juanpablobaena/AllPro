using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Allpro.Models
{
    public class HouseRents
    {
        public int RentID{ get; set; }
        public string NameClient{ get; set; }
        public int clientID{ get; set; }
        public int TypeHouseID{ get; set; }
        public int PropertyID { get; set; }
        public  int Price { get; set; }
        public int OwnerID { get; set; }
    }
}
