package com.ironhack.lms.web.item.dto;

import java.time.LocalDateTime;
import java.util.Set;

public record ItemListResponse(
        Long id,
        Long lessonId,
        String title,
        Set<String> tags,
        LocalDateTime updatedAt
) {}
