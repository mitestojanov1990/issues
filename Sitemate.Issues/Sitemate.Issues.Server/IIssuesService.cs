using Sitemate.Issues.Data.DTO;

namespace Sitemate.Issues.Server;

public interface IIssuesService
{
    Task<List<IssueDto>> GetAllIssuesAsync();
    Task<IssueDto?> GetIssueByIdAsync(int id);
    Task<IssueDto> CreateIssueAsync(CreateIssueDto dto);
    Task<bool> UpdateIssueAsync(int id, UpdateIssueDto dto);
    Task<bool> DeleteIssueAsync(int id);
}
