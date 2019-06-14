using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SkinAppBackend.Models
{
    public class Picture
    {
        [Key]
        public int PictureId { get; set; }
        [Required]
        public byte[] Image { get; set; }
        [Required]
        public DateTime PictureSavedDate { get; set; }
        [Required]
        public bool UserTaken { get; set; }

        public int SectionId { get; set; }
        public Section Section { get; set; }
    }
}
