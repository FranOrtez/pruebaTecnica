using System.Collections.Generic;

namespace ProductManagement.Domain.Entities;

public class ProductType
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<Product> Products { get; set; } = new List<Product>();
}
