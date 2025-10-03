package com.ironhack.lms.repository.item;

import com.ironhack.lms.domain.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ItemRepository
        extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {

    boolean existsByLesson_Id(Long lessonId);

    Optional<Item> findByLesson_Id(Long lessonId);
}
