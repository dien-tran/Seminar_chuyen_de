using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Contoso.BlazorApp.Models;

namespace Contoso.BlazorApp.Services;

public class SocialMediaApiService
{
    private readonly HttpClient _httpClient;
    private const string ApiBase = "http://localhost:8080/api";

    public SocialMediaApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        // Set a reasonable timeout for API calls
        _httpClient.Timeout = TimeSpan.FromSeconds(10);
    }

    public async Task<List<Post>> FetchPostsAsync()
    {
        try
        {
            using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
            var posts = await _httpClient.GetFromJsonAsync<List<Post>>($"{ApiBase}/posts", cts.Token);
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
            return await _httpClient.GetFromJsonAsync<Post>($"{ApiBase}/posts/{postId}");
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
            var response = await _httpClient.PostAsJsonAsync($"{ApiBase}/posts", request);
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
            var response = await _httpClient.PatchAsJsonAsync($"{ApiBase}/posts/{postId}", request);
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
            var response = await _httpClient.DeleteAsync($"{ApiBase}/posts/{postId}");
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
            var comments = await _httpClient.GetFromJsonAsync<List<Comment>>($"{ApiBase}/posts/{postId}/comments");
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
            var response = await _httpClient.PostAsJsonAsync($"{ApiBase}/posts/{postId}/comments", request);
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
            var response = await _httpClient.PostAsJsonAsync($"{ApiBase}/posts/{postId}/likes", request);
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
                RequestUri = new Uri($"{ApiBase}/posts/{postId}/likes"),
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