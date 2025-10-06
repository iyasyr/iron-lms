package com.ironhack.lms.web.graphql.input;

import java.time.OffsetDateTime;

public record AssignmentCreateInput(
        Long lessonId,
        String title,
        String instructions,
        OffsetDateTime dueAt,      // GraphQL DateTime -> Java OffsetDateTime
        Integer maxPoints,
        Boolean allowLate
) {}
