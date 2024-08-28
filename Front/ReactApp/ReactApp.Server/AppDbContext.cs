using Duombaze.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Duombaze
{
    public class AppDbContext : DbContext
    {
        public DbSet<Motherboard> Motherboard { get; set; }
        public DbSet<RAM_Types> RAM_Types { get; set; }
        public DbSet<SocketTypes> SocketTypes { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Motherboard>()
                .Property(m => m.Id)
                .ValueGeneratedOnAdd();
        }
    }
}
