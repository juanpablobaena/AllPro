using System;
using System.Data;
using System.Data.SqlClient;
using Allpro.Models;

namespace Allpro.Datos
{
  public class Logica
  {
    private Conexion cn = new Conexion();
    private bool rpta;

    public bool NewProperty(Propertys propertys)
    {
      try
      {
        using (var conexion = new SqlConnection(cn.GetCadenaSql()))
        {
          conexion.Open();
          SqlCommand cmd = new SqlCommand("NewProperty", conexion);
          cmd.Parameters.AddWithValue("Address", propertys.Address);
          cmd.Parameters.AddWithValue("Location", propertys.Location);
          cmd.Parameters.AddWithValue("Area", propertys.Area);
          cmd.Parameters.AddWithValue("Num_rooms", propertys.Num_rooms);
          cmd.Parameters.AddWithValue("Num_bathrooms", propertys.Num_bathrooms);
          cmd.Parameters.AddWithValue("Parking", propertys.Parking);
          cmd.Parameters.AddWithValue("Price", propertys.Price);
          cmd.Parameters.AddWithValue("Stratum", propertys.Stratum);
          cmd.Parameters.AddWithValue("Image", propertys.Image);
          cmd.Parameters.AddWithValue("TypeHouseID", propertys.TypeHouseID);
          cmd.Parameters.AddWithValue("TypePropertyID", propertys.TypePropertyID);
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.ExecuteNonQuery();
        }
        rpta = true;
      }
      catch (Exception e)
      {
        string error = e.Message;
        rpta = false;
      }
      return rpta;
    }

    public Response LoginUsers(string ussername, string password)
    {
      var isAdmin = false;

      try
      {
        using (var conexion = new SqlConnection(cn.GetCadenaSql()))
        {
          conexion.Open();

          string query = "Select Email,UserPassword, RoleID from Client where Email=@Correo and UserPassword=@Clave ";

          SqlCommand cmd = new SqlCommand(query, conexion);
          cmd.Parameters.AddWithValue("@Correo", ussername);
          cmd.Parameters.AddWithValue("@Clave", password);
          cmd.CommandType = CommandType.Text;
          SqlDataReader reader = cmd.ExecuteReader();
          var Role = reader.GetValue("RoleID").ToString();
          if (reader.HasRows)
          {
            if (Role == "1")
            {
              isAdmin = true;
            }
            return new Response
            {
              valideUser = true,
              isAdministrator = isAdmin
            };
          }
          else
          {
            return new Response
            {
              valideUser = false,
              isAdministrator = false
            };
          }
        }
      }
      catch (Exception e)
      {
        _ = e.Message;
        return null;
      }
    }

    public bool NewUser(Client client)
    {
      try
      {
        using (var conexion = new SqlConnection(cn.GetCadenaSql()))
        {
          conexion.Open();
          SqlCommand cmd = new SqlCommand("NewProperty", conexion);
          cmd.Parameters.AddWithValue("NameClient", client.NameClient);
          cmd.Parameters.AddWithValue("UserName", client.UserName);
          cmd.Parameters.AddWithValue("UserPassword", client.UserPassword);
          cmd.Parameters.AddWithValue("PhoneClient", client.PhoneClient);
          cmd.Parameters.AddWithValue("DocumentClient", client.DocumentClient);
          cmd.Parameters.AddWithValue("Email", client.Email);
          cmd.Parameters.AddWithValue("BanckClient", client.BanckClient);
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.ExecuteNonQuery();
        }
        rpta = true;
      }
      catch (Exception e)
      {
        string error = e.Message;
        rpta = false;
      }
      return rpta;
    }

    public bool Datavalider(string Email, string UserPassword)
    {
      if (UserPassword is null && Email is null)
      { rpta = false; }
      else
      { rpta = true; }
      return rpta;
    }
  }
}