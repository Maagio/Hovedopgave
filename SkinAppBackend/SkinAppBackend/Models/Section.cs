using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SkinAppBackend.Models
{
    public class Section
    {
        [Key]
        public int SectionId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime SectionCreationDate { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
