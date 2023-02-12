using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReadyLine.Models;
using ReadyLine.Repositories;
using System;
using System.Security.Claims;

namespace ReadyLine.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class VehicleController : ControllerBase
    {


        private readonly IVehicleRepository _vehicleRepository;
        private readonly IUserRepository _userRepository;
        public VehicleController(IVehicleRepository vehicleRepository, IUserRepository userRepository)
        {

            _vehicleRepository = vehicleRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_vehicleRepository.GetAllVehicles());
        }

        [HttpGet("types")]
        public IActionResult GetTypes()
        {
            return Ok(_vehicleRepository.GetAllVehicleTypes());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var vehicle = _vehicleRepository.GetById(id);
            if (vehicle == null)
            {
                return NotFound();
            }
            return Ok(vehicle);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            _vehicleRepository.DeleteVehicle(id);
            return NoContent();


        }
        [HttpDelete("claim/{id}")]
        public IActionResult DeleteClaim(int id)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);

            var vehicle = _vehicleRepository.GetById(id);
            vehicle.IsClaimed = false;
            var claim = _vehicleRepository.GetClaimById(id, user.Id);

            _vehicleRepository.DeleteClaim(claim.Id);

            _vehicleRepository.Update(vehicle);

            return NoContent();


        }

        [HttpPost]
        public IActionResult Post(Vehicle vehicle)
        {
            vehicle.IsApproved = true;
            vehicle.IsClaimed = false;
            vehicle.IsInShop = false;
            if (vehicle.VehicleTypeId == 1)
            {
                vehicle.ImageLocation = "https://www.heil.com/wp-content/uploads/2021/09/liberty-sideloader-garbage-truck.jpg";
            }
            else if (vehicle.VehicleTypeId == 2)
            {
                vehicle.ImageLocation = "https://www.heil.com/wp-content/uploads/2021/11/rearload-trash-trucks-for-sale.jpg";
            }
            else
            {
                vehicle.ImageLocation = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlztq3gFba-rcamYzjAcZXfMcJVnWCU0jE1g&usqp=CAU";
            }


            _vehicleRepository.Add(vehicle);

            return Ok(vehicle);


        }

        [HttpPost("claimVehicle")]
        public IActionResult PostClaimVehicle(ClaimVehicle claim)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);

            if (user == null)
            {
                return NotFound();
            }

            var vehicle = _vehicleRepository.GetById(claim.VehicleId);
            vehicle.IsClaimed = true;
            _vehicleRepository.Update(vehicle);

            claim.BeginDate = DateTime.Now;
            claim.UserId = user.Id;
            claim.EndDate = null;
            _vehicleRepository.AddClaim(claim);
            return Ok(claim);


        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Vehicle vehicle)
        {

            if (id != vehicle.Id)
            {
                return BadRequest();
            }

            _vehicleRepository.Update(vehicle);
            return Ok(vehicle);
        }

        [HttpPut("pickup/{id}")]
        public IActionResult PutIsInShop(int id, Vehicle vehicle)
        {

            if (id != vehicle.Id)
            {
                return BadRequest();
            }
            vehicle.IsInShop = false;
            _vehicleRepository.Update(vehicle);
            return Ok(vehicle);
        }











    }
}
