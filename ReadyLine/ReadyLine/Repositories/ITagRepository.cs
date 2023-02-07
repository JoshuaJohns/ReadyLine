using System.Collections.Generic;
using ReadyLine.Models;
namespace ReadyLine.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        void Add(ReportTag reportTag);
    }
}
