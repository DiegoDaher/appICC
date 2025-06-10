using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace OnlyESBservice.Controllers
{
    [ApiController]
    [Route("")]
    public class ProxyController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ProxyController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(new { mensaje = "Respuesta GET" });
            /*
            var response = await _httpClient.GetAsync($"http://localhost:5001");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
            */
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] object data)
        {
            var response = new
            {
                mensaje = "Método POST",
                datos = data
            };

            return Ok(response);
            /*
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();

            var content = new StringContent(body, Encoding.UTF8, Request.ContentType);
            var response = await _httpClient.PostAsync($"http://localhost:5001/", content);

            var result = await response.Content.ReadAsStringAsync();
            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
            */
        }

        [HttpDelete("{path}")]
        public async Task<IActionResult> Delete(string path)
        {
            return Ok(new { mensaje = "Respuesta DELETE", id = path });
            /*
            var response = await _httpClient.DeleteAsync($"http://localhost:5001/{path}");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
            */
        }

        [HttpPut("{path}")]
        public async Task<IActionResult> Put([FromBody] object data, string path)
        {
            return Ok(new { mensaje = "Respuesta PUT", id = path, data = data });
            /*
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();

            var content = new StringContent(body, Encoding.UTF8, Request.ContentType);
            var response = await _httpClient.PutAsync($"http://localhost:5001/{path}", content);

            var result = await response.Content.ReadAsStringAsync();
            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
            */
        }

        [HttpPatch("{path}")]
        public async Task<IActionResult> Patch([FromBody] object data, string path)
        {
            //dynamic is used when I need to interact with the JSON, in this case is more secure if I use object
            return Ok(new { mensaje = "RespuestaPATCH", id = path, data });
            /*
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();

            var content = new StringContent(body, Encoding.UTF8, Request.ContentType);
            var response = await _httpClient.PatchAsync($"http://localhost:5001/{path}", content);

            var result = await response.Content.ReadAsStringAsync();
            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
            */
        }
    }
}
