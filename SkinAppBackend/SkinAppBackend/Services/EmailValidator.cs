using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkinAppBackend.Services
{
    public class EmailValidator
    {
        public bool Validate(string email)
        {
            try
            {
                var address = new System.Net.Mail.MailAddress(email);
                return address.Address == email;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
