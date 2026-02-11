package com.contoso.socialapp.service;

import com.contoso.socialapp.dto.PostCreateRequest;
import com.contoso.socialapp.dto.PostResponse;
import com.contoso.socialapp.dto.PostUpdateRequest;
import com.contoso.socialapp.entity.Post;
import com.contoso.socialapp.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {
    
    private final PostRepository postRepository;
    
    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toPostResponse)
                .collect(Collectors.toList());
    }
    
    public PostResponse createPost(PostCreateRequest request) {
        Post post = new Post();
        post.setUsername(request.getUsername());
        post.setContent(request.getContent());
        
        Post savedPost = postRepository.save(post);
        return toPostResponse(savedPost);
    }
    
    public Optional<PostResponse> getPostById(String id) {
        return postRepository.findById(id)
                .map(this::toPostResponse);
    }
    
    public Optional<PostResponse> updatePost(String id, PostUpdateRequest request) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setUsername(request.getUsername());
                    post.setContent(request.getContent());
                    return postRepository.save(post);
                })
                .map(this::toPostResponse);
    }
    
    public boolean deletePost(String id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public boolean postExists(String id) {
        return postRepository.existsById(id);
    }
    
    private PostResponse toPostResponse(Post post) {
        return new PostResponse(
                post.getId(),
                post.getUsername(),
                post.getContent(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                0, // likes count - TODO: implement actual count
                0  // comments count - TODO: implement actual count
        );
    }
}