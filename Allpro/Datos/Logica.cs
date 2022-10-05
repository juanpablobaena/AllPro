using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Allpro.Models;

namespace Allpro.Datos
{
  public class Logica
  {
    private Conexion cn = new Conexion();

    public bool NewProperty(Auths info)
    {
      try
      {
        string query = @$"INSERT INTO Authorizations (Description,Address,Location,Area,Num_rooms,Num_bathrooms,Parking,Price,Stratum,Image,UserID,TypeHouse,TypeProperty) VALUES ('{info.Description}','{info.Address}','{info.Location}','{info.Area}','{info.NumRooms}','{info.NumBaths}','{info.Parking}','{info.Price}','{info.Stratum}','','{info.UserID}','{info.TypeHouse}','{info.TypeProperty}');";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.RecordsAffected > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    public bool AuthProperty(Auths info)
    {
      try
      {
        string query = @$"INSERT INTO Propertys (PropertyID, Description,Address,Location,Area,Num_rooms,Num_bathrooms,Parking,Price,Stratum,Image,UserID,TypeHouse,TypeProperty) VALUES ('{info.AuthID}','{info.Description}','{info.Address}','{info.Location}','{info.Area}','{info.NumRooms}','{info.NumBaths}','{info.Parking}','{info.Price}','{info.Stratum}','','{info.UserID}','{info.TypeHouse}','{info.TypeProperty}');";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.RecordsAffected > 0)
        {
          reader.Close();
          string query2 = @$"DELETE FROM Authorizations WHERE AuthID = '{info.AuthID}'";

          SqlCommand cmd2 = new(query2, conexion);
          SqlDataReader reader2 = cmd2.ExecuteReader();

          if (reader2.RecordsAffected > 0)
          {
            reader2.Close();

            return true;
          }
          else
          {
            return false;
          }
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    public newSession LoginUsers(userLogin request)
    {
      var isAdmin = false;
      try
      {
        string query = @$"SELECT UserRole, UserID, UserName FROM Users WHERE UserName='{request.UserName}' AND UserPassword='{request.Password}';";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.HasRows)
        {
          reader.Close();

          DataTable tabla = new DataTable();
          SqlDataAdapter da = new SqlDataAdapter(cmd);

          da.Fill(tabla);

          string UserRole = tabla.Rows[0]["UserRole"].ToString();
          string UserID = tabla.Rows[0]["UserID"].ToString();
          string UserName = tabla.Rows[0]["UserName"].ToString();

          if (UserRole == "1")
          {
            isAdmin = true;
          }
          return new newSession
          {
            ValideUser = true,
            IsAdministrator = isAdmin,
            UserId = UserID,
            UserName = UserName
          };
        }
        else
        {
          return new newSession
          {
            ValideUser = false,
            IsAdministrator = false
          };
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public newSession NewUser(InfoUser info)
    {
      try
      {
        string query = @$"SELECT UserName, UserEmail FROM Users WHERE UserName='{info.UserName}' AND UserEmail='{info.UserEmail}';";
        string queryInsert = @$"INSERT INTO Users (UserName,UserPassword,UserRole,UserEmail,NameClient,LastNameClient,PhoneClient1,PhoneClient2) VALUES ('{info.UserName}','{info.UserPassword}','2','{info.UserEmail}','','','','');";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.HasRows)
        {
          return new newSession
          {
            ValideUser = false,
            IsAdministrator = false
          };
        }
        else
        {
          reader.Close();
          SqlCommand sqlCommand = new(queryInsert, conexion);
          SqlDataReader sqlReader = sqlCommand.ExecuteReader();
          return new newSession
          {
            ValideUser = true,
            IsAdministrator = false
          };
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public InfoUser GetInfoUser(string id)
    {
      try
      {
        string query = @$"SELECT * FROM Users WHERE UserID='{id}';";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.HasRows)
        {
          reader.Close();

          DataTable tabla = new DataTable();
          SqlDataAdapter da = new SqlDataAdapter(cmd);

          da.Fill(tabla);

          return new InfoUser
          {
            NameClient = tabla.Rows[0]["NameClient"].ToString(),
            LastNameClient = tabla.Rows[0]["LastNameClient"].ToString(),
            PhoneClient1 = tabla.Rows[0]["PhoneClient1"].ToString(),
            PhoneClient2 = tabla.Rows[0]["PhoneClient2"].ToString(),
            UserEmail = tabla.Rows[0]["UserEmail"].ToString(),
            UserName = tabla.Rows[0]["UserName"].ToString()
          };
        }
        else
        {
          return new InfoUser
          {
            NameClient = string.Empty,
            LastNameClient = string.Empty,
            PhoneClient1 = string.Empty,
            PhoneClient2 = string.Empty,
            UserEmail = string.Empty,
            UserName = string.Empty
          };
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public List<Dictionary<string, string>> GetUsers()
    {
      try
      {
        List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
        Dictionary<string, string> column;

        string query = @$"SELECT * FROM Users;";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();

        if (reader.HasRows)
        {
          while (reader.Read())
          {
            column = new Dictionary<string, string>();

            column["UserID"] = reader["UserID"].ToString();
            column["NameClient"] = reader["NameClient"].ToString();
            column["LastNameClient"] = reader["LastNameClient"].ToString();
            column["PhoneClient1"] = reader["PhoneClient1"].ToString();
            column["PhoneClient2"] = reader["PhoneClient2"].ToString();
            column["UserEmail"] = reader["UserEmail"].ToString();
            column["UserName"] = reader["UserName"].ToString();

            rows.Add(column);
          }
          reader.Close();

          return rows;
        }
        else
        {
          return null;
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public List<Dictionary<string, string>> GetAuths()
    {
      try
      {
        List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
        Dictionary<string, string> column;

        string query = @$"SELECT * FROM Authorizations;";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();

        if (reader.HasRows)
        {
          while (reader.Read())
          {
            column = new Dictionary<string, string>();

            column["AuthID"] = reader["AuthID"].ToString();
            column["UserID"] = reader["UserID"].ToString();
            column["Description"] = reader["Description"].ToString();
            column["Address"] = reader["Address"].ToString();
            column["Location"] = reader["Location"].ToString();
            column["Area"] = reader["Area"].ToString();
            column["Num_rooms"] = reader["Num_rooms"].ToString();
            column["Num_bathrooms"] = reader["Num_bathrooms"].ToString();
            column["Parking"] = reader["Parking"].ToString();
            column["Price"] = reader["Price"].ToString();
            column["Stratum"] = reader["Stratum"].ToString();
            column["TypeHouse"] = reader["TypeHouse"].ToString();
            column["TypeProperty"] = reader["TypeProperty"].ToString();

            rows.Add(column);
          }
          reader.Close();

          return rows;
        }
        else
        {
          return null;
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public bool UpdateProfile(InfoUser info)
    {
      try
      {
        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        string query = string.Empty;

        if (info.ChangePassword.Equals(true))
        {
          string consult = $@"SELECT UserPassword From Users WHERE UserName = '{info.UserName}'";
          SqlCommand cmd2 = new(consult, conexion);

          SqlDataReader reader2 = cmd2.ExecuteReader();
          if (reader2.HasRows)
          {
            reader2.Close();
            DataTable tabla = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter(cmd2);
            da.Fill(tabla);

            string UserPassword = tabla.Rows[0]["UserPassword"].ToString();

            if (UserPassword != info.UserPassword)
            {
              return false;
            }
            else
            {
              query = @$"UPDATE Users SET UserEmail = '{info.UserEmail}', NameClient = '{info.NameClient}', LastNameClient = '{info.LastNameClient}', PhoneClient1 = '{info.PhoneClient1}', PhoneClient2 = '{info.PhoneClient2}', UserPassword = '{info.ConfirmNewUserPassword}' WHERE UserName = '{info.UserName}'";
            }
          }
        }
        else
        {
          query = @$"UPDATE Users SET UserEmail = '{info.UserEmail}', NameClient = '{info.NameClient}', LastNameClient = '{info.LastNameClient}', PhoneClient1 = '{info.PhoneClient1}', PhoneClient2 = '{info.PhoneClient2}' WHERE UserName = '{info.UserName}'";
        }

        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.RecordsAffected > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    public bool UpdateUser(InfoUser info)
    {
      try
      {
        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        string query = @$"UPDATE Users SET UserName = '{info.UserName}', UserEmail = '{info.UserEmail}', NameClient = '{info.NameClient}', LastNameClient = '{info.LastNameClient}', PhoneClient1 = '{info.PhoneClient1}', PhoneClient2 = '{info.PhoneClient2}' WHERE UserID = '{info.UserId}'"; ;

        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.RecordsAffected > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    public bool DeleteUser(string id)
    {
      try
      {
        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        string query = @$"DELETE FROM Users WHERE UserID = '{id}'"; ;

        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.RecordsAffected > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    public List<Dictionary<string, string>> GetPropertys(string id)
    {
      try
      {
        List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
        Dictionary<string, string> column;

        string query = @$"SELECT * FROM Propertys WHERE UserID != {id};";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();

        if (reader.HasRows)
        {
          while (reader.Read())
          {
            column = new Dictionary<string, string>();

            column["PropertyID"] = reader["PropertyID"].ToString();
            column["Description"] = reader["Description"].ToString();
            column["Address"] = reader["Address"].ToString();
            column["Location"] = reader["Location"].ToString();
            column["Area"] = reader["Area"].ToString();
            column["Num_rooms"] = reader["Num_rooms"].ToString();
            column["Num_bathrooms"] = reader["Num_bathrooms"].ToString();
            column["Parking"] = reader["Parking"].ToString();
            column["Price"] = reader["Price"].ToString();
            column["Stratum"] = reader["Stratum"].ToString();
            column["TypeHouse"] = reader["TypeHouse"].ToString();
            column["TypeProperty"] = reader["TypeProperty"].ToString();

            rows.Add(column);
          }
          reader.Close();

          return rows;
        }
        else
        {
          return null;
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public List<Dictionary<string, string>> GetPropertys()
    {
      try
      {
        List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
        Dictionary<string, string> column;

        string query = @$"SELECT * FROM Propertys;";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();

        if (reader.HasRows)
        {
          while (reader.Read())
          {
            column = new Dictionary<string, string>();

            column["PropertyID"] = reader["PropertyID"].ToString();
            column["Description"] = reader["Description"].ToString();
            column["Address"] = reader["Address"].ToString();
            column["Location"] = reader["Location"].ToString();
            column["Area"] = reader["Area"].ToString();
            column["Num_rooms"] = reader["Num_rooms"].ToString();
            column["Num_bathrooms"] = reader["Num_bathrooms"].ToString();
            column["Parking"] = reader["Parking"].ToString();
            column["Price"] = reader["Price"].ToString();
            column["Stratum"] = reader["Stratum"].ToString();
            column["TypeHouse"] = reader["TypeHouse"].ToString();
            column["TypeProperty"] = reader["TypeProperty"].ToString();

            rows.Add(column);
          }
          reader.Close();

          return rows;
        }
        else
        {
          return null;
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public List<Dictionary<string, string>> GetMyPropertys(string id)
    {
      try
      {
        List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
        Dictionary<string, string> column;

        string query = @$"SELECT * FROM Propertys WHERE UserID = '{id}';";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();

        if (reader.HasRows)
        {
          while (reader.Read())
          {
            column = new Dictionary<string, string>();

            column["PropertyID"] = reader["PropertyID"].ToString();
            column["Description"] = reader["Description"].ToString();
            column["Address"] = reader["Address"].ToString();
            column["Location"] = reader["Location"].ToString();
            column["Area"] = reader["Area"].ToString();
            column["Num_rooms"] = reader["Num_rooms"].ToString();
            column["Num_bathrooms"] = reader["Num_bathrooms"].ToString();
            column["Parking"] = reader["Parking"].ToString();
            column["Price"] = reader["Price"].ToString();
            column["Stratum"] = reader["Stratum"].ToString();
            column["TypeHouse"] = reader["TypeHouse"].ToString();
            column["TypeProperty"] = reader["TypeProperty"].ToString();

            rows.Add(column);
          }
          reader.Close();

          return rows;
        }
        else
        {
          return null;
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    private bool validateProperty(string idProperty, string idUser)
    {
      string query = @$"SELECT * From Propertys WHERE UserID = '{idUser}' AND PropertyID = '{idProperty}';";

      using var conexion = new SqlConnection(cn.GetCadenaSql());
      conexion.Open();
      SqlCommand cmd = new(query, conexion);
      SqlDataReader reader = cmd.ExecuteReader();
      if (reader.HasRows)
      {
        reader.Close();

        return true;
      }
      else
      {
        return false;
      }
    }

    public generalInfo PreviewProperty(string idProperty, string idUser)
    {
      try
      {
        string query = @$"SELECT p.*, u.NameClient, u.LastNameClient, u.UserEmail, u.PhoneClient1, u.PhoneClient2 FROM Propertys p INNER JOIN  Users u ON p.UserID = u.UserID WHERE p.PropertyID = '{idProperty}';";

        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.HasRows)
        {
          reader.Close();

          DataTable tabla = new DataTable();
          SqlDataAdapter da = new SqlDataAdapter(cmd);

          da.Fill(tabla);

          bool response = validateProperty(idProperty, idUser);

          return new generalInfo
          {
            MyProperty = response,
            PropertyID = tabla.Rows[0]["PropertyID"].ToString(),
            Description = tabla.Rows[0]["Description"].ToString(),
            Address = tabla.Rows[0]["Address"].ToString(),
            Location = tabla.Rows[0]["Location"].ToString(),
            Area = tabla.Rows[0]["Area"].ToString(),
            Num_rooms = tabla.Rows[0]["Num_rooms"].ToString(),
            Num_bathrooms = tabla.Rows[0]["Num_bathrooms"].ToString(),
            Parking = tabla.Rows[0]["Parking"].ToString(),
            Price = tabla.Rows[0]["Price"].ToString(),
            Stratum = tabla.Rows[0]["Stratum"].ToString(),
            TypeHouse = tabla.Rows[0]["TypeHouse"].ToString(),
            TypeProperty = tabla.Rows[0]["TypeProperty"].ToString(),
            NameClient = tabla.Rows[0]["NameClient"].ToString(),
            LastNameClient = tabla.Rows[0]["LastNameClient"].ToString(),
            UserEmail = tabla.Rows[0]["UserEmail"].ToString(),
            PhoneClient1 = tabla.Rows[0]["PhoneClient1"].ToString(),
            PhoneClient2 = tabla.Rows[0]["PhoneClient2"].ToString()
          };
        }
        else
        {
          return new generalInfo
          {
            PropertyID = string.Empty,
            Description = string.Empty,
            Address = string.Empty,
            Location = string.Empty,
            Area = string.Empty,
            Num_rooms = string.Empty,
            Num_bathrooms = string.Empty,
            Parking = string.Empty,
            Price = string.Empty,
            Stratum = string.Empty,
            TypeHouse = string.Empty,
            TypeProperty = string.Empty,
            NameClient = string.Empty,
            LastNameClient = string.Empty,
            UserEmail = string.Empty,
            PhoneClient1 = string.Empty,
            PhoneClient2 = string.Empty
          };
        }
      }
      catch (Exception ex)
      {
        return null;
      }
    }

    public bool UpdateProperty(generalInfo info)
    {
      try
      {
        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        string query = @$"UPDATE Propertys SET Description = '{info.Description}', Address = '{info.Address}', Location = '{info.Location}', Area = '{info.Area}', Num_rooms = '{info.Num_rooms}', Num_bathrooms = '{info.Num_bathrooms}', Parking = '{info.Parking}', Price = '{info.Price}', Stratum = '{info.Stratum}', TypeHouse = '{info.TypeHouse}', TypeProperty = '{info.TypeProperty}' WHERE PropertyID = '{info.PropertyID}';";

        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.RecordsAffected > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    public bool DeleteProperty(string id)
    {
      try
      {
        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        string query = @$"DELETE FROM Propertys WHERE PropertyID = '{id}'"; ;

        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.RecordsAffected > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    public bool DeleteAuth(string id)
    {
      try
      {
        using var conexion = new SqlConnection(cn.GetCadenaSql());
        conexion.Open();
        string query = @$"DELETE FROM Authorizations WHERE AuthID = '{id}'"; ;

        SqlCommand cmd = new(query, conexion);
        SqlDataReader reader = cmd.ExecuteReader();
        if (reader.RecordsAffected > 0)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      catch (Exception ex)
      {
        return false;
      }
    }
  }
}