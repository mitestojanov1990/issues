using Microsoft.EntityFrameworkCore;
using Sitemate.Issues.Data;
using Sitemate.Issues.Data.Abstractions;
using Sitemate.Issues.Data.DTO;
using Sitemate.Issues.Data.Models;

namespace Sitemate.Issues.Services;

public sealed class IssuesService(IssuesDbContext context) : IIssuesService
{
    private readonly IssuesDbContext _context = context;
    public async Task<List<IssueDto>> GetAllIssuesAsync()
    {
        return await _context.Issues
            .Select(issue => new IssueDto(issue.Id, issue.Title, issue.Description))
            .ToListAsync();
    }

    public async Task<IssueDto?> GetIssueByIdAsync(int id)
    {
        return await _context.Issues
            .Where(issue => issue.Id == id)
            .Select(issue => new IssueDto(issue.Id, issue.Title, issue.Description))
            .FirstOrDefaultAsync();
    }

    public async Task<IssueDto> CreateIssueAsync(CreateIssueDto dto)
    {
        var issue = new Issue
        {
            Title = dto.Title,
            Description = dto.Description
        };

        _context.Issues.Add(issue);
        await _context.SaveChangesAsync();

        return new IssueDto(issue.Id, issue.Title, issue.Description);
    }

    public async Task<bool> UpdateIssueAsync(int id, UpdateIssueDto dto)
    {
        var existingIssue = await _context.Issues.FindAsync(id);
        if (existingIssue == null)
        {
            return false;
        }

        existingIssue.Title = dto.Title;
        existingIssue.Description = dto.Description;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteIssueAsync(int id)
    {
        var issue = await _context.Issues.FindAsync(id);
        if (issue == null)
        {
            return false;
        }

        _context.Issues.Remove(issue);
        await _context.SaveChangesAsync();

        return true;
    }
}