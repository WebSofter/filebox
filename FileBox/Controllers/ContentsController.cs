using FileBox.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FileBox.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContentsController : Controller
    {
        ApplicationContext db;

        public class ContenCounter
        {
            public int files { get; set; }
            public int folders { get; set; }
        }
        public ContentsController(ApplicationContext context)
        {
            db = context;
            db.Contents.Any();
        /*
            if (!db.Files.Any() && !db.Contents.Any())
            {
                db.Contents.Add(new Content { IdAccess = 0, IdUser = 2, IdParent = 0, Name = "Content Name 1", Date = DateTime.Now });
                db.Contents.Add(new Content { IdAccess = 0, IdUser = 2, IdParent = 0, Name = "Content Name 2", Date = DateTime.Now });
                db.Contents.Add(new Content { IdAccess = 0, IdUser = 2, IdParent = 0, Name = "Content Name 3", Date = DateTime.Now });
                db.SaveChanges();
            }
        */

        }
        [HttpGet("user/{idUser}")]
        public IEnumerable<Content> GetUserContents(int idUser)
        {
            //IEnumerable<Content> folders =  db.Contents.Where(x => x.IdUser == idUser).ToList();
            //IEnumerable<Content> files = db.Files.Where(x => x.IdUser == idUser).ToList();
            //return db.Contents.Where(x => x.IdUser == idUser).ToList(); 
            return db.Contents.Where(x => x.IdUser == idUser).ToList();//folders.Concat(files);
        }

        [HttpGet("count/{idUser}")]
        public JsonResult Count(int idUser)
        {
            int countFolders = db.Contents.Count(x => x.IdUser == idUser && x.IdType == 1);
            int countFiles = db.Contents.Count(x => x.IdUser == idUser && x.IdType == 2);
            ContenCounter counter = new ContenCounter { folders = countFolders, files = countFiles };
            return Json(counter);
        }

        [HttpGet("{id}")]
        public Content Get(int id)
        {
            Content product = db.Contents.FirstOrDefault(x => x.Id == id);
            return product;
        }

        [HttpPost]
        public IActionResult Post(Content content)
        {
            //if (ModelState.IsValid)
            {
                content.Date = DateTime.Now;
                db.Contents.Add(content);
                db.SaveChanges();
                return Ok(content);
            }
            //return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Update(Content content)
        {
            if (ModelState.IsValid)
            {
                content.Date = DateTime.Now;
                db.Contents.Update(content);
                db.SaveChanges();
                return Ok(content);
            }
           return BadRequest(ModelState);
        }
        [HttpPost("delete")]
        public ActionResult DeleteAll(IEnumerable<int> ids)
        {
            foreach (var id in ids)
            {
                var content = db.Contents.Single(s => s.Id == id);

                string fileName = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{content.IdUser}/{content.Name}");
                try
                {
                    if (System.IO.File.Exists(fileName))
                    {
                        System.IO.File.Delete(fileName);
                    }
                }
                catch (System.IO.IOException ioExp){}

                db.Contents.Remove(content);
            }
            db.SaveChanges();
            return Ok("success");
        }


           
        [HttpGet("download/{name}")]
        public IActionResult DownloadZip(string name, [FromQuery]int[] ids)//IEnumerable<int> ids, string name
        {
            //IEnumerable<int> ids = new List<int> { 25, 27 }; 
            //ids.Append(25);// = [25, 27];
            //ids.Append(27);

           
            List<ZipItem> zipItem = new List<ZipItem>();
            foreach (var id in ids)
            {
                var content = db.Contents.Single(s => s.Id == id);
                string fileName = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{content.IdUser}/{content.Name}");
                zipItem.Add(new ZipItem(Path.GetFileName(fileName), System.IO.File.OpenRead(fileName)));
            }
            var zipStream = Zipper.Zip(zipItem);
            return File(zipStream, "application/zip");
           

            //return Ok(name + " length="+ ids[0]);

            /*
            string fileName = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/2/file_3.jpg");
            List<ZipItem> zipItem = new List<ZipItem>();
            //var stream = new FileStreamResult(System.IO.File.OpenRead(fileName), "application/octet-stream");

            zipItem.Add(new ZipItem(Path.GetFileName(fileName), System.IO.File.OpenRead(fileName)));
            var zipStream = Zipper.Zip(zipItem);
            return File(zipStream, "application/zip");
            */
        }

        /*
foreach(var ec in db.Engineers.Where(x => x.CompanyId == companyId))
{
    db.Engineers.Remove(ec);
}
         */
        /*
       [HttpPost("delall}")]
        public IActionResult DeleteAll()
        {
          
            Content content, removedContent;
            
            for (int i = 0; i <= (ids.Length-1); i ++)
            {
                content = db.Contents.FirstOrDefault(x => x.Id == ids[i]);
                removedContent = content;
                
                if (content != null)
                {
                    string fileName = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{content.IdUser}/{content.Name}");
                    try
                    {
                        // Check if file exists with its full path    
                        if (System.IO.File.Exists(fileName))
                        {
                            System.IO.File.Delete(fileName);
                        }
                        db.Contents.Remove(content);
                        db.SaveChanges();
                    }
                    catch (System.IO.IOException ioExp)
                    {
                        //return BadRequest(ioExp.Message);
                    }
                }
                
            }
            
            return Ok("hello ");
        }*/
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Content content = db.Contents.FirstOrDefault(x => x.Id == id);
            Content removedContent = content;

            if (content != null)
            {
                string fileName = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), $"ClientApp/uploads/{content.IdUser}/{content.Name}");
                try
                {
                    // Check if file exists with its full path    
                    if (System.IO.File.Exists(fileName))
                    {
                        System.IO.File.Delete(fileName);
                    }
                    db.Contents.Remove(content);
                    db.SaveChanges();
                }
                catch (System.IO.IOException ioExp)
                {
                    Console.WriteLine(ioExp.Message);
                }
            }

            return Ok(removedContent);
            /*
            Content content = db.Contents.FirstOrDefault(x => x.Id == id);
            if (content != null)
            {
                db.Contents.Remove(content);
                db.SaveChanges();
            }
            return Ok(content);
            */
        }

        [HttpPost]
        [Route("upload")]
        public string Upload([FromForm] IFormFile file, [FromForm] int idAccess, [FromForm] int idUser, [FromForm] int idParent, [FromForm] string name, [FromForm] int idType)
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
                db.Contents.Add(new Content { IdAccess = idAccess, IdParent = idParent, IdUser = idUser, Name = name, Date = date, IdType = idType });
                db.SaveChanges();
            }
            return name;// filePath;
        }

        public string getFileNameFromDate(string name, string date)
        {
            return name;// System.IO.Path.GetFileNameWithoutExtension(name) + " " + date.ToString().Replace(":", "-").Replace(".", "-") + System.IO.Path.GetExtension(name);
        }
    }
}
