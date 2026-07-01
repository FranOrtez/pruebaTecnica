using System.Threading.Tasks;
using ProductManagement.Domain.Entities;

namespace ProductManagement.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User> AddAsync(User user);
}
