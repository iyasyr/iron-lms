package com.ironhack.lms.web.graphql.dto;

import com.ironhack.lms.web.graphql.types.CourseGql;
import java.time.OffsetDateTime;

public record EnrollmentGql(
    Long id,
    Long courseId,
    Long studentId,
    OffsetDateTime enrolledAt,
    String status,
    CourseGql course
) {}
