package com.ironhack.lms.web.graphql.types;

public record LessonGql(
        Long id,
        Long courseId,
        String title,
        Integer orderIndex
) {}
