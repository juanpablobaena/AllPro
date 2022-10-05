using System.IO;
using Microsoft.Extensions.Configuration;
namespace Allpro.Datos
{
  public class Conexion
  {
    public string CadenaSQL = string.Empty;

    public Conexion()
    {
      var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
      CadenaSQL = builder.GetSection("ConnectionStrings:CadenaSQL").Value;
    }

    public string GetCadenaSql()
    {

      return CadenaSQL;
    }
  }
}
