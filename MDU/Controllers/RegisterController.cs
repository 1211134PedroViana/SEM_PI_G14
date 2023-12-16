using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Mpt.Domain.Register;
using Mpt.Domain.Registers;
using Mpt.Domain.Shared;
using Mpt.Domain.SystemUsers;

namespace Mpt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly RegisterService _service;

        public RegisterController(RegisterService service)
        {
            _service = service;
        }

        // GET: api/Register
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisterDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Register/U1
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisterDTO>> GetGetById(Guid id)
        {
            var user = await _service.GetByIdAsync(new RegisterId(id));
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }
        
        // POST: api/Registers
        [HttpPost]
        public async Task<ActionResult<RegisterDTO>> Create(CreateRegisterDTO dto)
        {
            try
            {
                var user = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = user.Id }, user);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}
