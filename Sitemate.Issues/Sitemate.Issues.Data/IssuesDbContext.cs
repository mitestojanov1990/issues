using Microsoft.EntityFrameworkCore;
using Sitemate.Issues.Data.Models;

namespace Sitemate.Issues.Data;

public sealed class IssuesDbContext : DbContext
{
    public IssuesDbContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Issue> Issues => Set<Issue>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);


        modelBuilder.Entity<Issue>().HasData(
            new Issue { Id = 1, Title = "Issues form doesn't work", Description = "This is created on start of backend, seeding data.." }
        );
    }
}