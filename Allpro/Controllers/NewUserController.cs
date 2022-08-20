using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Allpro.Datos;
using Allpro.Models;
namespace Allpro.Controllers
{
    public class NewUserController : Controller
    {
        Logica logica = new Logica();
        public IActionResult NewUser()
        {
            return View();
        }
        [HttpPost]
        public IActionResult NewUser(Client client)
        {   
            if (!ModelState.IsValid)
                return View();
            var Respuesta = logica.NewUser(client);
            if (Respuesta)
                return RedirectToAction("Index", "Home");
            else
                return View();
        }
       
    }
}
