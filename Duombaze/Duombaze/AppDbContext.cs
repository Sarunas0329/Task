using Duombaze.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Duombaze
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
             : base(options)
        {
        }

        public DbSet<Motherboard> Motherboard { get; set; }
    }
}
