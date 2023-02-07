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

                User = new User()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                },

                Vehicle = new Vehicle()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("VehicleId")),
                    VehicleTypeId = reader.GetInt32(reader.GetOrdinal("vehicleTypeId")),
                    VehicleNumber = reader.GetString(reader.GetOrdinal("VehicleNumber")),
                    ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                    CurrentMileage = reader.GetInt32(reader.GetOrdinal("CurrentMileage")),
                    MileageAtPMService = reader.GetInt32(reader.GetOrdinal("MileageAtPMService")),
                    IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                    IsClaimed = reader.GetBoolean(reader.GetOrdinal("IsClaimed")),
                    IsInShop = reader.GetBoolean(reader.GetOrdinal("IsInShop")),
                }


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
                     SELECT r.Id, r.CategoryId, r.DateCompleted, r.DateCreated, r.Issue,
		u.Id as UserId, u.Email, u.CreatedDate, u.FirebaseUserId, u.FirstName, u.HireDate, u.ImageUrl, u.JobTitle, u.LastName,
		v.Id as VehicleId, v.CurrentMileage, v.ImageLocation, v.IsApproved, v.IsClaimed, v.IsInShop, v.MileageAtPMService, v.VehicleNumber, v.VehicleTypeId
                    FROM Report r
                    JOIN [User] u on u.Id =r.UserId
                    JOIN Vehicle v on v.Id = r.VehicleId
                    LEFT JOIN ReportTag rt on rt.ReportId = r.Id
                    LEFT JOIN Tag t on t.Id = rt.TagId
                    WHERE r.DateCompleted IS NULL
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

        public void Add(Report report)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Report] (UserId,VehicleId, Issue, CategoryId, DateCreated, DateCompleted)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @VehicleId, @Issue, @CategoryId, @DateCreated, @DateCompleted)";

                    DbUtils.AddParameter(cmd, "@UserId", report.UserId);
                    DbUtils.AddParameter(cmd, "@VehicleId", report.VehicleId);
                    DbUtils.AddParameter(cmd, "@Issue", report.Issue);
                    DbUtils.AddParameter(cmd, "@CategoryId", report.CategoryId);
                    DbUtils.AddParameter(cmd, "@DateCreated", report.DateCreated);
                    DbUtils.AddParameter(cmd, "@DateCompleted", report.DateCompleted);
                    report.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

















    }
}
