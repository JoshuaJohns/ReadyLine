using System.Collections.Generic;
using ReadyLine.Models;

namespace ReadyLine.Repositories
{
    public interface IReportRepository
    {
        List<Report> GetAllReports();
        Report GetById(int id);
        void Add(Report report);
        void Update(Report report);

        List<Category> GetAllCategories();
       void AddReportNote(ReportNote note);

        List<ReportNote> GetNotes(int id);
    }
}
