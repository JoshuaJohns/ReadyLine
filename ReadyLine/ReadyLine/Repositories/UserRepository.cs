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


        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT up.Id, up.Name, up.Email, up.DateCreated AS UserProfileDateCreated,
                      up.ImageUrl AS UserProfileImageUrl       
                 FROM UserProfile up    
             ORDER BY DateCreated
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var userProfiles = new List<User>();
                        while (reader.Read())
                        {
                            userProfiles.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                               

                            });
                        }

                        return userProfiles;
                    }
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
                        SELECT up.Id, Up.FirebaseUserId,up.Name, up.Email, up.DateCreated AS UserProfileDateCreated,
                       up.ImageUrl AS UserProfileImageUrl, up.Id
                             
                          FROM UserProfile up
                               
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                           

                        };
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
                           SELECT 
                       up.Name, up.Email, up.DateCreated AS UserProfileDateCreated,
                       up.ImageUrl AS UserProfileImageUrl, up.Id
                      
                  FROM UserProfile up
                      
                    WHERE up.Id = @Id
             ORDER BY  DateCreated
                      
             
";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        User profile = null;
                        if (reader.Read())
                        {
                            profile = new User()
                            {

                                Id = DbUtils.GetInt(reader, "Id"),
                               
                            };
                        }

                        return profile;
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
                       up.Name, up.Email, up.DateCreated AS UserProfileDateCreated,
                       up.ImageUrl AS UserProfileImageUrl,

                       v.Id AS VideoId, v.Title, v.Description, v.Url, 
                       v.DateCreated AS VideoDateCreated, v.UserProfileId As VideoUserProfileId,

                       c.Id AS CommentId, c.Message, c.UserProfileId AS CommentUserProfileId, c.VideoId as CommentVideoId

                   FROM UserProfile up
                   JOIN Video v on v.UserProfileId = up.Id
                   LEFT JOIN Comment c on c.VideoId = v.Id 
                   WHERE up.Id = @ID
                   ORDER BY  v.DateCreated

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
                                //    DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
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
                        INSERT INTO UserProfile (FirebaseUserId,Email, ImageUrl, DateCreated, Name)
                        OUTPUT INSERTED.ID
                        VALUES (@FirebaseUserId, @Email, @ImageUrl, @DateCreated, @Name)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", profile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Email", profile.Email);
                   

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
                        UPDATE UserProfile
                           SET Email = @Email,
                               ImageUrl = @ImageUrl,
                               DateCreated = @DateCreated,
                               Name = @Name
                                FirebaseUserId = @FirebaseUserId
                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Email", profile.Email);
                   
                    DbUtils.AddParameter(cmd, "@Id", profile.Id);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", profile.FirebaseUserId);

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
                    cmd.CommandText = "DELETE FROM UserProfile WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
