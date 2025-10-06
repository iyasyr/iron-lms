package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.item.Item;
import com.ironhack.lms.domain.course.Lesson;
import com.ironhack.lms.domain.course.Course;
import com.ironhack.lms.domain.user.Instructor;
import com.ironhack.lms.service.item.ItemService;
import com.ironhack.lms.web.graphql.input.ItemCreateInput;
import com.ironhack.lms.web.graphql.input.ItemUpdateInput;
import com.ironhack.lms.web.graphql.types.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.graphql.data.method.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Controller
@RequiredArgsConstructor
public class ItemGraphqlController {
    private final ItemService items;

    @QueryMapping
    @Transactional(readOnly = true)
    public ItemPageGql items(@Argument String search, @Argument int page, @Argument int pageSize) {
        var pageEntities = items.searchEntities(search, PageRequest.of(page, pageSize));
        return ItemGqlMapper.toGql(pageEntities);
    }

    @QueryMapping
    @Transactional(readOnly = true)
    public ItemGql item(@Argument Long id) {
        return ItemGqlMapper.toGql(items.getEntity(id));
    }

    @MutationMapping
    @Transactional
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ItemGql createItem(@Argument ItemCreateInput input, Authentication auth) {
        // Verify that the instructor owns the course
        items.verifyInstructorOwnsCourse(input.lessonId(), auth.getName());
        
        var created = items.createEntity(input.lessonId(), input.title(), input.description(),
                input.tags(), input.bodyMarkdown());
        return ItemGqlMapper.toGql(created);
    }

    @MutationMapping
    @Transactional
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ItemGql updateItem(@Argument Long id, @Argument ItemUpdateInput input, Authentication auth) {
        // Verify that the instructor owns the course
        items.verifyInstructorOwnsItem(id, auth.getName());
        
        var updated = items.updateEntity(id, input.title(), input.description(),
                input.tags(), input.bodyMarkdown());
        return ItemGqlMapper.toGql(updated);
    }

    @MutationMapping
    @Transactional
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public Boolean deleteItem(@Argument Long id, Authentication auth) {
        // Verify that the instructor owns the course
        items.verifyInstructorOwnsItem(id, auth.getName());
        
        items.delete(id);
        return true;
    }

    // Schema mappings for nested objects
    @SchemaMapping(typeName = "Item", field = "lesson")
    public LessonGql lesson(Item item) {
        return LessonGqlMapper.toGql(item.getLesson());
    }
}
