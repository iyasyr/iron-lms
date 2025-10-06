package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.course.Course;
import com.ironhack.lms.domain.course.Lesson;
import com.ironhack.lms.domain.user.Instructor;
import com.ironhack.lms.service.course.CourseService;
import com.ironhack.lms.repository.course.CourseRepository;
import com.ironhack.lms.repository.course.LessonRepository;
import com.ironhack.lms.web.course.dto.AssignmentSummaryResponse;
import com.ironhack.lms.web.course.dto.LessonSummaryResponse;
import com.ironhack.lms.web.graphql.types.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.graphql.data.method.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class CourseGraphqlController {

    private final CourseRepository courses;
    private final LessonRepository lessons;
    private final CourseService courseService;

    @QueryMapping @Transactional(readOnly = true)
    public CoursePageGql courses(@Argument int page, @Argument int pageSize) {
        var p = PageRequest.of(page, pageSize);
        var pageEntities = courses.findByStatus(com.ironhack.lms.domain.course.CourseStatus.PUBLISHED, p);
        return CourseGqlMapper.toGql(pageEntities);
    }

    @QueryMapping @Transactional(readOnly = true)
    public CourseGql course(@Argument Long id, Authentication auth) {
        // reuse service visibility rules
        var dto = courseService.getForRead(id, auth);
        // Map DTO→entity-lite: fetch entity for uniform mapping (or map by hand)
        Course c = courses.findById(id).orElseThrow();
        return CourseGqlMapper.toGql(c);
    }

    // Nested resolvers
    @SchemaMapping(typeName = "Course", field = "lessons")
    @Transactional(readOnly = true)
    public List<LessonGql> lessons(CourseGql course, Authentication auth) {
        var list = courseService.listLessonsForRead(course.id(), auth);
        return list.stream()
                .map(l -> new LessonGql(l.id(), course.id(), l.title(), l.orderIndex()))
                .toList();
    }

    @SchemaMapping(typeName = "Course", field = "assignments")
    @Transactional(readOnly = true)
    public List<AssignmentGql> assignments(CourseGql course, Authentication auth) {
        var list = courseService.listAssignmentsForRead(course.id(), auth);
        return list.stream()
                .map(a -> new AssignmentGql(
                        a.id(),
                        course.id(),
                        null,
                        a.title(),
                        a.instructions(),
                        a.maxPoints(),
                        a.allowLate(),
                        a.dueAt() == null ? null : a.dueAt().atOffset(java.time.ZoneOffset.UTC)
                ))
                .toList();
    }

    @SchemaMapping(typeName = "Course", field = "instructor")
    @Transactional(readOnly = true)
    public InstructorGql instructor(CourseGql course) {
        Course courseEntity = courses.findById(course.id())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return InstructorGqlMapper.toGql(courseEntity.getInstructor());
    }
}
