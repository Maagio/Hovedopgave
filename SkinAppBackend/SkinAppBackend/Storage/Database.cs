using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SkinAppBackend.Storage
{
    public class Database
    {
        Services.Hashing hashing = new Services.Hashing();

        public bool CreateUser(MyContext context, string email, string password)
        {
            bool canCreateUser = true;

            try
            {
                // Splits the hashed password which also has the salt, so both can be saved in the database
                var split = password.Split(":");
                string salt = split[0];
                string hashedPassword = split[1];

                var user = new Models.User
                {
                    Email = email,
                    HashedPassword = hashedPassword,
                    PasswordSalt = salt,
                    CreationDate = DateTime.Now.Date
                };

                context.Users.Add(user);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                canCreateUser = false;
                string error = e.Message;
            }
            return canCreateUser;
        }
        public bool ValidateUser(MyContext context, string email, string password, ref string errorMessage)
        {
            var id = GetUserId(context, email);

            bool validUser = false;
            string hashedPassword = null;

            if (email != null)
            {
                if (id != 0)
                {
                    var split = hashing.HashPassword(password, GetSalt(context, id)).Split(":");
                    hashedPassword = split[1];

                    int passwordCheck = context.Users
                        .Where(p => p.HashedPassword == hashedPassword && p.Email == email).Count();
                    if (passwordCheck > 0)
                        validUser = true;
                    else
                        errorMessage = "Incorrect password";
                }
                else
                    errorMessage = "Could not find a user with that email";
            }

            return validUser;
        }
        public int GetUserId(MyContext context, string email)
        {
            try
            {
                var user = context.Users
                    .Where(p => p.Email == email)
                    .Select(p => new Models.User { UserId = p.UserId }).ToList();

                return user[0].UserId;
            }
            catch (Exception)
            {
                return 0;
            }
        }
        public string GetEmail(MyContext context, int userId)
        {
            var user = context.Users
                .Where(p => p.UserId == userId)
                .Select(p => new Models.User { Email = p.Email }).ToList();

            return user[0].Email;
        }
        public string GetSalt(MyContext context, int userId)
        {
            var user = context.Users
                .Where(p => p.UserId == userId)
                .Select(p => new Models.User { PasswordSalt = p.PasswordSalt }).ToList();

            return user[0].PasswordSalt;
        }
        public Models.User GetUser(MyContext context, int userId)
        {
            var user = context.Users
                .Where(p => p.UserId == userId)
                .Select(p => new Models.User
                {
                    UserId = p.UserId,
                    Email = p.Email,
                    CreationDate = p.CreationDate,
                    HashedPassword = p.HashedPassword,
                    PasswordSalt = p.PasswordSalt
                }).ToList();

            return user[0];
        }
        public bool CreateSection(MyContext context, int userId, string sectionName)
        {
            bool created = false;

            var user = GetUser(context, userId);

            try
            {
                var section = new Models.Section
                {
                    Name = sectionName,
                    SectionCreationDate = DateTime.Now.Date,
                    UserId = user.UserId
                };

                context.Sections.Add(section);
                context.SaveChanges();

                created = true;
            }
            catch (Exception e)
            {
                string error = e.Message;
            }

            return created;
        }
        public List<Models.Section> GetSections(MyContext context, string userId)
        {
            //Models.Section[] sections = [];
            var sections = context.Sections
                .Where(p => p.UserId == Convert.ToInt32(userId))
                .Select(p => new Models.Section
                {
                    SectionId = p.SectionId,
                    Name = p.Name,
                    SectionCreationDate = p.SectionCreationDate,
                    UserId = p.UserId
                }).ToList();

            return sections;
        }
        public void SavePicture(MyContext context, Models.Picture picture)
        {
            try
            {
                context.Picutres.Add(picture);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                string error = e.Message;
            }
        }
    }
}
