using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Data.SqlClient;
using Allpro.Models;
using System.Data;

namespace Allpro.Datos
{
    public class CallsSP
    {
        public List<Propertys> AllPropertys()
        {
            var List = new List<Propertys>();
            var cn = new Conexion();
            using (var conexion = new SqlConnection(cn.GetCadenaSql()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                using(var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        List.Add(new Propertys() {
                            PropertyID = Convert.ToInt32(dr["PropertyID"]),
                            Address = Convert.ToString(dr["Address"]),
                            Location = dr["Location"].ToString(),
                            Area = Convert.ToString(dr["Area"]),
                            Num_rooms = Convert.ToInt32(dr["Num_rooms"]),
                            Num_bathrooms = Convert.ToInt32(dr["Num_bathrooms"]),
                            Parking = (byte)Convert.ToInt32(dr["Parking"]),
                            Price = Convert.ToInt32(dr["Price"]),
                            Stratum = Convert.ToInt32(dr["Stratum"]),
                            Image = Convert.ToString(dr["Image"]),
                            ClientID = Convert.ToInt32(dr["ClientID"]),
                            TypeHouseID = Convert.ToInt32(dr["TypeHouseID"]),
                            TypePropertyID = Convert.ToInt32(dr["TypePropertyID"]),
                            Condition = Convert.ToInt32(dr["Condition"]),
                        });
                    }   
                }
                return List;
            }
        }
    }
}
