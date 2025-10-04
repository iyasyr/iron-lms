package com.ironhack.lms.repository.item;

import com.ironhack.lms.domain.item.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.*;
import org.springframework.lang.Nullable;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

    boolean existsByLesson_Id(Long lessonId);

    @EntityGraph(attributePaths = "tags")
    Optional<Item> findById(Long id);

    // Redeclare to attach @EntityGraph so tags are loaded (avoids LazyInitialization later)
    @Override
    @EntityGraph(attributePaths = "tags")
    Page<Item> findAll(@Nullable Specification<Item> spec, Pageable pageable);

    Optional<com.ironhack.lms.domain.item.Item> findByLesson_Id(Long lessonId);
}
