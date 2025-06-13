using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Text.Json;

using OnlyESBservice.Models;

namespace OnlyESBservice.Controllers
{
    [ApiController]
    [Route("analisis")]
    public class AnalisisController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public AnalisisController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _httpClient.GetAsync($"http://api_analysis:3003/v1/analisis");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Analisis data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://api_analysis:3003/v1/analisis", content);
            var result = await response.Content.ReadAsStringAsync();

            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }

        [HttpDelete("{path}")]
        public async Task<IActionResult> Delete(string path)
        {
            var response = await _httpClient.DeleteAsync($"http://api_analysis:3003/v1/analisis/{path}");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }

        [HttpPut("{path}")]
        public async Task<IActionResult> Put([FromBody] Analisis data, string path)
        {
            var json = JsonSerializer.Serialize(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"http://api_analysis:3003/v1/analisis/{path}", content);

            var result = await response.Content.ReadAsStringAsync();
            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");

        }

        /*
        [HttpPatch("{path}")]
        public async Task<IActionResult> Patch([FromBody] object data, string path)
        {
            using var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();

            var content = new StringContent(body, Encoding.UTF8, Request.ContentType);
            var response = await _httpClient.PatchAsync($"http://localhost:5001/{path}", content);

            var result = await response.Content.ReadAsStringAsync();
            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }
        */
    }

    [ApiController]
    [Route("analisis/search")]
    public class ProxyDetailsController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ProxyDetailsController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("{path}")]
        public async Task<IActionResult> Get(string path)
        {
            var response = await _httpClient.GetAsync($"http://api_analysis:3003/v1/analisis/search/{path}");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }
    }

    [ApiController]
    [Route("analisis/search/name")]
    public class ProxySearchController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ProxySearchController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("{path}")]
        public async Task<IActionResult> Get(string path)
        {
            var response = await _httpClient.GetAsync($"http://api_analysis:3003/v1/analisis/search/name/{path}");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }
    }
}
