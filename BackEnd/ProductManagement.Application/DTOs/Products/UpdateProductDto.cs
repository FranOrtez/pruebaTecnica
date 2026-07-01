using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Application.DTOs.Products;

public class UpdateProductDto
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    [MaxLength(255)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "La descripción es obligatoria")]
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "El precio es obligatorio")]
    [Range(0.01, double.MaxValue, ErrorMessage = "El precio debe ser mayor que 0")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "El stock es obligatorio")]
    [Range(0, int.MaxValue, ErrorMessage = "El stock no puede ser negativo")]
    public int Stock { get; set; }

    [Required(ErrorMessage = "El tipo de producto es obligatorio")]
    public int ProductTypeId { get; set; }
}
