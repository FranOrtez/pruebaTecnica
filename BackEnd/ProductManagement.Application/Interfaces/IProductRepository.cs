using System.Collections.Generic;
using System.Threading.Tasks;
using ProductManagement.Domain.Entities;

namespace ProductManagement.Application.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task<Product> AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<IEnumerable<ProductType>> GetProductTypesAsync();
}
