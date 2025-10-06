package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.submission.Submission;
import com.ironhack.lms.web.graphql.types.*;
import org.springframework.data.domain.Page;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public final class SubmissionGqlMapper {
    private SubmissionGqlMapper(){}

    private static OffsetDateTime toOffset(java.time.Instant i) {
        return i == null ? null : i.atOffset(ZoneOffset.UTC);
    }

    public static SubmissionGql toGql(Submission s) {
        return new SubmissionGql(
                s.getId(),
                s.getAssignment().getId(),
                s.getAssignment().getLesson().getCourse().getId(), // <-- changed
                s.getStudent().getId(),
                toOffset(s.getSubmittedAt()),
                s.getArtifactUrl(),
                s.getStatus().name(),
                s.getScore(),
                s.getFeedback(),
                s.getVersion()
        );
    }

    public static SubmissionPageGql toGql(Page<Submission> page) {
        var content = page.getContent().stream().map(SubmissionGqlMapper::toGql).toList();
        var pi = new PageInfoGql(page.getNumber(), page.getSize(), page.getTotalElements(), page.getTotalPages(), page.hasNext());
        return new SubmissionPageGql(content, pi);
    }
}
