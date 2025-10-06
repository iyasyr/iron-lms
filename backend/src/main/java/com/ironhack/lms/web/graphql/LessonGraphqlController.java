package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.course.Course;
import com.ironhack.lms.domain.course.Lesson;
import com.ironhack.lms.repository.course.CourseRepository;
import com.ironhack.lms.repository.course.LessonRepository;
import com.ironhack.lms.repository.item.ItemRepository;
import com.ironhack.lms.service.course.CourseService;
import com.ironhack.lms.web.graphql.input.LessonCreateInput;
import com.ironhack.lms.web.graphql.types.CourseGql;
import com.ironhack.lms.web.graphql.types.ItemGql;
import com.ironhack.lms.web.graphql.types.LessonGql;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Controller
@RequiredArgsConstructor
public class LessonGraphqlController {

    private final ItemRepository items;
    private final CourseRepository courses;
    private final LessonRepository lessons;
    private final CourseService courseService;

    @MutationMapping
    @Transactional
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public LessonGql createLesson(@Argument LessonCreateInput input, Authentication auth) {
        // Use the existing service method to create lesson
        Long lessonId = courseService.addLesson(
            input.courseId(), 
            new com.ironhack.lms.web.course.dto.LessonCreateRequest(input.title(), input.orderIndex()), 
            auth
        );
        
        // Fetch the created lesson and return as GraphQL type
        Lesson lesson = lessons.findById(lessonId)
            .orElseThrow(() -> new RuntimeException("Lesson not found after creation"));
        
        return LessonGqlMapper.toGql(lesson);
    }

    @SchemaMapping(typeName = "Lesson", field = "item")
    @Transactional(readOnly = true)
    public ItemGql item(LessonGql lesson) {
        return items.findByLesson_Id(lesson.id())
                .map(ItemGqlMapper::toGql)
                .orElse(null);
    }

    @SchemaMapping(typeName = "Lesson", field = "course")
    @Transactional(readOnly = true)
    public CourseGql course(LessonGql lesson) {
        Course course = courses.findById(lesson.courseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return CourseGqlMapper.toGql(course);
    }
}
