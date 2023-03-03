using ReadyLine.Models;
using System.Collections.Generic;

namespace ReadyLine.Repositories
{
    public interface IUserRepository
    {
        void Add(User profile);
        void Delete(int id);
        List<User> GetAll();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetById(int id);
        User GetUserProfileByIdWithComentsAndVideos(int id);
        void Update(User profile);
        List<UserType> GetAllUserTypes();
        List<AdminRequestType> GetAllAdminRequestTypes();
    }
}