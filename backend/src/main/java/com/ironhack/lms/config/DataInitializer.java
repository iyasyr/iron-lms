package com.ironhack.lms.config;

import com.ironhack.lms.domain.course.*;
import com.ironhack.lms.domain.enrollment.Enrollment;
import com.ironhack.lms.domain.item.Item;
import com.ironhack.lms.domain.user.*;
import com.ironhack.lms.repository.course.AssignmentRepository;
import com.ironhack.lms.repository.course.CourseRepository;
import com.ironhack.lms.repository.course.LessonRepository;
import com.ironhack.lms.repository.enrollment.EnrollmentRepository;
import com.ironhack.lms.repository.item.ItemRepository;
import com.ironhack.lms.repository.user.UserRepository;
import com.ironhack.lms.service.content.HtmlSanitizer;
import com.ironhack.lms.service.content.MarkdownService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

@Configuration
@Profile("!test")
@RequiredArgsConstructor
public class DataInitializer {

    private final PasswordEncoder encoder;
    private final UserRepository users;
    private final CourseRepository courses;
    private final LessonRepository lessons;
    private final AssignmentRepository assignments;
    private final EnrollmentRepository enrollments;
    private final ItemRepository items;
    private final MarkdownService markdown;
    private final HtmlSanitizer sanitizer;

    @Bean
    CommandLineRunner initDemoData() {
        return args -> {
            // ---- Ensure demo users ----
            Instructor instructor = users.findByEmail("instructor@lms.local")
                    .map(u -> (Instructor) u)
                    .orElseGet(() -> {
                        var i = new Instructor();
                        i.setEmail("instructor@lms.local");
                        i.setPasswordHash(encoder.encode("password"));
                        i.setFullName("In Structor");
                        i.setRole(Role.INSTRUCTOR);
                        i.setBio("Teaches Java & Spring");
                        return (Instructor) users.save(i);
                    });

            Student student = users.findByEmail("student@lms.local")
                    .map(u -> (Student) u)
                    .orElseGet(() -> {
                        var s = new Student();
                        s.setEmail("student@lms.local");
                        s.setPasswordHash(encoder.encode("password"));
                        s.setFullName("Stu Dent");
                        s.setRole(Role.STUDENT);
                        s.setStudentNumber("S-001");
                        return (Student) users.save(s);
                    });

            // ---- Seed content once (idempotent) ----
            if (courses.count() == 0) {
                // Published course
                var spring = new Course();
                spring.setInstructor(instructor);
                spring.setTitle("Spring Boot 101");
                spring.setDescription("Learn Spring Boot basics");
                spring.setStatus(CourseStatus.PUBLISHED);
                spring.setPublishedAt(Instant.now());
                spring = courses.save(spring);

                // Draft course
                var java = new Course();
                java.setInstructor(instructor);
                java.setTitle("Java Basics");
                java.setDescription("Intro to Java (draft)");
                java.setStatus(CourseStatus.DRAFT);
                java = courses.save(java);

                // Lessons for published course
                var l1 = new Lesson();
                l1.setCourse(spring);
                l1.setTitle("Intro");
                l1.setOrderIndex(1);
                l1 = lessons.save(l1);

                var l2 = new Lesson();
                l2.setCourse(spring);
                l2.setTitle("Controllers & REST");
                l2.setOrderIndex(2);
                l2 = lessons.save(l2);

                // ---- Items for each lesson (Markdown + sanitized HTML) ----
                ensureItem(l1,
                        "Intro",
                        "Course overview",
                        Set.of("intro", "spring"),
                        """
                        # Welcome to Spring Boot 101
                        In this lesson we cover project structure and the basic starters.
    
                        ```bash
                        curl http://localhost:8080/api/health
                        ```
                        """);

                ensureItem(l2,
                        "Controllers & REST",
                        "Building REST controllers",
                        Set.of("spring", "rest"),
                        """
                        ## Controllers & REST
                        Define routes with `@RestController` and `@GetMapping`.
    
                        ```java
                        @RestController
                        class HealthController {
                          @GetMapping("/api/health") Map<String,Object> ok() {
                            return Map.of("status","OK");
                          }
                        }
                        ```
                        """);

                // ---- Assignment tied to a Lesson (NOT Course) ----
                if (!assignments.existsByLesson_Id(l2.getId())) {
                    var a1 = new Assignment();
                    a1.setLesson(l2);
                    a1.setTitle("HW1 - Build a REST endpoint");
                    a1.setInstructions("Submit your GitHub repo URL in artifactUrl");
                    a1.setDueAt(Instant.now().plus(7, ChronoUnit.DAYS));
                    a1.setMaxPoints(100);
                    a1.setAllowLate(true);
                    assignments.save(a1);
                }

                // ---- Enroll student to published course ----
                if (!enrollments.existsByCourse_IdAndStudent_Id(spring.getId(), student.getId())) {
                    var e = new Enrollment();
                    e.setCourse(spring);
                    e.setStudent(student);
                    enrollments.save(e);
                }
            }
        };
    }

    private void ensureItem(Lesson lesson, String title, String description, Set<String> tags, String bodyMarkdown) {
        // Only create if this lesson doesn't already have an item
        if (items.existsByLesson_Id(lesson.getId())) return;

        var item = new Item();
        item.setLesson(lesson);
        item.setTitle(title);
        item.setDescription(description);
        item.getTags().addAll(tags);
        item.setBodyMarkdown(bodyMarkdown);

        // bodyHtml field removed - only using markdown

        items.save(item);
    }
}
