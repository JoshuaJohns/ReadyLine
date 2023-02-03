using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ReadyLine.Models;
using ReadyLine.Utils;
using System.Collections.Generic;

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
                VehicleType = new VehivleType()
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
                       SELECT *
                         FROM Vehicle v
                            JOIN VehicleType vt on vt.Id = v.VehicleTypeId
                        ORDER BY v.VehicleNumber
                              
                    ";

                    var reader = cmd.ExecuteReader();

                    var vehicles = new List<Vehicle>();

                    while (reader.Read())
                    {
                        vehicles.Add(NewVehicleFromReader(reader));
                    }

                    reader.Close();

                    return vehicles;
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
                        SELECT 
                            v.Id, v.ImageLocation, v.IsApproved, v.IsClaimed, v.IsInShop, v.MileageAtPMService, v.VehicleNumber, v.VehicleTypeId, v.CurrentMileage,
                            vt.Id, vt.Name,
                            r.Id as ReportId, r.CategoryId, r.DateCompleted, r.DateCreated, r.Issue, r.UserId, r.VehicleId
                         FROM Vehicle v
                        JOIN VehicleType vt on vt.Id = v.VehicleTypeId
                       LEFT JOIN Report r on r.VehicleId = v.Id
                    WHERE v.Id = @Id
                      
             
";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Vehicle video = null;
                        while (reader.Read())
                        {
                            if (video == null)
                            {
                            video = NewVehicleFromReader(reader);

                            }

                            if (DbUtils.IsNotDbNull(reader, "ReportId"))
                                {
                                video.Reports.Add(
                                new Report
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
                                });
                                }

                        }

                        return video;
                    }
                }
            }
        }














    }
}
