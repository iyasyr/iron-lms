package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.course.Lesson;
import com.ironhack.lms.web.graphql.types.LessonGql;

public final class LessonGqlMapper {
    private LessonGqlMapper(){}

    public static LessonGql toGql(Lesson l) {
        return new LessonGql(l.getId(), l.getCourse().getId(), l.getTitle(), l.getOrderIndex());
    }
}
