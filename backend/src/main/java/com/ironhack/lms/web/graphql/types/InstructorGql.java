package com.ironhack.lms.web.graphql.types;

public record InstructorGql(
        Long id,
        String email,
        String fullName,
        String bio
) {}

