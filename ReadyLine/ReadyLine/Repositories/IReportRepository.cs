using System.Collections.Generic;
using ReadyLine.Models;

namespace ReadyLine.Repositories
{
    public interface IReportRepository
    {
        List<Report> GetAllReports();
    }
}
