using backend.Dtos;

namespace backend.Services.AuthService
{
    public interface IAuthService
    {
        LoginResponse? Login(LoginRequest request);
    }
}
