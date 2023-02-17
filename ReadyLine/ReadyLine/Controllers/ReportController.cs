using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using ReadyLine.Models;
using ReadyLine.Repositories;
using System;
using System.Security.Claims;

namespace ReadyLine.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        private readonly IUserRepository _userRepository;
        private readonly IVehicleRepository _vehicleRepository;
        public ReportController(IReportRepository reportRepository, IUserRepository userRepository, IVehicleRepository vehicleRepository)
        {

            _reportRepository = reportRepository;
            _userRepository = userRepository;
            _vehicleRepository = vehicleRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reportRepository.GetAllReports());
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            return Ok(_reportRepository.GetAllCategories());
        }


        [HttpPost]
        public IActionResult Post(Report report)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);

            var vehicle = _vehicleRepository.GetById(report.VehicleId);
            vehicle.IsApproved = false;
            vehicle.IsInShop = true;
            _vehicleRepository.Update(vehicle);

            report.UserId = user.Id;
            report.CategoryId = 4;
            report.DateCompleted = null;
            report.DateCreated = DateTime.Now;

            _reportRepository.Add(report);

            return Ok(report);


        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var report = _reportRepository.GetById(id);
            if (report == null)
            {
                return NotFound();
            }
            return Ok(report);
        }

        [HttpGet("notes/{id}")]
        public IActionResult GetNotesOnReport(int id)
        {
            var report = _reportRepository.GetNotes(id);
            if (report == null)
            {
                return NotFound();
            }
            return Ok(report);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Report report)
        {
           


            if (report.CategoryId == 5)
            {
             var vehicle =   _vehicleRepository.GetById(report.VehicleId);
                report.Tags.ForEach((tag) =>
                {
                    if (tag.Id == 1)
                    {
                        vehicle.MileageAtPMService = report.Vehicle.CurrentMileage;
                    }
                });
                vehicle.IsApproved = true;
                _vehicleRepository.Update(vehicle);
                report.DateCompleted= DateTime.Now;
            }
            
            _reportRepository.Update(report);
            return Ok(report);
        }

        [HttpPost("reportNote")]
        public IActionResult Post( ReportNote note)
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);

                note.CreateDateTime = DateTime.Now;
                note.UserId = user.Id;
                _reportRepository.AddReportNote(note);
            
            return Ok(note);
        }







    }
}
