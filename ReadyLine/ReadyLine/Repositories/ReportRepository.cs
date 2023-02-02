using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ReadyLine.Models;
using ReadyLine.Utils;

namespace ReadyLine.Repositories
{
    public class ReportRepository : BaseRepository, IReportRepository
    {

        public ReportRepository(IConfiguration config) : base(config) { }





        private Report NewReportFromReader(SqlDataReader reader)
        {
            return new Report()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Issue = reader.GetString(reader.GetOrdinal("Issue")),
                DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Tags = new List<Tag>(),
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                // User = new User()
                // {
                //     Id = reader.GetInt32(reader.GetOrdinal("Id")),
                //     FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                //     FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                //     LastName = reader.GetString(reader.GetOrdinal("LastName")),
                //     Email = reader.GetString(reader.GetOrdinal("Email")),
                //     ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                // },
                VehicleId = reader.GetInt32(reader.GetOrdinal("VehicleId")),
                // Vehicle = new Vehicle()
                // {
                //     Id = reader.GetInt32(reader.GetOrdinal("Id")),
                //     vehicleTypeId = reader.GetInt32(reader.GetOrdinal("vehicleTypeId")),
                //     VehicleNumber = reader.GetString(reader.GetOrdinal("VehicleNumber")),

                // }


            };


        }


        public List<Report> GetAllReports()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT *
                         FROM Report p
                              
                    ";

                    var reader = cmd.ExecuteReader();

                    var reports = new List<Report>();

                    while (reader.Read())
                    {
                        reports.Add(NewReportFromReader(reader));
                    }

                    reader.Close();

                    return reports;
                }
            }
        }

    }
}
