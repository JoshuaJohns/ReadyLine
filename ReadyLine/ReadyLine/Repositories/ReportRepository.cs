using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ReadyLine.Models;
using ReadyLine.Utils;
using System.Linq;

namespace ReadyLine.Repositories
{
    public class ReportRepository : BaseRepository, IReportRepository
    {

        public ReportRepository(IConfiguration config) : base(config) { }





        private Report NewReportFromReader(SqlDataReader reader)
        {
            var report = new Report();
            return new Report()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Issue = reader.GetString(reader.GetOrdinal("Issue")),
                DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                UserId = reader.GetInt32(reader.GetOrdinal("ReportUserId")),
                VehicleId = reader.GetInt32(reader.GetOrdinal("ReportVehicleId")),

                User = new User()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                },
                Category = new Category()
                {
                    Stage = DbUtils.GetString(reader, "Stage"),

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
                },
                Tags = new List<Tag>(),
                Notes = new List<ReportNote>()

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
                     SELECT r.Id, r.CategoryId, r.DateCompleted, r.DateCreated, r.Issue, r.UserId as ReportUserId, r.VehicleId as ReportVehicleId,
		u.Id as UserId, u.Email, u.CreatedDate, u.FirebaseUserId, u.FirstName, u.HireDate, u.ImageUrl, u.JobTitle, u.LastName,
		v.Id as VehicleId, v.CurrentMileage, v.ImageLocation, v.IsApproved, v.IsClaimed, v.IsInShop, v.MileageAtPMService, v.VehicleNumber, v.VehicleTypeId,
         t.Status, t.Id as TagId,
            c.Stage
                    FROM Report r
                    JOIN [User] u on u.Id =r.UserId
                    JOIN Vehicle v on v.Id = r.VehicleId
                    JOIN Category c on c.Id = r.CategoryId
                     LEFT JOIN ReportTag rt on rt.ReportId = r.Id
                    LEFT JOIN Tag t on t.Id = rt.TagId
                    ORDER BY r.CategoryId
             
                    ";

                    var reader = cmd.ExecuteReader();

                    var reports = new List<Report>();

                    while (reader.Read())
                    {
                        var reportId = DbUtils.GetInt(reader, "Id");

                        var existingReport = reports.FirstOrDefault(prop => prop.Id == reportId);
                        if (existingReport == null)
                        {
                        existingReport = new Report()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Issue = reader.GetString(reader.GetOrdinal("Issue")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted"),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserId = reader.GetInt32(reader.GetOrdinal("ReportUserId")),
                            VehicleId = reader.GetInt32(reader.GetOrdinal("ReportVehicleId")),
                            User = new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            },
                            Category = new Category()
                            {
                                Stage = DbUtils.GetString(reader, "Stage"),

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
                            },
                            Tags = new List<Tag>()
                        };

                        reports.Add(existingReport);

                        }

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            existingReport.Tags.Add(
                              new Tag
                              {
                                  Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                                  Status = reader.GetString(reader.GetOrdinal("Status")),

                              });


                        }




                    }

                    reader.Close();

                    return reports;
                }
            }
        }

        public List<Report> GetAllReadyLineReports()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT r.Id, r.CategoryId, r.DateCompleted, r.DateCreated, r.Issue, r.UserId as ReportUserId, r.VehicleId as ReportVehicleId,
		u.Id as UserId, u.Email, u.CreatedDate, u.FirebaseUserId, u.FirstName, u.HireDate, u.ImageUrl, u.JobTitle, u.LastName,
		v.Id as VehicleId, v.CurrentMileage, v.ImageLocation, v.IsApproved, v.IsClaimed, v.IsInShop, v.MileageAtPMService, v.VehicleNumber, v.VehicleTypeId,
         t.Status, t.Id as TagId,
            c.Stage
                    FROM Report r
                    JOIN [User] u on u.Id =r.UserId
                    JOIN Vehicle v on v.Id = r.VehicleId
                    JOIN Category c on c.Id = r.CategoryId
                     LEFT JOIN ReportTag rt on rt.ReportId = r.Id
                    LEFT JOIN Tag t on t.Id = rt.TagId
                    ORDER BY r.CategoryId
             
                    ";

                    var reader = cmd.ExecuteReader();

                    var reports = new List<Report>();

                    while (reader.Read())
                    {
                        var reportId = DbUtils.GetInt(reader, "Id");

                        var existingReport = reports.FirstOrDefault(prop => prop.Id == reportId);
                        if (existingReport == null)
                        {
                            existingReport = new Report()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Issue = reader.GetString(reader.GetOrdinal("Issue")),
                                DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                                DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted"),
                                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                UserId = reader.GetInt32(reader.GetOrdinal("ReportUserId")),
                                VehicleId = reader.GetInt32(reader.GetOrdinal("ReportVehicleId")),
                                User = new User()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                },
                                Category = new Category()
                                {
                                    Stage = DbUtils.GetString(reader, "Stage"),

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
                                },
                                Tags = new List<Tag>()
                            };

                            reports.Add(existingReport);

                        }

                        if (DbUtils.IsNotDbNull(reader, "TagId"))
                        {
                            existingReport.Tags.Add(
                              new Tag
                              {
                                  Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                                  Status = reader.GetString(reader.GetOrdinal("Status")),

                              });


                        }




                    }

                    reader.Close();

                    return reports;
                }
            }
        }

        public Report GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT r.Id, r.CategoryId, r.DateCompleted, r.DateCreated, r.Issue, r.UserId as ReportUserId, r.VehicleId as ReportVehicleId,
		u.Id as UserId, u.Email, u.CreatedDate, u.FirebaseUserId, u.FirstName, u.HireDate, u.ImageUrl, u.JobTitle, u.LastName,
		v.Id as VehicleId, v.CurrentMileage, v.ImageLocation, v.IsApproved, v.IsClaimed, v.IsInShop, v.MileageAtPMService, v.VehicleNumber, v.VehicleTypeId,
          t.Status, t.Id as TagId,
              
        c.Stage
      
                    FROM Report r
                    JOIN [User] u on u.Id =r.UserId
                    JOIN Vehicle v on v.Id = r.VehicleId
                       JOIN Category c on c.Id = r.CategoryId
                
                     LEFT JOIN ReportTag rt on rt.ReportId = r.Id
                    LEFT JOIN Tag t on t.Id = rt.TagId
                    WHERE r.Id = @Id          
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Report report = null;
                        while (reader.Read())
                        {
                            if (report == null)
                            {
                                report = NewReportFromReader(reader);

                            }

                            if (DbUtils.IsNotDbNull(reader, "TagId"))
                            {
                                report.Tags.Add(
                                new Tag
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                                    Status = reader.GetString(reader.GetOrdinal("Status")),

                                });
                            }
                           

                        }

                        return report;
                    }
                }
            }
        }

        public List<ReportNote> GetNotes(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT
                         rn.Id as ReportNoteId, rn.Content, rn.CreateDateTime, rn.UserId as RNUserId,
                         u.FirstName, u.Lastname
      
                    FROM ReportNote rn 
                    JOIN [User] u on u.Id = rn.UserId
                        
                     
                   
                    WHERE rn.ReportId = @Id          
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var notes = new List<ReportNote>();
                        while (reader.Read())
                        {
                           
                            
                                

                            

                    
                            
                                notes.Add(
                                new ReportNote
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("ReportNoteId")),
                                    Content = reader.GetString(reader.GetOrdinal("Content")),
                                    UserId = reader.GetInt32(reader.GetOrdinal("RNUserId")),
                                    User = new User()
                                    {
                                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                        LastName = reader.GetString(reader.GetOrdinal("LastName"))

                                    },

                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),

                                });
                            

                        }

                        return notes;
                    }
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
        public void AddReportNote(ReportNote note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [ReportNote] (ReportId,Content, CreateDateTime, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@ReportId, @Content, @CreateDateTime, @UserId)";

                    DbUtils.AddParameter(cmd, "@ReportId", note.ReportId);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", note.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@UserId", note.UserId);
                    note.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Report report)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Report]
                           SET UserId = @UserId,
                               VehicleId = @VehicleId,
                               Issue = @Issue,
                               CategoryId = @CategoryId,
                               DateCreated = @DateCreated,
                               DateCompleted = @DateCompleted
                               

                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", report.Id);
                    DbUtils.AddParameter(cmd, "@UserId", report.UserId);
                    DbUtils.AddParameter(cmd, "@VehicleId", report.VehicleId);
                    DbUtils.AddParameter(cmd, "@Issue", report.Issue);
                    DbUtils.AddParameter(cmd, "@CategoryId", report.CategoryId);
                    DbUtils.AddParameter(cmd, "@DateCreated", report.DateCreated);
                    DbUtils.AddParameter(cmd, "@DateCompleted", report.DateCompleted);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT * FROM Category
                  
             
                    ";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {

                        var category = new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Stage = reader.GetString(reader.GetOrdinal("Stage"))

                        };

                        categories.Add(category);




                    }

                    reader.Close();

                    return categories;
                }
            }
        }














    }
}
