using FileBox.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileBox.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PricingsController : Controller
    {
        ApplicationContext db;
        public PricingsController(ApplicationContext context)
        {
            db = context;
            if (!db.Pricings.Any())
            {
                db.Pricings.Add(new Pricing { Name = "Start", Volume = 2000, Price = 0, Users = 10, Status = null });
                db.Pricings.Add(new Pricing { Name = "Pro", Volume = 5000, Price = 299, Users = 15, Status = "favorite" });
                db.Pricings.Add(new Pricing { Name = "Enterprise", Volume = 10000, Price = 499, Users = 20, Status = null });
                db.SaveChanges();
            }
        }
        [HttpGet]
        public IEnumerable<Pricing> Get()
        {
            return db.Pricings.ToList();
        }

        [HttpGet("{id}")]
        public Pricing Get(int id)
        {
            Pricing product = db.Pricings.FirstOrDefault(x => x.Id == id);
            return product;
        }

        [HttpPost]
        public IActionResult Post(Pricing product)
        {
            if (ModelState.IsValid)
            {
                db.Pricings.Add(product);
                db.SaveChanges();
                return Ok(product);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Pricing product)
        {
            if (ModelState.IsValid)
            {
                db.Update(product);
                db.SaveChanges();
                return Ok(product);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Pricing product = db.Pricings.FirstOrDefault(x => x.Id == id);
            if (product != null)
            {
                db.Pricings.Remove(product);
                db.SaveChanges();
            }
            return Ok(product);
        }
    }
}
