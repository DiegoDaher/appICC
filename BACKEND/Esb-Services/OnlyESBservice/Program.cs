using OnlyESBservice.Services;

var builder = WebApplication.CreateBuilder(args);

// Agregar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // <- origen del frontend
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient(); // NECESARIO para IHttpClientFactory

// Agregar RedisService
builder.Services.AddSingleton(new RedisService("token_cache:6379"));

var app = builder.Build();

// Usar CORS ANTES de los endpoints
app.UseCors("PermitirFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
