using Microsoft.EntityFrameworkCore;
using ProductManagement.Domain.Entities;

namespace ProductManagement.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductType> ProductTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuraciones adicionales de EF Core si son necesarias
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Email).IsUnique();
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
            entity.HasOne(p => p.ProductTypeEntity)
                  .WithMany(pt => pt.Products)
                  .HasForeignKey(p => p.ProductTypeId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Seed Data for ProductTypes
        modelBuilder.Entity<ProductType>().HasData(
            new ProductType { Id = 1, Name = "Belleza" },
            new ProductType { Id = 2, Name = "Hogar" },
            new ProductType { Id = 3, Name = "Cocina" }
        );
    }
}
