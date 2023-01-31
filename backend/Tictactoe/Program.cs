var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policyBuilder =>
        {
            policyBuilder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseWebSockets();
app.UseSession();

app.MapControllers();

app.Run();