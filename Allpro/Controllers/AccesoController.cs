using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Allpro.Datos;
using Allpro.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Allpro.Controllers
{
  [Route("api/acceso")]
  public class AccesoController : Controller
  {
    private Logica _logica = new Logica();

    [HttpPost("LoginUsers")]
    public newSession LoginUsers([FromBody] userLogin request)
    {
      return _logica.LoginUsers(request);
    }

    [HttpPost("RegisterUsers")]
    public newSession RegisterUsers([FromBody] InfoUser info)
    {
      return _logica.NewUser(info);
    }

    [HttpGet("GetInfoUser/{id}")]
    public InfoUser GetInfoUser([FromRoute] string id)
    {
      return _logica.GetInfoUser(id);
    }

    [HttpGet("GetUsers")]
    public List<Dictionary<string, string>> GetUsers()
    {
      return _logica.GetUsers();
    }

    [HttpGet("GetAuths")]
    public List<Dictionary<string, string>> GetAuths()
    {
      return _logica.GetAuths();
    }

    [HttpPost("SetInfoUser")]
    public bool SetInfoUser([FromBody] InfoUser info)
    {
      return _logica.UpdateProfile(info);
    }

    [HttpPost("UpdateUser")]
    public bool UpdateUser([FromBody] InfoUser info)
    {
      return _logica.UpdateUser(info);
    }

    [HttpDelete("DeleteUser/{id}")]
    public bool DeleteUser([FromRoute] string id)
    {
      return _logica.DeleteUser(id);
    }

    [HttpPost("Image")]
    public async Task<ActionResult> Image(IFormFile image)
    {
      var filePath = Path.GetTempFileName();

      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await image.CopyToAsync(stream);
      }
      if (image != null)
      {
        return Ok();
      }

      return BadRequest();
    }

    [HttpPost("CreateProperty")]
    public bool CreateProperty([FromBody] Auths property)
    {
      return _logica.NewProperty(property);
    }

    [HttpPost("AuthProperty")]
    public bool AuthProperty([FromBody] Auths property)
    {
      return _logica.AuthProperty(property);
    }

    [HttpGet("GetPropertys/{id}")]
    public List<Dictionary<string, string>> GetPropertys([FromRoute] string id)
    {
      return _logica.GetPropertys(id);
    }

    [HttpGet("GetPropertys2")]
    public List<Dictionary<string, string>> GetPropertys2()
    {
      return _logica.GetPropertys();
    }

    [HttpGet("GetMyPropertys/{id}")]
    public List<Dictionary<string, string>> GetMyPropertys([FromRoute] string id)
    {
      return _logica.GetMyPropertys(id);
    }

    [HttpGet("PreviewProperty/{idProperty}/{idUser}")]
    public generalInfo PreviewProperty([FromRoute] string idProperty, string idUser)
    {
      return _logica.PreviewProperty(idProperty, idUser);
    }

    [HttpPost("UpdateProperty")]
    public bool UpdateProperty([FromBody] generalInfo info)
    {
      return _logica.UpdateProperty(info);
    }

    [HttpDelete("DeleteProperty/{id}")]
    public bool DeleteProperty([FromRoute] string id)
    {
      return _logica.DeleteProperty(id);
    }

    [HttpDelete("DeleteAuth/{id}")]
    public bool DeleteAuth([FromRoute] string id)
    {
      return _logica.DeleteAuth(id);
    }
  }
}