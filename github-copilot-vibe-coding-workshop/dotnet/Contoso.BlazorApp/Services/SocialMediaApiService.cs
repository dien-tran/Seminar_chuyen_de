using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Contoso.BlazorApp.Models;
using Microsoft.Extensions.Configuration;

namespace Contoso.BlazorApp.Services;

public class SocialMediaApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiBase;

    public SocialMediaApiService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiBase = configuration["ApiSettings:BaseUrl"] ?? "http://localhost:8080/api";
        // Set a reasonable timeout for API calls
        _httpClient.Timeout = TimeSpan.FromSeconds(10);
    }

    public async Task<List<Post>> FetchPostsAsync()
    {
        try
        {
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
            var posts = await _httpClient.GetFromJsonAsync<List<Post>>($"{_apiBase}/posts", cts.Token);
            return posts ?? new List<Post>();
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }

    public async Task<Post?> FetchPostAsync(string postId)
    {
        try
        {
            return await _httpClient.GetFromJsonAsync<Post>($"{_apiBase}/posts/{postId}");
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }

    public async Task<Post?> CreatePostAsync(CreatePostRequest request)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync($"{_apiBase}/posts", request);
            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException("API unavailable");
            
            return await response.Content.ReadFromJsonAsync<Post>();
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }

    public async Task<Post?> UpdatePostAsync(string postId, CreatePostRequest request)
    {
        try
        {
            var response = await _httpClient.PatchAsJsonAsync($"{_apiBase}/posts/{postId}", request);
            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException("API unavailable");
            
            return await response.Content.ReadFromJsonAsync<Post>();
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }

    public async Task DeletePostAsync(string postId)
    {
        try
        {
            var response = await _httpClient.DeleteAsync($"{_apiBase}/posts/{postId}");
            if (!response.IsSuccessStatusCode && response.StatusCode != System.Net.HttpStatusCode.NotFound)
                throw new HttpRequestException("API unavailable");
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }

    public async Task<List<Comment>> FetchCommentsAsync(string postId)
    {
        try
        {
            var comments = await _httpClient.GetFromJsonAsync<List<Comment>>($"{_apiBase}/posts/{postId}/comments");
            return comments ?? new List<Comment>();
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }

    public async Task<Comment?> CreateCommentAsync(string postId, CreateCommentRequest request)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync($"{_apiBase}/posts/{postId}/comments", request);
            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException("API unavailable");
            
            return await response.Content.ReadFromJsonAsync<Comment>();
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }

    public async Task LikePostAsync(string postId, LikeRequest request)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync($"{_apiBase}/posts/{postId}/likes", request);
            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException("API unavailable");
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }

    public async Task UnlikePostAsync(string postId, LikeRequest request)
    {
        try
        {
            var response = await _httpClient.SendAsync(new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri($"{_apiBase}/posts/{postId}/likes"),
                Content = JsonContent.Create(request)
            });
            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException("API unavailable");
        }
        catch
        {
            throw new HttpRequestException("API unavailable");
        }
    }
}