package com.contoso.socialapp.repository;

import com.contoso.socialapp.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    
    @Query("SELECT l FROM Like l WHERE l.post.id = :postId")
    List<Like> findByPost_Id(@Param("postId") String postId);
    
    @Query("SELECT l FROM Like l WHERE l.post.id = :postId AND l.username = :username")
    Optional<Like> findByPostIdAndUsername(@Param("postId") String postId, @Param("username") String username);
    
    @Modifying
    @Query("DELETE FROM Like l WHERE l.post.id = :postId AND l.username = :username")
    void deleteByPost_IdAndUsername(@Param("postId") String postId, @Param("username") String username);
    
    @Query("SELECT COUNT(l) FROM Like l WHERE l.post.id = :postId")
    long countByPostId(@Param("postId") String postId);
}