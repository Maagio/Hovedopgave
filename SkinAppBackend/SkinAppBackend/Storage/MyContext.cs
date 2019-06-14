using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SkinAppBackend.Storage
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }

        public DbSet<Models.User> Users { get; set; }
        public DbSet<Models.Section> Sections { get; set; }
        public DbSet<Models.Picture> Picutres { get; set; }
    }
}
