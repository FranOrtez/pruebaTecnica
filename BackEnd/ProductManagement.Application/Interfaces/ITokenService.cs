using ProductManagement.Domain.Entities;

namespace ProductManagement.Application.Interfaces;

public interface ITokenService
{
    string GenerateToken(User user);
}
