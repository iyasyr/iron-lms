package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.course.Course;
import com.ironhack.lms.web.graphql.types.*;
import org.springframework.data.domain.Page;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public final class CourseGqlMapper {
    private CourseGqlMapper(){}

    private static OffsetDateTime toOffset(java.time.Instant i) {
        return i == null ? null : i.atOffset(ZoneOffset.UTC);
    }

    public static CourseGql toGql(Course c) {
        return new CourseGql(
                c.getId(),
                c.getInstructor().getId(),
                c.getTitle(),
                c.getDescription(),
                c.getStatus().name(),
                toOffset(c.getCreatedAt()),
                toOffset(c.getPublishedAt())
        );
    }

    public static CoursePageGql toGql(Page<Course> page) {
        var content = page.getContent().stream().map(CourseGqlMapper::toGql).toList();
        var pi = new PageInfoGql(page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages(), page.hasNext());
        return new CoursePageGql(content, pi);
    }
}
