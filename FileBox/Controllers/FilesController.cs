using FileBox.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileBox.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : Controller
    {

        ApplicationContext db;
        public FilesController(ApplicationContext context)
        {
            db = context;
            if (!db.Files.Any())
            {
                db.Files.Add(new File { IdAccess = 0, IdParent = 0, IdUser = 2, Name = "File Name 1.pdf", Date = DateTime.Now });
                db.Files.Add(new File { IdAccess = 0, IdParent = 0, IdUser = 2, Name = "File Name 2.pdf", Date = DateTime.Now });
                db.Files.Add(new File { IdAccess = 0, IdParent = 0, IdUser = 2, Name = "File Name 3.pdf", Date = DateTime.Now });
                db.SaveChanges();
            }
        }
        [HttpGet("user/{idUser}")]
        public IEnumerable<File> GetUserFiles(int idUser)
        {
            return db.Files.Where(x => x.IdUser == idUser).ToList();
        }

        [HttpGet("{id}")]
        public File Get(int id)
        {
            File file = db.Files.FirstOrDefault(x => x.Id == id);
            return file;
        }
        [HttpGet("{idUser}/count")]
        public int Count(int idUser)
        {
            /*
            File file = db.Files.FirstOrDefault(x => x.Id == id);
            return file;
            */
            var count = db.Files.Count(x => x.IdUser == idUser);
            return count;
        }
        [HttpPost]
        public IActionResult Post([FromForm] IFormFile file, [FromForm] int idAccess, [FromForm] int idUser, [FromForm] int idParent, [FromForm] string name)
        {
            if (ModelState.IsValid)
            {
                //db.Files.Add(file);
                //db.SaveChanges();
                Upload(file, idAccess, idUser, idParent, name);
                return Ok(file);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put(File file)
        {
            if(ModelState.IsValid)
            {
                DateTime date = DateTime.Now;
                string newFileName = file.Name;
                string oldFileName = db.Files.FirstOrDefault(x => x.Id == file.Id).Name;
                bool isChange = newFileName != oldFileName;

                string newFilePath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{file.IdUser}/{newFileName}");
                string oldFilePath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{file.IdUser}/{oldFileName}");
                //
                if (System.IO.File.Exists(newFilePath) && System.IO.File.Exists(oldFilePath) && isChange)
                {
                    newFileName = getFileNameFromDate(newFileName, file.Date.ToString());
                    newFilePath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{file.IdUser}/{newFileName}");
                    System.IO.File.Move(oldFilePath, newFilePath);
                }else if (System.IO.File.Exists(oldFilePath) && isChange)
                {
                    System.IO.File.Move(oldFilePath, newFilePath);
                }

                //
                //File updFile = new File {IdAccess = file.IdAccess, IdParent = file.IdParent, IdUser = file.IdUser, Name = newFileName, Date = date };

                var updFile = db.Files.FirstOrDefault(x => x.Id == file.Id);
                updFile.IdAccess = file.IdAccess;
                updFile.IdParent = file.IdParent;
                updFile.IdUser = file.IdUser;
                updFile.Name = newFileName;
                updFile.Date = date;
                //db.Update(updFile);
                db.SaveChanges();

                return Ok(file);
            }
            else
            {
                return BadRequest(ModelState);
            }

                
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            File file = db.Files.FirstOrDefault(x => x.Id == id);
            File removedFile = file;

            if (file != null)
            {
                string fileName = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{file.IdUser}/{file.Name}");
                try
                {
                    // Check if file exists with its full path    
                    if (System.IO.File.Exists(fileName))
                    {   
                        System.IO.File.Delete(fileName);
                        //
                        db.Files.Remove(file);
                        db.SaveChanges();
                    }
                }
                catch (System.IO.IOException ioExp)
                {
                    Console.WriteLine(ioExp.Message);
                }
            }

            return Ok(removedFile);
        }

        /*
        public class UploadRequest
        {
            public IFormFile;
            public int IdUser { get; set; }
        }
        */

        [HttpPost]
        [Route("upload")]
        public string Upload([FromForm] IFormFile file, [FromForm] int idAccess, [FromForm] int idUser, [FromForm] int idParent, [FromForm] string name)
        {
            var date = DateTime.Now;
            name = (!String.IsNullOrEmpty(name) ? name + System.IO.Path.GetExtension(file.FileName) : file.FileName);
            //name = System.IO.Path.GetFileNameWithoutExtension(name) + " " + date.ToString().Replace(":", "-").Replace(".", "-") + System.IO.Path.GetExtension(name);
            name = getFileNameFromDate(name, date.ToString());

            var uploads = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{idUser}");
            if (!System.IO.Directory.Exists(uploads)) System.IO.Directory.CreateDirectory(uploads);
            var filePath = System.IO.Path.Combine(uploads, name);
            using (var fileStream = new System.IO.FileStream(filePath, System.IO.FileMode.Create)){
                file.CopyTo(fileStream);
                //db.Files.Add(new File { IdAccess = idAccess, IdParent = idParent, IdUser = idUser, Name = name });
                db.Files.Add(new File { IdAccess = idAccess, IdParent = idParent, IdUser = idUser, Name = name, Date = date });
                db.SaveChanges();
            }
            return name;// filePath;
        }

        public string getFileNameFromDate(string name, string date)
        {
            return name;// System.IO.Path.GetFileNameWithoutExtension(name) + " " + date.ToString().Replace(":", "-").Replace(".", "-") + System.IO.Path.GetExtension(name);
        }
        /*
    public async Task<IActionResult> Upload(IList<IFormFile> files) {
        var uploads = System.IO.Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
        foreach (var file in files) {
            if (file.Length > 0) {
                var filePath = System.IO.Path.Combine(uploads, file.FileName);
                using (var fileStream = new System.IO.FileStream(filePath, System.IO.FileMode.Create)) {
                    await file.CopyToAsync(fileStream);
                }
            }
        }
        return View();
    }
        */
        /*
        public string Upload([FromForm] IFormFile file)//public async Task Upload([FromForm] IFormFile file)
        {
            // do sth with attachment
            return file.FileName;
        }
        */
    }
}
