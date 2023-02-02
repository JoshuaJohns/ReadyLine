using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReadyLine.Models;
using ReadyLine.Repositories;
using System;
namespace ReadyLine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        public ReportController(IReportRepository userRepository)
        {

            _reportRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reportRepository.GetAllReports());
        }



    }
}
