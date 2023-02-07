using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReadyLine.Models;
using ReadyLine.Repositories;

namespace ReadyLine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {


        private readonly IVehicleRepository _vehicleRepository;
        public VehicleController(IVehicleRepository vehicleRepository)
        {

            _vehicleRepository = vehicleRepository;
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















    }
}
