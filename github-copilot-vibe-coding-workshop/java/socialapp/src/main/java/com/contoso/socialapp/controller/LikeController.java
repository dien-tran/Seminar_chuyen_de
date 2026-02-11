package com.contoso.socialapp.controller;

import com.contoso.socialapp.dto.LikeRequest;
import com.contoso.socialapp.service.LikeService;
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

@RestController
@RequestMapping("/api/posts/{postId}/likes")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Likes", description = "Operations related to likes")
public class LikeController {
    
    private final LikeService likeService;
    
    @PostMapping
    @Operation(summary = "Like a post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Post liked"),
            @ApiResponse(responseCode = "400", description = "Bad request"),
            @ApiResponse(responseCode = "404", description = "Resource not found")
    })
    public ResponseEntity<Void> addLike(@PathVariable String postId,
                                       @Valid @RequestBody LikeRequest request) {
        boolean success = likeService.addLike(postId, request);
        return success ? ResponseEntity.status(HttpStatus.CREATED).build() 
                      : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping
    @Operation(summary = "Unlike a post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Like removed"),
            @ApiResponse(responseCode = "400", description = "Bad request"),
            @ApiResponse(responseCode = "404", description = "Resource not found")
    })
    public ResponseEntity<Void> removeLike(@PathVariable String postId,
                                          @Valid @RequestBody LikeRequest request) {
        boolean success = likeService.removeLike(postId, request.getUsername());
        return success ? ResponseEntity.noContent().build() 
                      : ResponseEntity.notFound().build();
    }
}