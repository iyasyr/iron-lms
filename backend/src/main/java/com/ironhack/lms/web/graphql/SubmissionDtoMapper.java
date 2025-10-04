package com.ironhack.lms.web.graphql;

import com.ironhack.lms.web.graphql.types.PageInfoGql;
import com.ironhack.lms.web.graphql.types.SubmissionGql;
import com.ironhack.lms.web.graphql.types.SubmissionPageGql;
import com.ironhack.lms.web.submission.dto.SubmissionResponse;
import org.springframework.data.domain.Page;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public final class SubmissionDtoMapper {
    private SubmissionDtoMapper(){}

    private static OffsetDateTime toOffset(java.time.Instant i) {
        return i == null ? null : i.atOffset(ZoneOffset.UTC);
    }

    public static SubmissionGql toGql(SubmissionResponse dto) {
        return new SubmissionGql(
                dto.id(),
                dto.assignmentId(),
                dto.courseId(),
                dto.studentId(),
                toOffset(dto.submittedAt()),
                dto.artifactUrl(),
                dto.status().name(),
                dto.score(),
                dto.feedback(),
                dto.version()
        );
    }

    public static SubmissionPageGql toGql(Page<SubmissionResponse> page) {
        var content = page.getContent().stream().map(SubmissionDtoMapper::toGql).toList();
        var pi = new PageInfoGql(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.hasNext()
        );
        return new SubmissionPageGql(content, pi);
    }
}
