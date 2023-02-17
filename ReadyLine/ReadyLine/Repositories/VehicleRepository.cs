using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ReadyLine.Models;
using ReadyLine.Utils;
using System.Collections.Generic;
using System.Linq;

namespace ReadyLine.Repositories
{
    public class VehicleRepository : BaseRepository, IVehicleRepository
    {
        public VehicleRepository(IConfiguration config) : base(config) { }





        private Vehicle NewVehicleFromReader(SqlDataReader reader)
        {
            return new Vehicle()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),

                MileageAtPMService = reader.GetInt32(reader.GetOrdinal("MileageAtPMService")),
                CurrentMileage = reader.GetInt32(reader.GetOrdinal("CurrentMileage")),
                VehicleNumber = reader.GetString(reader.GetOrdinal("VehicleNumber")),
                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                IsClaimed = reader.GetBoolean(reader.GetOrdinal("IsClaimed")),
                IsInShop = reader.GetBoolean(reader.GetOrdinal("IsInShop")),
                VehicleTypeId = reader.GetInt32(reader.GetOrdinal("VehicleTypeId")),
                Reports = new List<Report>(),
                VehicleType = new VehicleType()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),

                }




            };


        }


        public List<Vehicle> GetAllVehicles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT            v.Id, v.ImageLocation, v.IsApproved, v.IsClaimed, v.IsInShop, v.MileageAtPMService, v.VehicleNumber, v.VehicleTypeId, v.CurrentMileage,
                                     r.Id as ReportId, r.CategoryId, r.DateCompleted, r.DateCreated, r.Issue, r.UserId, r.VehicleId,
                                vt.Id, vt.Name
                         FROM Vehicle v
                            JOIN VehicleType vt on vt.Id = v.VehicleTypeId
                            LEFT JOIN Report r on r.VehicleId = v.Id
                        ORDER BY  r.Id DESC
                              
                    ";

                    var reader = cmd.ExecuteReader();

                    var vehicles = new List<Vehicle>();

                    while (reader.Read())
                    {
                        var vehicletId = DbUtils.GetInt(reader, "Id");

                        var existingVehicle = vehicles.FirstOrDefault(prop => prop.Id == vehicletId);
                        if (existingVehicle == null)
                        {
                            existingVehicle = new Vehicle()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),

                                MileageAtPMService = reader.GetInt32(reader.GetOrdinal("MileageAtPMService")),
                                CurrentMileage = reader.GetInt32(reader.GetOrdinal("CurrentMileage")),
                                VehicleNumber = reader.GetString(reader.GetOrdinal("VehicleNumber")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                IsClaimed = reader.GetBoolean(reader.GetOrdinal("IsClaimed")),
                                IsInShop = reader.GetBoolean(reader.GetOrdinal("IsInShop")),
                                VehicleTypeId = reader.GetInt32(reader.GetOrdinal("VehicleTypeId")),
                                Reports = new List<Report>(),
                                VehicleType = new VehicleType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),

                                },

                            };


                            vehicles.Add(existingVehicle);
                        }
                        if (DbUtils.IsNotDbNull(reader, "ReportId"))
                        {
                            existingVehicle.Reports.Add(
                              new Report()
                              {
                                  Id = reader.GetInt32(reader.GetOrdinal("ReportId")),
                           
                                  Issue = reader.GetString(reader.GetOrdinal("Issue")),
                                  DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                                  DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted"),
                                  CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                  UserId = reader.GetInt32(reader.GetOrdinal("Id"))

                              });


                        }
                    }
                    reader.Close();
                    return vehicles;
                }

            }
        }

        public List<VehicleType> GetAllVehicleTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT *
                         FROM VehicleType 
                           
                              
                    ";

                    var reader = cmd.ExecuteReader();

                    var types = new List<VehicleType>();

                    while (reader.Read())
                    {
                        types.Add(new VehicleType
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        }
                        );
                    }

                    reader.Close();

                    return types;
                }
            }
        }

        public Vehicle GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT TOP 50
                            v.Id, v.ImageLocation, v.IsApproved, v.IsClaimed, v.IsInShop, v.MileageAtPMService, v.VehicleNumber, v.VehicleTypeId, v.CurrentMileage,
                            vt.Id, vt.Name,
                            r.Id as ReportId, r.CategoryId, r.DateCompleted, r.DateCreated, r.Issue, r.UserId, r.VehicleId,
                             rn.Id as ReportNoteId, rn.Content,
                            u.FirstName, u.LastName,
                             t.Status, t.Id as TagId
                         FROM Vehicle v
                        JOIN VehicleType vt on vt.Id = v.VehicleTypeId
                       LEFT JOIN Report r on r.VehicleId = v.Id
                        LEFT JOIN [User] u on u.Id = r.UserId
                          LEFT JOIN ReportTag rt on rt.ReportId = r.Id
                        LEFT JOIN ReportNote rn on rn.ReportId = r.Id
                    LEFT JOIN Tag t on t.Id = rt.TagId
                    WHERE v.Id = @Id
                    ORDER BY r.DateCreated DESC
                      
             
";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Vehicle vehicle = null;
                        

                        while (reader.Read())
                        {

                            if (vehicle == null)
                            {
                                vehicle = NewVehicleFromReader(reader);

                            }

                            int reportId = 0;
                            if (DbUtils.IsNotDbNull(reader, "ReportId")) {

                             reportId = DbUtils.GetInt(reader, "ReportId");
                            }

                            var existingReport = vehicle.Reports.FirstOrDefault(prop => prop.Id == reportId);

                            if (DbUtils.IsNotDbNull(reader, "ReportId") && existingReport == null)
                            {

                                existingReport = new Report()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("ReportId")),
                                    Issue = reader.GetString(reader.GetOrdinal("Issue")),
                                    DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                                    DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted"),
                                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Tags = new List<Tag>(),
                                    Notes = new List<ReportNote>(),
                                    UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                                    User = new User()
                                    {
                                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                        LastName = reader.GetString(reader.GetOrdinal("LastName"))
                                    },
                                    VehicleId = reader.GetInt32(reader.GetOrdinal("VehicleId")),
                                   
                                };
                                vehicle.Reports.Add(existingReport);
                            }

                            Tag existingTag = null;
                            int tagId = 0;
                            if (DbUtils.IsNotDbNull(reader, "TagId"))
                            {

                                tagId = DbUtils.GetInt(reader, "TagId");
                            }

                            if (reportId != 0)
                            {

                             existingTag = existingReport.Tags.FirstOrDefault(prop => prop.Id == tagId);
                            }

                            if (DbUtils.IsNotDbNull(reader, "TagId") && existingTag == null)
                            {
                                existingTag = 
                                  new Tag
                                  {
                                      Id = reader.GetInt32(reader.GetOrdinal("TagId")),
                                      Status = reader.GetString(reader.GetOrdinal("Status")),

                                  };

                                existingReport.Tags.Add(existingTag);
                            }
                            if (DbUtils.IsNotDbNull(reader, "ReportNoteId"))
                            {
                                existingReport.Notes.Add(
                                  new ReportNote
                                  {
                                      Id = reader.GetInt32(reader.GetOrdinal("ReportNoteId")),
                                      Content = reader.GetString(reader.GetOrdinal("Content")),

                                  });


                            }
                        }

                        return vehicle;
                    }
                }
            }
        }
        public ClaimVehicle GetClaimById(int vehicleId, int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                           *
                         FROM ClaimVehicle c
                    WHERE c.UserId = @userId AND c.VehicleId = @vehicleId
                      
             
";

                    DbUtils.AddParameter(cmd, "@vehicleId", vehicleId);
                    DbUtils.AddParameter(cmd, "@userId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        ClaimVehicle claim = null;
                        if (reader.Read())
                        {
                            claim = new ClaimVehicle()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                VehicleId = reader.GetInt32(reader.GetOrdinal("VehicleId")),
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                            };

                        }

                        return claim;
                    }
                }
            }
        }

        public void Add(Vehicle vehicle)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Vehicle (CurrentMileage, ImageLocation, IsApproved, IsClaimed, IsInShop, MileageAtPMService, VehicleNumber, VehicleTypeId)
                        OUTPUT INSERTED.ID
                        VALUES (@CurrentMileage, @ImageLocation, @IsApproved, @IsClaimed, @IsInShop, @MileageAtPMService, @VehicleNumber, @VehicleTypeId )";

                    DbUtils.AddParameter(cmd, "@CurrentMileage", vehicle.CurrentMileage);
                    DbUtils.AddParameter(cmd, "@ImageLocation", vehicle.ImageLocation);
                    DbUtils.AddParameter(cmd, "@IsApproved", vehicle.IsApproved);
                    DbUtils.AddParameter(cmd, "@IsClaimed", vehicle.IsClaimed);
                    DbUtils.AddParameter(cmd, "@IsInShop", vehicle.IsInShop);
                    DbUtils.AddParameter(cmd, "@MileageAtPMService", vehicle.MileageAtPMService);
                    DbUtils.AddParameter(cmd, "@VehicleNumber", vehicle.VehicleNumber);
                    DbUtils.AddParameter(cmd, "@VehicleTypeId", vehicle.VehicleTypeId);

                    vehicle.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void AddClaim(ClaimVehicle claim)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ClaimVehicle (VehicleId, UserId, BeginDate, EndDate)
                        OUTPUT INSERTED.ID
                        VALUES (@VehicleId, @UserId, @BeginDate, @EndDate )";

                    DbUtils.AddParameter(cmd, "@VehicleId", claim.VehicleId);
                    DbUtils.AddParameter(cmd, "@UserId", claim.UserId);
                    DbUtils.AddParameter(cmd, "@BeginDate", claim.BeginDate);
                    DbUtils.AddParameter(cmd, "@EndDate", claim.EndDate);
                    claim.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteVehicle(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Vehicle 
                        WHERE Vehicle.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteClaim(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM ClaimVehicle 
                        WHERE ClaimVehicle.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Vehicle vehicle)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Vehicle]
                           SET CurrentMileage = @CurrentMileage,
                               ImageLocation = @ImageLocation,
                               IsApproved = @IsApproved,
                               IsClaimed = @IsClaimed,
                               IsInShop = @IsInShop,
                               MileageAtPMService = @MileageAtPMService,
                               VehicleNumber = @VehicleNumber,
                               VehicleTypeId = @VehicleTypeId
                                

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@CurrentMileage", vehicle.CurrentMileage);
                    DbUtils.AddParameter(cmd, "@Id", vehicle.Id);
                    DbUtils.AddParameter(cmd, "@ImageLocation", vehicle.ImageLocation);
                    DbUtils.AddParameter(cmd, "@IsApproved", vehicle.IsApproved);
                    DbUtils.AddParameter(cmd, "@IsClaimed", vehicle.IsClaimed);
                    DbUtils.AddParameter(cmd, "@IsInShop", vehicle.IsInShop);
                    DbUtils.AddParameter(cmd, "@MileageAtPMService", vehicle.MileageAtPMService);
                    DbUtils.AddParameter(cmd, "@VehicleNumber", vehicle.VehicleNumber);
                    DbUtils.AddParameter(cmd, "@VehicleTypeId", vehicle.VehicleTypeId);
                    cmd.ExecuteNonQuery();
                }
            }
        }









    }
}
