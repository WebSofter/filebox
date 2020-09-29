using FileBox.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;

namespace FileBox.Controllers
{
    public class JsonRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        ApplicationContext db;
        public UsersController(ApplicationContext context)
        {
            db = context;
            if (!db.Users.Any())
            {
                db.Users.Add(new User { IdPricing = 1, Login = "websofter", Password = "123456", Name = "David", Surname = "Americanov" });
                db.Users.Add(new User { IdPricing = 2, Login = "mark", Password = "123456", Name = "Mark", Surname = "Softer" });
                db.Users.Add(new User { IdPricing = 3, Login = "softer", Password = "123456", Name = "Иван", Surname = "Иванов" });
                db.SaveChanges();
            }
        }

        [AllowAnonymous]
        [HttpPost("signin")]
        public User SignIn(JsonRequest requestData)
        {
            User user = db.Users.FirstOrDefault(x => x.Login == requestData.Login && x.Password == requestData.Password);
            return user;
        }


        [AllowAnonymous]
        [HttpPost("signup")]
        public String SignUp(User user)
        {
            dynamic u = db.Users.FirstOrDefault(x => x.Login == user.Login);
            if (u is null)
            {
                Post(user);
                return "ok";
            } else return "error";
            
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.Users.ToList();
        }

        [HttpGet("{id:int}")]
        public User Get(int id)
        {
            User user = db.Users.FirstOrDefault(x => x.Id == id);
            return user;
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
                return Ok(user);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id:int}")]
        public IActionResult Put(User user)
        {
            //return Ok("Hello world");// Ok(user);
            
            if (ModelState.IsValid)
            {
                db.Update(user);
                db.SaveChanges();
                return Ok(user);
            }
            return BadRequest(ModelState);
            
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            User user = db.Users.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                db.Users.Remove(user);
                db.SaveChanges();
            }
            return Ok(user);
        }
    }
}
