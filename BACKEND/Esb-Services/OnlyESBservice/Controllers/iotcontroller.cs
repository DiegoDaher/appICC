using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace OnlyESBservice.Controllers
{
    [ApiController]
    [Route("ldr")]
    public class IoTLdrController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public IoTLdrController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("{id_ldr}")]
        public async Task<IActionResult> Get(string id_ldr)
        {
            var response = await _httpClient.GetAsync($"http://iot_service:3005/data/{id_ldr}");
            var result = await response.Content.ReadAsStringAsync();
            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var json = await reader.ReadToEndAsync();

                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync("http://iot_service:3005/data", content);
                var result = await response.Content.ReadAsStringAsync();

                return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
            }
        }

        [HttpDelete("{path}")]
        public async Task<IActionResult> Delete(string path)
        {
            var response = await _httpClient.DeleteAsync($"http://iot_service:3005/data/{path}");
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }
    }

    [ApiController]
    [Route("tempwet")]
    public class IoTTempWetController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public IoTTempWetController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("{deviceId}")]
        public async Task<IActionResult> Get(string deviceId)
        {
            var response = await _httpClient.GetAsync($"http://iot_service:3005/tempwet/{deviceId}");
            var result = await response.Content.ReadAsStringAsync();
            return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var json = await reader.ReadToEndAsync();

                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync("http://iot_service:3005/tempwet", content);
                var result = await response.Content.ReadAsStringAsync();

                return Content(result, response.Content.Headers.ContentType?.ToString() ?? "application/json");
            }
        }
    }
}
