package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.course.Course;
import com.ironhack.lms.domain.enrollment.Enrollment;
import com.ironhack.lms.web.enrollment.dto.EnrollmentResponse;
import com.ironhack.lms.web.graphql.dto.EnrollmentGql;
import com.ironhack.lms.web.graphql.dto.EnrollmentPageGql;
import com.ironhack.lms.web.graphql.types.CourseGql;
import com.ironhack.lms.web.graphql.types.PageInfoGql;
import org.springframework.data.domain.Page;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

public final class EnrollmentDtoMapper {
    private EnrollmentDtoMapper() {}

    private static OffsetDateTime toOffset(Instant instant) {
        return instant == null ? null : instant.atOffset(ZoneOffset.UTC);
    }

    public static EnrollmentGql toGql(EnrollmentResponse enrollment) {
        return new EnrollmentGql(
                enrollment.id(),
                enrollment.courseId(),
                null, // studentId not available in response
                toOffset(enrollment.enrolledAt()),
                enrollment.status().toString(),
                null // course will be resolved separately
        );
    }

    public static EnrollmentGql toGql(Enrollment enrollment) {
        Course course = enrollment.getCourse();
        CourseGql courseGql = new CourseGql(
                course.getId(),
                course.getInstructor().getId(),
                course.getTitle(),
                course.getDescription(),
                course.getStatus().toString(),
                toOffset(course.getCreatedAt()),
                toOffset(course.getPublishedAt())
        );

        return new EnrollmentGql(
                enrollment.getId(),
                enrollment.getCourse().getId(),
                enrollment.getStudent().getId(),
                toOffset(enrollment.getEnrolledAt()),
                enrollment.getStatus().toString(),
                courseGql
        );
    }

    public static EnrollmentPageGql toGql(Page<EnrollmentResponse> page) {
        List<EnrollmentGql> content = page.getContent().stream()
                .map(EnrollmentDtoMapper::toGql)
                .toList();

        PageInfoGql pi = new PageInfoGql(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.hasNext()
        );

        return new EnrollmentPageGql(content, pi);
    }

    public static EnrollmentPageGql toGqlFromEntities(Page<Enrollment> page) {
        List<EnrollmentGql> content = page.getContent().stream()
                .map(EnrollmentDtoMapper::toGql)
                .toList();

        PageInfoGql pi = new PageInfoGql(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.hasNext()
        );

        return new EnrollmentPageGql(content, pi);
    }
}

