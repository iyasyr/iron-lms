package com.ironhack.lms.config;

import com.ironhack.lms.domain.course.*;
import com.ironhack.lms.domain.user.*;
import com.ironhack.lms.repository.course.AssignmentRepository;
import com.ironhack.lms.repository.course.CourseRepository;
import com.ironhack.lms.repository.course.LessonRepository;
import com.ironhack.lms.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;

@Configuration
@Profile("test")   // only for tests
@RequiredArgsConstructor
public class TestDataInitializer {

    private final PasswordEncoder encoder;
    private final UserRepository users;
    private final CourseRepository courses;
    private final LessonRepository lessons;
    private final AssignmentRepository assignments;

    @Bean
    CommandLineRunner testSeed() {
        return args -> {
            // --- users ---
            Instructor instructor = users.findByEmail("instructor@lms.local")
                    .map(u -> (Instructor) u)
                    .orElseGet(() -> {
                        var i = new Instructor();
                        i.setEmail("instructor@lms.local");
                        i.setPasswordHash(encoder.encode("password"));
                        i.setFullName("In Structor");
                        i.setRole(Role.INSTRUCTOR);
                        i.setBio("Test instructor");
                        return (Instructor) users.save(i);
                    });

            users.findByEmail("student@lms.local").orElseGet(() -> {
                var s = new Student();
                s.setEmail("student@lms.local");
                s.setPasswordHash(encoder.encode("password"));
                s.setFullName("Stu Dent");
                s.setRole(Role.STUDENT);
                s.setStudentNumber("S-TEST");
                return users.save(s);
            });

            // --- one published course + one lesson + one assignment ---
            if (courses.count() == 0) {
                // Course
                var c = new Course();
                c.setInstructor(instructor);
                c.setTitle("Published Test Course");
                c.setDescription("For ITs");
                c.setStatus(CourseStatus.PUBLISHED);
                c.setPublishedAt(Instant.now());
                c = courses.save(c);

                // Lesson (since Assignment now links to Lesson)
                var l = new Lesson();
                l.setCourse(c);
                l.setTitle("Lesson 1");
                l.setOrderIndex(1);
                l = lessons.save(l);

                // Assignment linked to the lesson
                if (assignments.findByLesson_Id(l.getId()).isEmpty()) {
                    var a = new Assignment();
                    a.setLesson(l);
                    a.setTitle("HW1");
                    a.setInstructions("Submit URL");
                    a.setMaxPoints(100);
                    a.setAllowLate(true);
                    assignments.save(a);
                }
            }
            // no enrollment seeding here
        };
    }
}
