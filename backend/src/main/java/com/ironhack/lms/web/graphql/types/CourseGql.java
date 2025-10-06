package com.ironhack.lms.web.graphql.types;

import java.time.OffsetDateTime;

public record CourseGql(
        Long id,
        Long instructorId,
        String title,
        String description,
        String status,
        OffsetDateTime createdAt,
        OffsetDateTime publishedAt
) {}
