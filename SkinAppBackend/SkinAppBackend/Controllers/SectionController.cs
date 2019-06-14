using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkinAppBackend.Storage;
using SkinAppBackend.Services;

namespace SkinAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionController : ControllerBase
    {
        private readonly MyContext _context;
        Database db = new Database();
        Hashing hashing = new Hashing();
        EmailValidator validateEmail = new EmailValidator();

        public SectionController(MyContext context)
        {
            _context = context;
        }
        [HttpPost("[action]")]
        public bool CreateSection([FromBody] string[] userData)
        {
            bool success = false;
            int userId = Convert.ToInt32(userData[0]);
            try
            {
                string email = db.GetEmail(_context, userId);
                db.CreateSection(_context, userId, userData[1]);
                success = true;
            }
            catch (Exception e)
            {
                string error = e.Message;
            }
            return success;
        }
        [HttpPost("[action]")]
        public List<Models.Section> GetSections ([FromBody] string[] userData)
        {
            List<Models.Section> sections = db.GetSections(_context, userData[0]);

            return sections;
        }
        [HttpPost("[action]")]
        public string SaveImage([FromBody] string[] data)
        {
            string message = "";
            //bool success = false;
            try
            {
                //var Picture = new Models.Picture
                //{
                //    Image = data,
                //    PictureSavedDate = DateTime.Now.Date,
                //    UserTaken = true,
                //    SectionId = 4
                //};
                //db.SavePicture(_context, Picture);
                //message = "image saved";
            }
            catch (Exception)
            {
                message = "error";
            }
            return message;
        }
    }
}