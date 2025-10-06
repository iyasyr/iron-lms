package com.ironhack.lms.web.graphql.types;

import java.time.OffsetDateTime;

public record SubmissionGql(
        Long id,
        Long assignmentId,
        Long courseId,
        Long studentId,
        OffsetDateTime submittedAt,
        String artifactUrl,
        String status,
        Integer score,
        String feedback,
        Integer version
) {}
