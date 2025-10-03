package com.ironhack.lms.web.item.dto;

import java.time.LocalDateTime;
import java.util.Set;

public record ItemResponse(
        Long id,
        Long lessonId,
        String title,
        String description,
        Set<String> tags,
        String bodyMarkdown,
        String bodyHtml,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
