package com.ironhack.lms.web.item.dto;

import java.util.Set;

public record ItemCreateRequest(
        Long lessonId,
        String title,
        String description,
        Set<String> tags,
        String bodyMarkdown
) {}