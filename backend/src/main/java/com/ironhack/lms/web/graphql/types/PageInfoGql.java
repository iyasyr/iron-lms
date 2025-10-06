package com.ironhack.lms.web.graphql.types;

public record PageInfoGql(
        int page,
        int pageSize,
        long totalElements,
        int totalPages,
        boolean hasNext
) {}
