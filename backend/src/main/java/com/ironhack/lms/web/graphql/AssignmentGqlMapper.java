package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.course.Assignment;
import com.ironhack.lms.web.graphql.types.AssignmentGql;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public final class AssignmentGqlMapper {
    private AssignmentGqlMapper(){}

    private static OffsetDateTime toOffset(java.time.Instant i) {
        return i == null ? null : i.atOffset(ZoneOffset.UTC);
    }

    public static AssignmentGql toGql(Assignment a) {
        Long courseId = null;
        Long lessonId = null;
        if (a.getLesson() != null) {
            lessonId = a.getLesson().getId();
            if (a.getLesson().getCourse() != null) {
                courseId = a.getLesson().getCourse().getId();
            }
        }
        return new AssignmentGql(
                a.getId(),
                courseId,
                lessonId,
                a.getTitle(),
                a.getInstructions(),
                a.getMaxPoints(),
                a.isAllowLate(),
                toOffset(a.getDueAt())
        );
    }
}
