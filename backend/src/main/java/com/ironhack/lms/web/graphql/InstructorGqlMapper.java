package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.user.Instructor;
import com.ironhack.lms.web.graphql.types.InstructorGql;

public final class InstructorGqlMapper {
    private InstructorGqlMapper() {}

    public static InstructorGql toGql(Instructor instructor) {
        return new InstructorGql(
                instructor.getId(),
                instructor.getEmail(),
                instructor.getFullName(),
                instructor.getBio()
        );
    }
}

