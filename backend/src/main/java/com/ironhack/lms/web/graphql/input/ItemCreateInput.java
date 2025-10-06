package com.ironhack.lms.web.graphql.input;

import java.util.Set;

public record ItemCreateInput(
        Long lessonId,
        String title,
        String description,
        Set<String> tags,
        String bodyMarkdown
) {}
