using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace server.helpers;

public class JwtService{
    readonly string secureKey = "this is a very super secret secure key";
    public string Generate(int id) 
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
        var credintials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
        var header = new JwtHeader(credintials);

        var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Now.AddMinutes(30));
        var secToken = new JwtSecurityToken(header, payload);

        return new JwtSecurityTokenHandler().WriteToken(secToken);
    }

    public JwtSecurityToken Verify(string jwt)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(secureKey);
        tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                ValidateAudience = false,
        }, out SecurityToken validatedToken);

        return (JwtSecurityToken) validatedToken;
    }
}