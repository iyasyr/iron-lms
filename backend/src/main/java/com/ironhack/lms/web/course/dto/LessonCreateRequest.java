package com.ironhack.lms.web.course.dto;

import jakarta.validation.constraints.*;

public record LessonCreateRequest(
        @NotBlank @Size(max = 200) String title,
        @Min(1) @Max(10000) int orderIndex
) {}
