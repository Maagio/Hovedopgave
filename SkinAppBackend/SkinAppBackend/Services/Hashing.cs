using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace SkinAppBackend.Services
{
    public class Hashing
    {
        // Settings for the hashing and salting process
        const int saltSize = 24;
        const int hashByteSize = 20;
        const int iterations = 1000;
        byte[] salt = new byte[saltSize];
        public string HashPassword(string password, string saltString)
        {
            //string saltAndPassword = null;

            if (saltString == "new")
            {
                // Creates a byte array for the salt and fills it with random bytes
                GenerateSalt();
            }
            else
                salt = Convert.FromBase64String(saltString);

            // Hashes the password based on iterations and the salt
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt);
            pbkdf2.IterationCount = iterations;
            var hashedPassword = pbkdf2.GetBytes(hashByteSize);

            // Converts the salt and hashed password to string and puts them together, which then later can get split
            string saltAndPassword = Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hashedPassword);

            return saltAndPassword;
        }
        public void GenerateSalt()
        {
            var cryptoProvider = new RNGCryptoServiceProvider();
            cryptoProvider.GetBytes(salt);
        }
    }
}
