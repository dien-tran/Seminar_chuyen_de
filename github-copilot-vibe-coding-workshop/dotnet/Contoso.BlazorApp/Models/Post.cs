using System.Text.Json.Serialization;

namespace Contoso.BlazorApp.Models;

public class Post
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;

    [JsonPropertyName("content")]
    public string Content { get; set; } = string.Empty;

    [JsonPropertyName("createdAt")]
    public string CreatedAt { get; set; } = string.Empty;

    [JsonPropertyName("updatedAt")]
    public string UpdatedAt { get; set; } = string.Empty;

    [JsonPropertyName("likes")]
    public int Likes { get; set; }

    [JsonPropertyName("comments")]
    public int Comments { get; set; }
}

public class CreatePostRequest
{
    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;

    [JsonPropertyName("content")]
    public string Content { get; set; } = string.Empty;
}

public class LikeRequest
{
    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;
}