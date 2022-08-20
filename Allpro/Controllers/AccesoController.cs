using System;
using Allpro.Datos;
using Allpro.Models;
using Microsoft.AspNetCore.Mvc;

namespace Allpro.Controllers
{
  public class AccesoController : Controller
  {
    private Logica logica = new Logica();
    private Client CL = new Client();

    public IActionResult LoginUsers()
    {
      return View();
    }

    [HttpPost]
    public IActionResult LoginUsers(Client client)
    {
      string message;
      try
      {
        var DadaValide = logica.Datavalider(client.UserName, client.UserPassword);
        if (DadaValide)
        {
          var Respuesta = logica.LoginUsers(client);
          if (Respuesta)
            return RedirectToAction("Index", "Home");
        }
      }
      catch (Exception e)
      {
        CL.Message = ($"Algo esta fallando: {e}");
        return Ok(CL.Message);
      }
      message = "Alfue muy mal ";
      return Ok(message);
    }
  }
}