package com.ironhack.lms.repository.item;

import com.ironhack.lms.domain.item.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

    boolean existsByLesson_Id(Long lessonId);

    @EntityGraph(attributePaths = {"tags", "lesson", "lesson.course", "lesson.course.instructor"})
    Optional<Item> findById(Long id);

    // Custom query for authorization that explicitly loads all required relationships
    @Query("SELECT i FROM Item i " +
           "LEFT JOIN FETCH i.lesson l " +
           "LEFT JOIN FETCH l.course c " +
           "LEFT JOIN FETCH c.instructor " +
           "WHERE i.id = :id")
    Optional<Item> findByIdWithFullRelations(@Param("id") Long id);


    // Redeclare to attach @EntityGraph so tags, lesson, and course are loaded (avoids LazyInitialization later)
    @Override
    @EntityGraph(attributePaths = {"tags", "lesson", "lesson.course", "lesson.course.instructor"})
    Page<Item> findAll(@Nullable Specification<Item> spec, Pageable pageable);

    Optional<com.ironhack.lms.domain.item.Item> findByLesson_Id(Long lessonId);
}
