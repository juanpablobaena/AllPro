using Allpro.Datos;
using Microsoft.AspNetCore.Mvc;

namespace Allpro.Controllers
{
  public class NewPropertyteController : Controller
  {
    private Logica logica = new Logica();

    public IActionResult NewProperty()
    {
      return View();
    }

    //[HttpPost]
    //public IActionResult NewProperty(Propertys propertys)
    //{
    //     if (!ModelState.IsValid)
    //        return View();
    //    var Respuesta = logica.NewProperty(propertys);
    //    if (Respuesta)
    //        return RedirectToAction("Index", "Home");
    //    else
    //        return View();
    //}
  }
}