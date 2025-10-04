package com.ironhack.lms.web.graphql.input;

import java.time.OffsetDateTime;

public record AssignmentUpdateInput(
        String title,
        String instructions,
        OffsetDateTime dueAt,   // nullable
        Integer maxPoints,      // nullable
        Boolean allowLate       // nullable
) {}
