package com.contoso.socialapp.service;

import com.contoso.socialapp.dto.CommentCreateRequest;
import com.contoso.socialapp.dto.CommentResponse;
import com.contoso.socialapp.dto.CommentUpdateRequest;
import com.contoso.socialapp.entity.Comment;
import com.contoso.socialapp.entity.Post;
import com.contoso.socialapp.repository.CommentRepository;
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
public class CommentService {
    
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    
    public List<CommentResponse> getCommentsByPostId(String postId) {
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId).stream()
                .map(this::toCommentResponse)
                .collect(Collectors.toList());
    }
    
    public Optional<CommentResponse> createComment(String postId, CommentCreateRequest request) {
        return postRepository.findById(postId)
                .map(post -> {
                    Comment comment = new Comment();
                    comment.setPost(post);
                    comment.setUsername(request.getUsername());
                    comment.setContent(request.getContent());
                    
                    Comment savedComment = commentRepository.save(comment);
                    return toCommentResponse(savedComment);
                });
    }
    
    public Optional<CommentResponse> getCommentById(String postId, String commentId) {
        return commentRepository.findByIdAndPostId(commentId, postId)
                .map(this::toCommentResponse);
    }
    
    public Optional<CommentResponse> updateComment(String postId, String commentId, CommentUpdateRequest request) {
        return commentRepository.findByIdAndPostId(commentId, postId)
                .map(comment -> {
                    comment.setUsername(request.getUsername());
                    comment.setContent(request.getContent());
                    return commentRepository.save(comment);
                })
                .map(this::toCommentResponse);
    }
    
    public boolean deleteComment(String postId, String commentId) {
        Optional<Comment> comment = commentRepository.findByIdAndPostId(commentId, postId);
        if (comment.isPresent()) {
            commentRepository.delete(comment.get());
            return true;
        }
        return false;
    }
    
    private CommentResponse toCommentResponse(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getPostId(),
                comment.getUsername(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getUpdatedAt()
        );
    }
}