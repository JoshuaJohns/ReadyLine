using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ReadyLine.Models;
using ReadyLine.Utils;
using System.Collections.Generic;

namespace ReadyLine.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }



        private User NewUserFromReader(SqlDataReader reader)
        {
            return new User()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                Email = reader.GetString(reader.GetOrdinal("Email")),
                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                JobTitle = reader.GetString(reader.GetOrdinal("JobTitle")),
                HireDate = DbUtils.GetNullableDateTime(reader, "HireDate"),
                UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                UserType = new UserType()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UTId")),
                    Name = reader.GetString(reader.GetOrdinal("Name"))
                },
                Vehicles = new List<Vehicle>()

            };
        }



        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT u.Id, u.FirebaseUserId, u.Email, u.CreatedDate, JobTitle,
                      u.ImageUrl, u.HireDate, u.UserTypeId, u.FirstName, u.LastName,      

                       ut.Id as UTId, ut.Name
                 FROM [User] u  
                 JOIN UserType ut on ut.Id = u.UserTypeId  
             ORDER BY ut.Name
            ";

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            }
        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.Id, u.FirebaseUserId, u.Email, u.CreatedDate, JobTitle,
                      u.ImageUrl, u.HireDate, u.UserTypeId, u.FirstName, u.LastName,      

                       ut.Id as UTId, ut.Name,
                       cv.BeginDate, cv.EndDate, 
                       v.Id as VId, v.ImageLocation, v.IsApproved, v.IsClaimed, v.IsInShop, v.MileageAtPMService, v.VehicleNumber, v.VehicleTypeId, v.CurrentMileage,
                         vt.Id as VTId, vt.Name as VTName
                 FROM [User] u  
                 JOIN UserType ut on ut.Id = u.UserTypeId
                 LEFT JOIN ClaimVehicle cv on cv.UserId = u.Id
                 LEFT JOIN Vehicle v on v.Id = cv.VehicleId
                  LEFT  JOIN VehicleType vt on vt.Id = v.VehicleTypeId
                               
                         WHERE FirebaseUserId = @FirebaseuserId
                    ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                    if (userProfile == null)
                    {
                        userProfile = NewUserFromReader(reader);
                    }
                        if (DbUtils.IsNotDbNull(reader, "VId"))
                        {
                            userProfile.Vehicles.Add(new Vehicle()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("VId")),
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
                                    Id = reader.GetInt32(reader.GetOrdinal("VTId")),
                                    Name = reader.GetString(reader.GetOrdinal("VTName")),

                                }
                            });
                        }

                    }

                    reader.Close();
                    return userProfile;
                }
            }
        }
        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                           SELECT u.Id, u.FirebaseUserId, u.Email, u.CreatedDate, JobTitle,
                      u.ImageUrl, u.HireDate, u.UserTypeId, u.FirstName, u.LastName,      

                       ut.Id as UTId, ut.Name
                 FROM [User] u  
                 JOIN UserType ut on ut.Id = u.UserTypeId 
                      
                    WHERE u.Id = @Id
            
                      
             
";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        User user = null;
                        if (reader.Read())
                        {
                            user = NewUserFromReader(reader);
                        }

                        return user;
                    }
                }
            }
        }

        public User GetUserProfileByIdWithComentsAndVideos(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT 
                                   up.Name, up.Email, up.CreatedDate AS UserCreatedDate,
                                   up.ImageUrl AS UserProfileImageUrl,

                                   v.Id AS VideoId, v.Title, v.Description, v.Url, 
                                   v.CreatedDate AS VideoCreatedDate, v.UserProfileId As VideoUserProfileId,

                                   c.Id AS CommentId, c.Message, c.UserProfileId AS CommentUserProfileId, c.VideoId as CommentVideoId

                               FROM UserProfile up
                               JOIN Video v on v.UserProfileId = up.Id
                               LEFT JOIN Comment c on c.VideoId = v.Id 
                               WHERE up.Id = @ID
                               ORDER BY  v.CreatedDate

            ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        User profile = null;
                        while (reader.Read())
                        {
                            if (profile == null)
                            {

                                profile = new User()
                                {
                                    Id = id,

                                    Email = DbUtils.GetString(reader, "Email"),

                                };

                            }

                            if (DbUtils.IsNotDbNull(reader, "VideoId"))
                            {
                                //profile.Videos.Add(new Video()
                                //{
                                //    Id = DbUtils.GetInt(reader, "VideoId"),
                                //    Title = DbUtils.GetString(reader, "Title"),
                                //    Description = DbUtils.GetString(reader, "Description"),
                                //    CreatedDate = DbUtils.GetDateTime(reader, "VideoCreatedDate"),
                                //    Url = DbUtils.GetString(reader, "Url"),
                                //    UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId"),

                                //});
                            }

                            if (DbUtils.IsNotDbNull(reader, "CommentId"))
                            {
                                //profile.Comments.Add(new Comment()
                                //{
                                //    Id = DbUtils.GetInt(reader, "CommentId"),
                                //    Message = DbUtils.GetString(reader, "Message"),
                                //    VideoId = DbUtils.GetInt(reader, "CommentVideoId"),
                                //    UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId")
                                //});
                            }

                        }
                        return profile;
                    }
                }
            }
        }


        public void Add(User profile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [User] (FirebaseUserId,Email, ImageUrl, CreatedDate, FirstName, LastName, HireDate, UserTypeId, JobTitle)
                        OUTPUT INSERTED.ID
                        VALUES (@FirebaseUserId, @Email, @ImageUrl, @CreatedDate, @FirstName, @LastName, @HireDate, @UserTypeId, @JobTitle)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", profile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Email", profile.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", profile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@CreatedDate", profile.CreatedDate);
                    DbUtils.AddParameter(cmd, "@FirstName", profile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", profile.LastName);
                    DbUtils.AddParameter(cmd, "@HireDate", profile.HireDate);
                    DbUtils.AddParameter(cmd, "@UserTypeId", profile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@JobTitle", profile.JobTitle);


                    profile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User profile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                           SET Email = @Email,
                               ImageUrl = @ImageUrl,
                               CreatedDate = @CreatedDate,
                               FirstName = @FirstName,
                               LastName = @LastName,
                               HireDate = @HireDate,
                               UserTypeId = @UserTypeId,
                               JobTitle = @JobTitle
                                FirebaseUserId = @FirebaseUserId

                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", profile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Email", profile.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", profile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@CreatedDate", profile.CreatedDate);
                    DbUtils.AddParameter(cmd, "@FirstName", profile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", profile.LastName);
                    DbUtils.AddParameter(cmd, "@HireDate", profile.HireDate);
                    DbUtils.AddParameter(cmd, "@UserTypeId", profile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@JobTitle", profile.JobTitle);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [User] WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
