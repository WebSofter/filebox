using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileBox.Models
{
    public class Folder 
    {
        
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdParent { get; set; }
        public int IdAccess { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
       
    }
}
