using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Sitemate.Issues.Data;
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddData(this IServiceCollection services, IConfiguration configuration)
    {
        string connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException(nameof(configuration));
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("DB ConnectionString is not configured.");
        }

        services.AddDbContext<IssuesDbContext>(opt =>
            opt.UseSqlite(connectionString, x =>
            {
                x.MigrationsAssembly("Sitemate.Issues.Data");
            })
        );
        return services;
    }
}
