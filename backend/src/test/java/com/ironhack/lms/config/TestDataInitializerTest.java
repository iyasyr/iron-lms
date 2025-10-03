package com.ironhack.lms.config;

import com.ironhack.lms.domain.course.*;
import com.ironhack.lms.domain.user.*;
import com.ironhack.lms.repository.course.AssignmentRepository;
import com.ironhack.lms.repository.course.CourseRepository;
import com.ironhack.lms.repository.course.LessonRepository; // <-- add
import com.ironhack.lms.repository.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TestDataInitializerTest {

    @Mock private PasswordEncoder encoder;
    @Mock private UserRepository users;
    @Mock private CourseRepository courses;
    @Mock private LessonRepository lessons;        // <-- add
    @Mock private AssignmentRepository assignments;

    private TestDataInitializer initializer;

    @BeforeEach
    void setUp() {
        // pass lessons to the constructor
        initializer = new TestDataInitializer(encoder, users, courses, lessons, assignments);
    }

    @Test
    void testSeed_whenUsersExist_shouldNotCreateNewUsers() throws Exception {
        // Given
        Instructor instructor = new Instructor();
        instructor.setEmail("instructor@lms.local");
        Student student = new Student();
        student.setEmail("student@lms.local");

        when(users.findByEmail("instructor@lms.local")).thenReturn(Optional.of(instructor));
        when(users.findByEmail("student@lms.local")).thenReturn(Optional.of(student));
        when(courses.count()).thenReturn(0L);

        // course save returns course with id
        when(courses.save(any(Course.class))).thenAnswer(inv -> {
            Course c = inv.getArgument(0);
            c.setId(1L);
            return c;
        });

        // lesson save returns lesson with id
        when(lessons.save(any(Lesson.class))).thenAnswer(inv -> {
            Lesson l = inv.getArgument(0);
            l.setId(10L);
            return l;
        });

        // allow assignment creation
        when(assignments.findByLesson_Id(anyLong())).thenReturn(Collections.emptyList());
        when(assignments.save(any(Assignment.class))).thenAnswer(inv -> inv.getArgument(0));

        CommandLineRunner runner = initializer.testSeed();

        // When
        runner.run();

        // Then
        verify(users, never()).save(any(Instructor.class));
        verify(users, never()).save(any(Student.class));
        verify(courses).save(any(Course.class));
        verify(lessons).save(any(Lesson.class));          // optional but accurate
        verify(assignments).save(any(Assignment.class));
    }

    @Test
    void testSeed_whenUsersDoNotExist_shouldCreateUsers() throws Exception {
        // Given
        when(users.findByEmail("instructor@lms.local")).thenReturn(Optional.empty());
        when(users.findByEmail("student@lms.local")).thenReturn(Optional.empty());
        when(courses.count()).thenReturn(0L);
        when(encoder.encode("password")).thenReturn("encoded-password");

        when(users.save(any(Instructor.class))).thenAnswer(inv -> {
            Instructor i = inv.getArgument(0);
            i.setId(1L);
            return i;
        });
        when(users.save(any(Student.class))).thenAnswer(inv -> inv.getArgument(0));

        when(courses.save(any(Course.class))).thenAnswer(inv -> {
            Course c = inv.getArgument(0);
            c.setId(1L);
            return c;
        });

        when(lessons.save(any(Lesson.class))).thenAnswer(inv -> {
            Lesson l = inv.getArgument(0);
            l.setId(10L);
            return l;
        });

        when(assignments.findByLesson_Id(anyLong())).thenReturn(Collections.emptyList());
        when(assignments.save(any(Assignment.class))).thenAnswer(inv -> inv.getArgument(0));

        CommandLineRunner runner = initializer.testSeed();

        // When
        runner.run();

        // Then
        verify(users).save(any(Instructor.class));
        verify(users).save(any(Student.class));
        verify(courses).save(any(Course.class));
        verify(lessons).save(any(Lesson.class));          // optional
        verify(assignments).save(any(Assignment.class));
    }

    @Test
    void testSeed_whenCoursesExist_shouldNotCreateNewCourses() throws Exception {
        // Given
        Instructor instructor = new Instructor();
        instructor.setEmail("instructor@lms.local");
        Student student = new Student();
        student.setEmail("student@lms.local");

        when(users.findByEmail("instructor@lms.local")).thenReturn(Optional.of(instructor));
        when(users.findByEmail("student@lms.local")).thenReturn(Optional.of(student));
        when(courses.count()).thenReturn(1L); // Courses already exist

        CommandLineRunner runner = initializer.testSeed();

        // When
        runner.run();

        // Then
        verify(courses, never()).save(any(Course.class));
        verify(lessons, never()).save(any(Lesson.class));
        verify(assignments, never()).save(any(Assignment.class));
    }

    @Test
    void testSeed_shouldCreatePublishedCourse() throws Exception {
        // Given
        Instructor instructor = new Instructor();
        instructor.setEmail("instructor@lms.local");
        Student student = new Student();
        student.setEmail("student@lms.local");

        when(users.findByEmail("instructor@lms.local")).thenReturn(Optional.of(instructor));
        when(users.findByEmail("student@lms.local")).thenReturn(Optional.of(student));
        when(courses.count()).thenReturn(0L);

        when(courses.save(any(Course.class))).thenAnswer(inv -> {
            Course c = inv.getArgument(0);
            c.setId(1L);
            return c;
        });

        when(lessons.save(any(Lesson.class))).thenAnswer(inv -> {
            Lesson l = inv.getArgument(0);
            l.setId(10L);
            return l;
        });

        when(assignments.findByLesson_Id(anyLong())).thenReturn(Collections.emptyList());
        when(assignments.save(any(Assignment.class))).thenAnswer(inv -> inv.getArgument(0));

        CommandLineRunner runner = initializer.testSeed();

        // When
        runner.run();

        // Then
        verify(courses).save(argThat(courseArg ->
                "Published Test Course".equals(courseArg.getTitle()) &&
                        "For ITs".equals(courseArg.getDescription()) &&
                        CourseStatus.PUBLISHED.equals(courseArg.getStatus()) &&
                        courseArg.getPublishedAt() != null
        ));
    }

    @Test
    void testSeed_shouldCreateAssignment() throws Exception {
        // Given
        Instructor instructor = new Instructor();
        instructor.setEmail("instructor@lms.local");
        Student student = new Student();
        student.setEmail("student@lms.local");

        when(users.findByEmail("instructor@lms.local")).thenReturn(Optional.of(instructor));
        when(users.findByEmail("student@lms.local")).thenReturn(Optional.of(student));
        when(courses.count()).thenReturn(0L);

        when(courses.save(any(Course.class))).thenAnswer(inv -> {
            Course c = inv.getArgument(0);
            c.setId(1L);
            return c;
        });

        when(lessons.save(any(Lesson.class))).thenAnswer(inv -> {
            Lesson l = inv.getArgument(0);
            l.setId(10L);
            return l;
        });

        when(assignments.findByLesson_Id(anyLong())).thenReturn(Collections.emptyList());
        when(assignments.save(any(Assignment.class))).thenAnswer(inv -> inv.getArgument(0));

        CommandLineRunner runner = initializer.testSeed();

        // When
        runner.run();

        // Then
        verify(assignments).save(argThat(assignmentArg ->
                "HW1".equals(assignmentArg.getTitle()) &&
                        "Submit URL".equals(assignmentArg.getInstructions()) &&
                        Integer.valueOf(100).equals(assignmentArg.getMaxPoints()) &&
                        assignmentArg.isAllowLate() &&
                        assignmentArg.getLesson() != null &&                    // ensure linked to a lesson
                        assignmentArg.getLesson().getId() != null
        ));
    }
}
