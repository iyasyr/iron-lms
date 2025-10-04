package com.ironhack.lms.web.graphql.types;

import java.util.List;

public record CoursePageGql(
        java.util.List<CourseGql> content,
        PageInfoGql pageInfo
) {}
