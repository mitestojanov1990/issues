My choise for the backend is .NET Core 8. This is where I feel most productive.

Frontend will be in ReactJS using Typescript.

# Backend

### You can run backend in Docker (Linux)

### You can also run backend using dotnet tools on Windows/Mac/Linux

```
dotnet run
```

```
dotnet ef migrations add Initial --project ../Sitemate.Issues.Data/ --context IssuesDbContext -o Migrations
```

```
dotnet ef database update --project ../Sitemate.Issues.Data/ --context IssuesDbContext
```
