using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReadyLine.Models;
using ReadyLine.Repositories;
using System;

namespace ReadyLine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {

            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }


        [HttpPost("reportTag")]
        public IActionResult Post(int tagId, int reportId)
        {
            var reportTag = new ReportTag();
            reportTag.TagId = tagId;
            reportTag.ReportId = reportId;

            _tagRepository.Add(reportTag);

            return Ok(reportTag);


        }


    }
}
