using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ReadyLine.Models;
using ReadyLine.Utils;


namespace ReadyLine.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration config) : base(config) { }





        private Tag NewTagFromReader(SqlDataReader reader)
        {
            return new Tag()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Status = reader.GetString(reader.GetOrdinal("Status"))


            };


        }


        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT *
                     FROM Tag 
                    
                    ";

                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tag>();

                    while (reader.Read())
                    {
                        tags.Add(NewTagFromReader(reader));
                    }

                    reader.Close();

                    return tags;
                }
            }
        }

        public void Add(ReportTag reportTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [ReportTag] (ReportId, TagId)
                        OUTPUT INSERTED.ID
                        VALUES (@ReportId, @TagId)";

                    DbUtils.AddParameter(cmd, "@ReportId", reportTag.ReportId);
                    DbUtils.AddParameter(cmd, "@TagId", reportTag.TagId);



                    reportTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }












    }
}
