using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReadyLine.Models;
using ReadyLine.Repositories;
using System;

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
