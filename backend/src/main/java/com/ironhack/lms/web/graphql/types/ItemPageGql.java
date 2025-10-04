package com.ironhack.lms.web.graphql.types;

public record ItemPageGql(
        java.util.List<ItemGql> content,
        PageInfoGql pageInfo
) {}
