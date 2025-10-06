package com.ironhack.lms.web.graphql.types;

import java.time.OffsetDateTime;

public record AssignmentGql(
        Long id,
        Long courseId,   // nullable if you dropped course_id
        Long lessonId,   // nullable if you still use course_id
        String title,
        String instructions,
        Integer maxPoints,
        Boolean allowLate,
        OffsetDateTime dueAt
) {}
