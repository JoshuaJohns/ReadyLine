using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReadyLine.Models;
using ReadyLine.Repositories;
using System;
using System.Security.Claims;

namespace ReadyLine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
       
        private readonly IUserRepository _userRepository;
        public UserController( IUserRepository userRepository)
        {
            
            _userRepository = userRepository;
        }



        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }


        [HttpGet("currentUser")]
        public IActionResult GetCurrentUserInfo()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


            [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var profile = _userRepository.GetById(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }


        [HttpGet("GetWithCommentsAndVideos{id}")]
        public IActionResult GetWithCommentsAndVideos(int id)
        {
            var profile = _userRepository.GetUserProfileByIdWithComentsAndVideos(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }



        [HttpPost]
        public IActionResult Post(User userProfile)
        {
            
            userProfile.CreatedDate = DateTime.Now;
            userProfile.UserTypeId = UserType.EMPLOYEE_ID;
            if (userProfile.ImageUrl == null)
            {
                userProfile.ImageUrl = "https://beardstrashservice.com/wp-content/uploads/2023/01/Logo-637x266.gif";
            }
            _userRepository.Add(userProfile);
            return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, User profile)
        {
            if (id != profile.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(profile);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return NoContent();
        }





    }
}
