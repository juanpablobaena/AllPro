using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Allpro.Models
{
    public class OwnerHouse :MasterAllpro
    {
        public int OwnerID { get; set; }
        public int ClientID{ get; set; }
        public string UserName{ get; set; }
        public int  propertID{ get; set; }
        public int TypeHouseID{ get; set; }
    }
}
