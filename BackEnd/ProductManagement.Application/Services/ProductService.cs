using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductManagement.Application.DTOs.Products;
using ProductManagement.Application.Interfaces;
using ProductManagement.Domain.Entities;

namespace ProductManagement.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        var products = await _productRepository.GetAllAsync();
        return products.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            ProductTypeId = p.ProductTypeId,
            ProductTypeName = p.ProductTypeEntity?.Name ?? string.Empty
        });
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        var p = await _productRepository.GetByIdAsync(id);
        if (p == null) return null;

        return new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            ProductTypeId = p.ProductTypeId,
            ProductTypeName = p.ProductTypeEntity?.Name ?? string.Empty
        };
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            ProductTypeId = dto.ProductTypeId
        };

        var createdProduct = await _productRepository.AddAsync(product);

        return new ProductDto
        {
            Id = createdProduct.Id,
            Name = createdProduct.Name,
            Description = createdProduct.Description,
            Price = createdProduct.Price,
            Stock = createdProduct.Stock,
            ProductTypeId = createdProduct.ProductTypeId,
            ProductTypeName = createdProduct.ProductTypeEntity?.Name ?? string.Empty
        };
    }

    public async Task UpdateProductAsync(int id, UpdateProductDto dto)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null)
            throw new KeyNotFoundException("Producto no encontrado.");

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Stock = dto.Stock;
        product.ProductTypeId = dto.ProductTypeId;
        product.UpdatedAt = System.DateTime.UtcNow;

        await _productRepository.UpdateAsync(product);
    }

    public async Task DeleteProductAsync(int id)
    {
        var exists = await _productRepository.ExistsAsync(id);
        if (!exists)
            throw new KeyNotFoundException("Producto no encontrado.");

        await _productRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<ProductTypeDto>> GetProductTypesAsync()
    {
        var types = await _productRepository.GetProductTypesAsync();
        return types.Select(t => new ProductTypeDto
        {
            Id = t.Id,
            Name = t.Name
        });
    }
}
