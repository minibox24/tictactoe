var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseWebSockets();
app.UseSession();

app.MapControllers();

app.Run();