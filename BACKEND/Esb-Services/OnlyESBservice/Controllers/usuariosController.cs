using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Text.Json;

using OnlyESBservice.Models;
using OnlyESBservice.Services;

namespace OnlyESBservice.Controllers
{
    [ApiController]
    [Route("usuarios")]
    public class UsuariosController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly RedisService _redisService;

        public UsuariosController(IHttpClientFactory httpClientFactory, RedisService redisService)
        {
            _httpClient = httpClientFactory.CreateClient();
            _redisService = redisService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _httpClient.GetAsync($"http://api_users:3001/v1/usuarios");
            var content = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, content);
            }

            using var jsonDoc = JsonDocument.Parse(content);
            var jsonElement = jsonDoc.RootElement.Clone();

            return new JsonResult(jsonElement);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            Console.WriteLine(json);
            var response = await _httpClient.PostAsync("http://api_users:3001/v1/usuarios/register", content);
            var result = await response.Content.ReadAsStringAsync();
            var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/json";

            return new ContentResult
            {
                StatusCode = (int)response.StatusCode,
                Content = result,
                ContentType = contentType
            };
        }


        [HttpDelete("{userId}")]
        public async Task<IActionResult> Delete(string userId)
        {
            var response = await _httpClient.DeleteAsync($"http://api_users:3001/v1/usuarios/{userId}");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> Put([FromBody] JsonElement data, string userId)
        {
            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"http://api_users:3001/v1/usuarios/{userId}", content);

            var result = await response.Content.ReadAsStringAsync();
            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");

        }

    }
    [ApiController]
    [Route("usuarios/login")]
    public class usuariosFucnionesController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly RedisService _redisService;

        public usuariosFucnionesController(IHttpClientFactory httpClientFactory, RedisService redisService)
        {
            _httpClient = httpClientFactory.CreateClient();
            _redisService = redisService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault();

            var requestMessage = new HttpRequestMessage(HttpMethod.Get, "http://api_users:3001/v1/usuarios/profile");

            if (!string.IsNullOrEmpty(token))
            {
                requestMessage.Headers.Add("Authorization", token);
            }

            var response = await _httpClient.SendAsync(requestMessage);
            var content = await response.Content.ReadAsStringAsync();

            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JsonElement data)
        {
            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://api_users:3001/v1/usuarios/login", content);
            var result = await response.Content.ReadAsStringAsync();

            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrEmpty(authHeader))
            {
                return BadRequest(new { message = "No se recibió token en la petición" });
            }

            // Limpia el token, remueve el prefijo "Bearer "
            string token = authHeader.StartsWith("Bearer ") ? authHeader.Substring("Bearer ".Length) : authHeader;

            string extractedUserId;
            try
            {
                extractedUserId = JwtHelper.GetUserIdFromToken(token);
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Token inválido o mal formado" });
            }

            if (string.IsNullOrEmpty(extractedUserId))
            {
                return BadRequest(new { message = "No se pudo extraer userId del token" });
            }

            bool eliminado = await _redisService.DeleteTokenAsync(extractedUserId);

            if (eliminado)
            {
                return Ok(new { message = "Logout exitoso" });
            }

            return NotFound(new { message = "Token no encontrado o ya eliminado" });

        }
    }
    [ApiController]
    [Route("usuarios/forget")]
    public class usuariosForgetController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public usuariosForgetController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] JsonElement data)
        {
            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://api_users:3001/v1/usuarios/forgetPassword", content);
            var result = await response.Content.ReadAsStringAsync();

            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }
    }
}