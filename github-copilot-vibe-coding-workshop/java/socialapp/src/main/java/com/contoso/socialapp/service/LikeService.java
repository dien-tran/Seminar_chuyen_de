package com.contoso.socialapp.service;

import com.contoso.socialapp.dto.LikeCreateRequest;
import com.contoso.socialapp.dto.LikeRequest;
import com.contoso.socialapp.dto.LikeResponse;
import com.contoso.socialapp.entity.Like;
import com.contoso.socialapp.entity.LikeId;
import com.contoso.socialapp.entity.Post;
import com.contoso.socialapp.repository.LikeRepository;
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
public class LikeService {
    
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    
    public List<LikeResponse> getLikesByPostId(String postId) {
        return likeRepository.findByPost_Id(postId).stream()
                .map(this::toLikeResponse)
                .collect(Collectors.toList());
    }
    
    public boolean addLike(String postId, LikeRequest request) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            return false;
        }
        
        // Check if like already exists
        if (likeRepository.findByPostIdAndUsername(postId, request.getUsername()).isPresent()) {
            return false; // Already liked
        }
        
        Like like = new Like();
        like.setPost(post.get());
        like.setUsername(request.getUsername());
        
        likeRepository.save(like);
        return true;
    }
    
    public boolean removeLike(String postId, String username) {
        Optional<Like> like = likeRepository.findByPostIdAndUsername(postId, username);
        if (like.isPresent()) {
            likeRepository.delete(like.get());
            return true;
        }
        return false;
    }
    
    private LikeResponse toLikeResponse(Like like) {
        return new LikeResponse(
                like.getPostId(),
                like.getUsername(),
                like.getCreatedAt()
        );
    }
}