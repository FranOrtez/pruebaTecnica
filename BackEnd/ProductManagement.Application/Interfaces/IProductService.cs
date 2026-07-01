using System.Collections.Generic;
using System.Threading.Tasks;
using ProductManagement.Application.DTOs.Products;

namespace ProductManagement.Application.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync();
    Task<ProductDto?> GetProductByIdAsync(int id);
    Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto);
    Task UpdateProductAsync(int id, UpdateProductDto updateProductDto);
    Task DeleteProductAsync(int id);
    Task<IEnumerable<ProductTypeDto>> GetProductTypesAsync();
}
