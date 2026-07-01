using System.Threading.Tasks;
using ProductManagement.Application.DTOs.Auth;

namespace ProductManagement.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);
    Task<LoginResponse> RegisterAsync(RegisterRequest request);
}
