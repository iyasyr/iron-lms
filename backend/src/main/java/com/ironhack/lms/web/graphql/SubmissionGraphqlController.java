package com.ironhack.lms.web.graphql;

import com.ironhack.lms.service.submission.SubmissionService;
import com.ironhack.lms.web.graphql.types.SubmissionGql;
import com.ironhack.lms.web.graphql.types.SubmissionPageGql;
import com.ironhack.lms.web.submission.dto.GradeRequest;
import com.ironhack.lms.web.submission.dto.ResubmitRequest;
import com.ironhack.lms.web.submission.dto.SubmissionCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Controller
@RequiredArgsConstructor
public class SubmissionGraphqlController {

    private final SubmissionService submissions;

    // ----- Queries -----

    @QueryMapping
    @Transactional(readOnly = true)
    public SubmissionPageGql mySubmissions(@Argument int page, @Argument int pageSize, Authentication auth) {
        var p = submissions.mySubmissions(auth, PageRequest.of(page, pageSize));
        return SubmissionDtoMapper.toGql(p);
    }

    @QueryMapping
    @Transactional(readOnly = true)
    public SubmissionPageGql submissionsByCourse(@Argument Long courseId, @Argument int page, @Argument int pageSize, Authentication auth) {
        var p = submissions.listByCourse(courseId, auth, PageRequest.of(page, pageSize));
        return SubmissionDtoMapper.toGql(p);
    }

    // ----- Mutations -----

    @MutationMapping
    @Transactional
    public SubmissionGql submit(@Argument Long assignmentId, @Argument String artifactUrl, Authentication auth) {
        var dto = submissions.submit(assignmentId, new SubmissionCreateRequest(artifactUrl), auth);
        return SubmissionDtoMapper.toGql(dto);
    }

    @MutationMapping
    @Transactional
    public SubmissionGql gradeSubmission(@Argument Long id, @Argument Integer score, @Argument String feedback, Authentication auth) {
        var dto = submissions.grade(id, new GradeRequest(score, feedback), auth);
        return SubmissionDtoMapper.toGql(dto);
    }

    @MutationMapping
    @Transactional
    public SubmissionGql requestResubmission(@Argument Long id, @Argument String feedback, Authentication auth) {
        var dto = submissions.requestResubmission(id, new ResubmitRequest(feedback), auth);
        return SubmissionDtoMapper.toGql(dto);
    }
}
