package com.ironhack.lms.web.item.dto;

import java.util.Set;

public record ItemUpdateRequest(
        String title,
        String description,
        Set<String> tags,
        String bodyMarkdown
) {}