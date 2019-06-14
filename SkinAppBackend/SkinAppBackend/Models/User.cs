using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SkinAppBackend.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string HashedPassword { get; set; }
        [Required]
        public string PasswordSalt { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }
    }
}
