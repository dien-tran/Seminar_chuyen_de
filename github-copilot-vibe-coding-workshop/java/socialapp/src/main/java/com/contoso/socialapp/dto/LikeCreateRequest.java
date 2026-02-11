package com.contoso.socialapp.dto;

import jakarta.validation.constraints.NotBlank;

public record LikeCreateRequest(
    @NotBlank(message = "Username is required")
    String username
) {}