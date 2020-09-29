using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileBox.Models
{
    public class Pricing
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Volume { get; set; }
        public int Price { get; set; }
        public int Users { get; set; }
        public string Status { get; set; }
    }
}
