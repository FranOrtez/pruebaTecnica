using System;
using System.Threading.Tasks;
using ProductManagement.Application.DTOs.Auth;
using ProductManagement.Application.Interfaces;
using ProductManagement.Domain.Entities;
using ProductManagement.Domain.Enums;

namespace ProductManagement.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;

    public AuthService(IUserRepository userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        
        if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Credenciales incorrectas.");
        }

        var token = _tokenService.GenerateToken(user);

        return new LoginResponse
        {
            Token = token,
            Email = user.Email,
            Role = user.Role
        };
    }

    public async Task<LoginResponse> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new InvalidOperationException("Este correo ya ha sido tomado.");
        }

        var newUser = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = Role.User.ToString(),
            CreatedAt = DateTime.UtcNow
        };

        var createdUser = await _userRepository.AddAsync(newUser);
        var token = _tokenService.GenerateToken(createdUser);

        return new LoginResponse
        {
            Token = token,
            Email = createdUser.Email,
            Role = createdUser.Role
        };
    }

    private bool VerifyPassword(string password, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }
}
