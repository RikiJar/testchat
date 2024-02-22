using Microsoft.EntityFrameworkCore;
using server.models;

public class YourDbContext : DbContext
{
    public YourDbContext(DbContextOptions<YourDbContext> options) : base(options)
    {
    }

    // DbSet properties for your entities
    public DbSet<messages> messages { get; set; }
    public DbSet<users> users { get; set; }
}