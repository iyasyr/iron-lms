package com.ironhack.lms.web.graphql.input;

import java.util.Set;

public record ItemUpdateInput(
        String title,
        String description,
        Set<String> tags,
        String bodyMarkdown
) {}
