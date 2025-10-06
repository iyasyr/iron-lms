-- Seed test data for demonstration purposes
-- Run this script directly in your MySQL database

-- Insert test users (students)
INSERT IGNORE INTO app_user (id, dtype, email, password_hash, full_name, role, created_at) VALUES
(100, 'Student', 'student1@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Alice Johnson', 'STUDENT', NOW()),
(101, 'Student', 'student2@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Bob Smith', 'STUDENT', NOW()),
(102, 'Student', 'student3@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Carol Davis', 'STUDENT', NOW());

-- Insert test instructors
INSERT IGNORE INTO app_user (id, dtype, email, password_hash, full_name, role, created_at) VALUES
(200, 'Instructor', 'instructor1@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Dr. Sarah Wilson', 'INSTRUCTOR', NOW()),
(201, 'Instructor', 'instructor2@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'Prof. Michael Brown', 'INSTRUCTOR', NOW());

-- Insert test courses
INSERT IGNORE INTO course (id, instructor_id, title, description, status, created_at, published_at) VALUES
(100, 200, 'Introduction to Java Programming', 'Learn the fundamentals of Java programming language, including object-oriented programming concepts, data structures, and basic algorithms.', 'PUBLISHED', NOW(), NOW()),
(101, 200, 'Advanced Java Development', 'Deep dive into advanced Java concepts including multithreading, design patterns, and enterprise development.', 'PUBLISHED', NOW(), NOW()),
(102, 201, 'Web Development with React', 'Master modern web development using React, including hooks, state management, and component architecture.', 'PUBLISHED', NOW(), NOW()),
(103, 201, 'Full-Stack JavaScript', 'Complete full-stack development course covering Node.js, Express, MongoDB, and React.', 'PUBLISHED', NOW(), NOW()),
(104, 200, 'Spring Boot Fundamentals', 'Learn Spring Boot framework for building robust Java applications with microservices architecture.', 'PUBLISHED', NOW(), NOW());

-- Insert lessons for Course 100 (Introduction to Java Programming)
INSERT IGNORE INTO lesson (id, course_id, title, order_index) VALUES
(100, 100, 'Getting Started with Java', 1),
(101, 100, 'Variables and Data Types', 2),
(102, 100, 'Control Structures', 3),
(103, 100, 'Object-Oriented Programming Basics', 4),
(104, 100, 'Classes and Objects', 5);

-- Insert lessons for Course 102 (Web Development with React)
INSERT IGNORE INTO lesson (id, course_id, title, order_index) VALUES
(105, 102, 'React Fundamentals', 1),
(106, 102, 'Components and Props', 2),
(107, 102, 'State and Lifecycle', 3),
(108, 102, 'Event Handling', 4),
(109, 102, 'Hooks Introduction', 5);

-- Insert assignments for Course 100
INSERT IGNORE INTO assignment (id, course_id, lesson_id, title, instructions, max_points, allow_late, due_at) VALUES
(100, 100, 100, 'Hello World Program', 'Create your first Java program that prints "Hello, World!" to the console.', 10, true, DATE_ADD(NOW(), INTERVAL 7 DAY)),
(101, 100, 101, 'Variable Practice', 'Create a program that demonstrates different data types and variable declarations.', 15, true, DATE_ADD(NOW(), INTERVAL 10 DAY)),
(102, 100, 102, 'Control Flow Exercise', 'Write a program using if-else statements and loops to solve a given problem.', 20, true, DATE_ADD(NOW(), INTERVAL 14 DAY));

-- Insert assignments for Course 102
INSERT IGNORE INTO assignment (id, course_id, lesson_id, title, instructions, max_points, allow_late, due_at) VALUES
(103, 102, 105, 'First React Component', 'Create your first React component and render it to the DOM.', 15, true, DATE_ADD(NOW(), INTERVAL 5 DAY)),
(104, 102, 106, 'Props and Components', 'Build a component that accepts props and displays dynamic content.', 20, true, DATE_ADD(NOW(), INTERVAL 10 DAY));

-- Insert some test enrollments
INSERT IGNORE INTO enrollment (id, student_id, course_id, enrolled_at, status) VALUES
(100, 100, 100, NOW(), 'ACTIVE'),
(101, 100, 102, NOW(), 'ACTIVE'),
(102, 101, 100, NOW(), 'ACTIVE'),
(103, 101, 103, NOW(), 'ACTIVE'),
(104, 102, 101, NOW(), 'ACTIVE'),
(105, 102, 104, NOW(), 'ACTIVE');

-- Insert some test submissions
INSERT IGNORE INTO submission (id, assignment_id, course_id, student_id, submitted_at, artifact_url, status, version) VALUES
(100, 100, 100, 100, NOW(), 'https://github.com/student1/hello-world', 'SUBMITTED', 1),
(101, 101, 100, 100, NOW(), 'https://github.com/student1/variables', 'GRADED', 1),
(102, 100, 100, 101, NOW(), 'https://github.com/student2/hello-world', 'GRADED', 1),
(103, 103, 102, 100, NOW(), 'https://github.com/student1/first-react', 'SUBMITTED', 1),
(104, 104, 102, 100, NOW(), 'https://github.com/student1/props-component', 'GRADED', 1);

-- Update some submissions with scores and feedback
UPDATE submission SET score = 9, feedback = 'Great work! Clean code and proper implementation.' WHERE id = 101;
UPDATE submission SET score = 8, feedback = 'Good implementation, minor improvements needed in error handling.' WHERE id = 102;
UPDATE submission SET score = 10, feedback = 'Excellent! Perfect implementation with great attention to detail.' WHERE id = 104;

