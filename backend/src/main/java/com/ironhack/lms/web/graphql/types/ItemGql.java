package com.ironhack.lms.web.graphql.types;

import java.time.OffsetDateTime;
import java.util.Set;

public record ItemGql(
        Long id,
        Long lessonId,
        String title,
        String description,
        Set<String> tags,
        String bodyMarkdown,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {}
