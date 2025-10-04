package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.course.Assignment;
import com.ironhack.lms.repository.course.AssignmentRepository;
import com.ironhack.lms.web.course.dto.AssignmentCreateRequest;
import com.ironhack.lms.web.graphql.input.AssignmentCreateInput;
import com.ironhack.lms.web.graphql.input.AssignmentUpdateInput;
import com.ironhack.lms.web.graphql.types.AssignmentGql;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Controller
@RequiredArgsConstructor
public class AssignmentGraphqlController {

    private final AssignmentRepository assignments;

    @QueryMapping
    @Transactional(readOnly = true)
    public AssignmentGql assignment(@Argument Long id, Authentication auth) {
        var a = assignments.findById(id).orElse(null);
        return a == null ? null : AssignmentGqlMapper.toGql(a);
    }

    @MutationMapping
    @Transactional
    public AssignmentGql createAssignment(@Argument AssignmentCreateInput input, Authentication auth) {
        var dueInstant = input.dueAt() == null ? null : input.dueAt().toInstant();

        var req = new AssignmentCreateRequest(
                input.lessonId(),
                input.title(),
                input.instructions(),
                dueInstant,
                input.maxPoints() == null ? 0 : input.maxPoints(),
                Boolean.TRUE.equals(input.allowLate())
        );

        var a = new Assignment();
        a.setTitle(req.title());
        a.setInstructions(req.instructions());
        a.setDueAt(req.dueAt());
        a.setMaxPoints(req.maxPoints());
        a.setAllowLate(req.allowLate());

        a = assignments.save(a);
        return AssignmentGqlMapper.toGql(a);
    }

    @MutationMapping
    @Transactional
    public AssignmentGql updateAssignment(@Argument Long id, @Argument AssignmentUpdateInput input, Authentication auth) {
        var a = assignments.findById(id).orElseThrow();

        var dueInstant = input.dueAt() == null ? null : input.dueAt().toInstant();

        if (input.title() != null) a.setTitle(input.title());
        if (input.instructions() != null) a.setInstructions(input.instructions());
        if (input.maxPoints() != null) a.setMaxPoints(input.maxPoints());
        if (input.allowLate() != null) a.setAllowLate(input.allowLate());
        a.setDueAt(dueInstant);

        a = assignments.save(a);
        return AssignmentGqlMapper.toGql(a);
    }

    @MutationMapping
    @Transactional
    public Boolean deleteAssignment(@Argument Long id, Authentication auth) {
        assignments.deleteById(id);
        return true;
    }
}
