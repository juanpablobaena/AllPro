using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Allpro.Models;
using Allpro.Datos;
namespace Allpro.Controllers
{
    public class NewPropertyteController : Controller
    {
        Logica logica = new Logica();
        public IActionResult NewProperty()
        {
            return View();
        }
    
        [HttpPost]
        public IActionResult NewProperty(Propertys propertys)
        {
             if (!ModelState.IsValid)
                return View();
            var Respuesta = logica.NewProperty(propertys);
            if (Respuesta)
                return RedirectToAction("Index", "Home");
            else
                return View();
        }
    }
}
    