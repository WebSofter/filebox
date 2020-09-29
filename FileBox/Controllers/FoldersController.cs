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
    public class FoldersController : Controller
    {
        ApplicationContext db;
        public FoldersController(ApplicationContext context)
        {
            db = context;
            if (!db.Folders.Any())
            {
                db.Folders.Add(new Folder { IdAccess = 0, IdUser = 2, IdParent = 0, Name = "Folder Name 1", Date = DateTime.Now });
                db.Folders.Add(new Folder { IdAccess = 0, IdUser = 2, IdParent = 0, Name = "Folder Name 2", Date = DateTime.Now });
                db.Folders.Add(new Folder { IdAccess = 0, IdUser = 2, IdParent = 0, Name = "Folder Name 3", Date = DateTime.Now });
                db.SaveChanges();
            }
        }
        [HttpGet("user/{idUser}")]
        public IEnumerable<Folder> GetUserFolders(int idUser)
        {
            return db.Folders.Where(x => x.IdUser == idUser).ToList();// FirstOrDefault(x => x.IdUser == idUser).ToList();
        }

        [HttpGet("{idUser}/count")]
        public int Count(int idUser)
        {
            /*
            File file = db.Files.FirstOrDefault(x => x.Id == id);
            return file;
            */
            var count = db.Folders.Count(x => x.IdUser == idUser);
            return count;
        }
        [HttpGet("{id}")]
        public Folder Get(int id)
        {
            Folder product = db.Folders.FirstOrDefault(x => x.Id == id);
            return product;
        }

        [HttpPost]
        public IActionResult Post(Folder folder)
        {
            //if (ModelState.IsValid)
            {
                folder.Date = DateTime.Now;
                db.Folders.Add(folder);
                db.SaveChanges();
                return Ok(folder);
            }
            //return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(Folder folder)
        {
            //if (ModelState.IsValid)
            {
                folder.Date = DateTime.Now;
                db.Folders.Update(folder);
                db.SaveChanges();
                return Ok(folder);
            }
           //return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Folder product = db.Folders.FirstOrDefault(x => x.Id == id);
            if (product != null)
            {
                db.Folders.Remove(product);
                db.SaveChanges();
            }
            return Ok(product);
        }
    }
}
