package com.ironhack.lms.web.graphql.input;

public record LessonCreateInput(
        Long courseId,
        String title,
        Integer orderIndex
) {}
