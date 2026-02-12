package com.contoso.socialapp.controller;

import com.contoso.socialapp.dto.*;
import com.contoso.socialapp.service.CommentService;
import com.contoso.socialapp.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Comments", description = "Operations related to comments")
public class CommentController {
    
    private final CommentService commentService;
    private final PostService postService;
    
    @GetMapping
    @Operation(summary = "List comments for a post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of comments"),
            @ApiResponse(responseCode = "404", description = "Resource not found")
    })
    public ResponseEntity<List<CommentResponse>> getCommentsByPostId(@PathVariable String postId) {
        // Check if post exists first
        if (!postService.postExists(postId)) {
            return ResponseEntity.notFound().build();
        }
        
        List<CommentResponse> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }
    
    @PostMapping
    @Operation(summary = "Create a comment on a post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Comment created"),
            @ApiResponse(responseCode = "400", description = "Bad request"),
            @ApiResponse(responseCode = "404", description = "Resource not found")
    })
    public ResponseEntity<CommentResponse> createComment(@PathVariable String postId,
                                                        @Valid @RequestBody CommentCreateRequest request) {
        return commentService.createComment(postId, request)
                .map(comment -> ResponseEntity.status(HttpStatus.CREATED).body(comment))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{commentId}")
    @Operation(summary = "Get a specific comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment details"),
            @ApiResponse(responseCode = "404", description = "Resource not found")
    })
    public ResponseEntity<CommentResponse> getCommentById(@PathVariable String postId,
                                                         @PathVariable String commentId) {
        return commentService.getCommentById(postId, commentId)
                .map(comment -> ResponseEntity.ok(comment))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{commentId}")
    @Operation(summary = "Update a comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment updated"),
            @ApiResponse(responseCode = "400", description = "Bad request"),
            @ApiResponse(responseCode = "404", description = "Resource not found")
    })
    public ResponseEntity<CommentResponse> updateComment(@PathVariable String postId,
                                                        @PathVariable String commentId,
                                                        @Valid @RequestBody CommentUpdateRequest request) {
        return commentService.updateComment(postId, commentId, request)
                .map(comment -> ResponseEntity.ok(comment))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{commentId}")
    @Operation(summary = "Delete a comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Comment deleted"),
            @ApiResponse(responseCode = "404", description = "Resource not found")
    })
    public ResponseEntity<Void> deleteComment(@PathVariable String postId,
                                              @PathVariable String commentId) {
        boolean deleted = commentService.deleteComment(postId, commentId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}