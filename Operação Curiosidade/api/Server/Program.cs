using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Server.Pagination;
using Server.Repositories;
using Server.Services;
using Server.Services.Interfaces;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddScoped<ILogRepository, LogRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IEmailValidation, EmailValidation>();
builder.Services.AddScoped<IProfileStatusValidation, ProfileStatusValidation>();
builder.Services.AddScoped<IDataService, DataService>();
builder.Services.AddScoped<IPaginationHelper, PaginationHelper>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme) //O par�metro define que por padr�o o sistema usar� a autentica��o baseada em tokens jwt 
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters //Defini��o de par�metros espec�ficos para a valida��o dok token
        {
            ValidateIssuer = true, //valida emissor
            ValidateAudience = true, //valida audi�ncia
            ValidateLifetime = true, //validade do token
            ValidateIssuerSigningKey = true, //Valida a chave de assinatura do token
            ClockSkew = TimeSpan.Zero, //Permite que n�o haja um delay entre o servidor de autentica��o com o servidor de aplica��o
            ValidIssuer = builder.Configuration["JWT:ValidIssuer"], //Valor para o emissor
            ValidAudience = builder.Configuration["JWT:ValidAudience"], //Valor para a audi�ncia
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecretKey"])) //Chave sim�trica criada a partir da chave secreta
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
