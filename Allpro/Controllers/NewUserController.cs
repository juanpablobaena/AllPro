using Allpro.Datos;
using Microsoft.AspNetCore.Mvc;

namespace Allpro.Controllers
{
  public class NewUserController : Controller
  {
    private Logica logica = new Logica();

    public IActionResult NewUser()
    {
      return View();
    }

    //[HttpPost]
    //public IActionResult NewUser(Client client)
    //{
    //    if (!ModelState.IsValid)
    //        return View();
    //    var Respuesta = logica.NewUser(client);
    //    if (Respuesta)
    //        return RedirectToAction("Index", "Home");
    //    else
    //        return View();
    //}
  }
}