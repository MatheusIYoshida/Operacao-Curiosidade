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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme) //O parâmetro define que por padrão o sistema usará a autenticação baseada em tokens jwt 
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters //Definição de parâmetros específicos para a validação dok token
        {
            ValidateIssuer = true, //valida emissor
            ValidateAudience = true, //valida audiência
            ValidateLifetime = true, //validade do token
            ValidateIssuerSigningKey = true, //Valida a chave de assinatura do token
            ClockSkew = TimeSpan.Zero, //Permite que não haja um delay entre o servidor de autenticação com o servidor de aplicação
            ValidIssuer = builder.Configuration["JWT:ValidIssuer"], //Valor para o emissor
            ValidAudience = builder.Configuration["JWT:ValidAudience"], //Valor para a audiência
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecretKey"])) //Chave simétrica criada a partir da chave secreta
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
