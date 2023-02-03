using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var video = _vehicleRepository.GetById(id);
            if (video == null)
            {
                return NotFound();
            }
            return Ok(video);
        }

    }   
}
