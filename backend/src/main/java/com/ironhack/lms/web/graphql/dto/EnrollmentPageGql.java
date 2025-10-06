package com.ironhack.lms.web.graphql.dto;

import com.ironhack.lms.web.graphql.types.PageInfoGql;
import java.util.List;

public record EnrollmentPageGql(
    List<EnrollmentGql> content,
    PageInfoGql pageInfo
) {}
