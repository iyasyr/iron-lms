package com.ironhack.lms.web.graphql.types;

import java.util.List;

public record SubmissionPageGql(
        java.util.List<SubmissionGql> content,
        PageInfoGql pageInfo
) {}
