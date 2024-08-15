using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sitemate.Issues.Data;
using Sitemate.Issues.Data.Abstractions;
using Sitemate.Issues.Data.DTO;
using Sitemate.Issues.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddData(builder.Configuration);

builder.Services.AddScoped<IIssuesService, IssuesService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/issues", async ([FromServices] IIssuesService service) =>
    await service.GetAllIssuesAsync())
    .WithName("GetIssues")
    .WithOpenApi();

app.MapGet("/issues/{id}", async ([FromServices] IIssuesService service, int id) =>
    await service.GetIssueByIdAsync(id) is IssueDto issue
        ? Results.Ok(issue)
        : Results.NotFound())
    .WithName("GetIssueById")
    .WithOpenApi();

app.MapPost("/issues", async ([FromServices] IIssuesService service, CreateIssueDto dto) =>
{
    var createdIssue = await service.CreateIssueAsync(dto);
    return Results.Created($"/issues/{createdIssue.Id}", createdIssue);
})
.WithName("CreateIssue")
.WithOpenApi();

app.MapPut("/issues/{id}", async ([FromServices] IIssuesService service, int id, UpdateIssueDto dto) =>
{
    var result = await service.UpdateIssueAsync(id, dto);
    return result ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateIssue")
.WithOpenApi();

app.MapDelete("/issues/{id}", async ([FromServices] IIssuesService service, int id) =>
{
    var result = await service.DeleteIssueAsync(id);
    return result ? Results.NoContent() : Results.NotFound();
})
.WithName("DeleteIssue")
.WithOpenApi();


app.MapFallbackToFile("/index.html");

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
