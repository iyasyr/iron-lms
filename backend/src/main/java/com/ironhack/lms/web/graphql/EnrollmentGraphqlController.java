package com.ironhack.lms.web.graphql;

import com.ironhack.lms.service.enrollment.EnrollmentService;
import com.ironhack.lms.web.enrollment.dto.EnrollmentResponse;
import com.ironhack.lms.web.graphql.dto.EnrollmentGql;
import com.ironhack.lms.web.graphql.dto.EnrollmentPageGql;
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
public class EnrollmentGraphqlController {

    private final EnrollmentService enrollmentService;

    @QueryMapping
    @Transactional(readOnly = true)
    public EnrollmentPageGql myEnrollments(@Argument int page, @Argument int pageSize, Authentication auth) {
        var enrollments = enrollmentService.myEnrollmentsEntities(auth, PageRequest.of(page, pageSize));
        return EnrollmentDtoMapper.toGqlFromEntities(enrollments);
    }

    @MutationMapping
    @Transactional
    public EnrollmentGql enrollInCourse(@Argument Long courseId, Authentication auth) {
        var enrollment = enrollmentService.enroll(courseId, auth);
        return EnrollmentDtoMapper.toGql(enrollment);
    }

    @MutationMapping
    @Transactional
    public EnrollmentGql cancelEnrollment(@Argument Long enrollmentId, Authentication auth) {
        var enrollment = enrollmentService.cancel(enrollmentId, auth);
        return EnrollmentDtoMapper.toGql(enrollment);
    }
}
