package com.ironhack.lms.service.item;

import com.ironhack.lms.service.content.HtmlSanitizer;
import com.ironhack.lms.service.content.MarkdownService;
import com.ironhack.lms.domain.course.Lesson;
import com.ironhack.lms.domain.course.Course;
import com.ironhack.lms.domain.item.Item;
import com.ironhack.lms.domain.user.Instructor;
import com.ironhack.lms.repository.course.LessonRepository;
import com.ironhack.lms.repository.item.ItemRepository;
import com.ironhack.lms.web.item.dto.ItemCreateRequest;
import com.ironhack.lms.web.item.dto.ItemListResponse;
import com.ironhack.lms.web.item.dto.ItemResponse;
import com.ironhack.lms.web.item.dto.ItemUpdateRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository items;
    private final LessonRepository lessons;
    private final MarkdownService md;
    private final HtmlSanitizer sanitizer;

    // ---------- entity-oriented methods used by GraphQL ----------

    @Transactional
    public Item createEntity(Long lessonId, String title, String description, Set<String> tags, String bodyMarkdown) {
        Lesson lesson = lessons.findById(lessonId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesson not found"));

        if (items.existsByLesson_Id(lessonId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Lesson already has an Item (1:1)");
        }

        Item i = new Item();
        i.setLesson(lesson);
        i.setTitle(title);
        i.setDescription(description);
        i.setTags(tags != null ? new LinkedHashSet<>(tags) : new LinkedHashSet<>());
        i.setBodyMarkdown(bodyMarkdown);

        return items.save(i);
    }

    @Transactional
    public Item updateEntity(Long id, String title, String description, Set<String> tags, String bodyMarkdown) {
        Item i = items.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        if (title != null)       i.setTitle(title);
        if (description != null) i.setDescription(description);
        if (tags != null) {
            i.getTags().clear();
            i.getTags().addAll(tags);
        }
        if (bodyMarkdown != null) {
            i.setBodyMarkdown(bodyMarkdown);
        }

        items.save(i);
        
        // Return the updated item with all relationships loaded
        return items.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found after update"));
    }

    @Transactional(readOnly = true)
    public Item getEntity(Long id) {
        return items.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
    }

    @Transactional(readOnly = true)
    public Page<Item> searchEntities(String search, Pageable pageable) {
        Specification<Item> spec = ItemSpecifications.titleOrTagContains(search);
        return items.findAll(spec, pageable);
    }

    // ---------- REST-oriented methods (DTO in/out) ----------

    @Transactional
    public ItemResponse create(ItemCreateRequest req) {
        Lesson lesson = lessons.findById(req.lessonId())
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found: " + req.lessonId()));

        if (items.existsByLesson_Id(req.lessonId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Lesson already has an Item (1:1)");
        }

        Item entity = new Item();
        entity.setLesson(lesson);
        entity.setTitle(req.title());
        entity.setDescription(req.description());
        entity.getTags().clear();
        if (req.tags() != null) entity.getTags().addAll(req.tags());
        entity.setBodyMarkdown(req.bodyMarkdown());

        Item saved = items.save(entity);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ItemResponse get(Long id) {
        return items.findById(id).map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));
    }

    @Transactional
    public ItemResponse update(Long id, ItemUpdateRequest req) {
        Item e = items.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));

        if (req.title() != null) e.setTitle(req.title());
        if (req.description() != null) e.setDescription(req.description());
        if (req.tags() != null) { e.getTags().clear(); e.getTags().addAll(req.tags()); }
        if (req.bodyMarkdown() != null) {
            e.setBodyMarkdown(req.bodyMarkdown());
        }

        e = items.save(e);
        return toResponse(e);
    }

    @Transactional
    public void delete(Long id) {
        items.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<ItemListResponse> search(String search, Pageable pageable) {
        Specification<Item> spec = ItemSpecifications.titleOrTagContains(search);
        return items.findAll(spec, pageable).map(this::toListResponse);
    }

    // ---------- mappers ----------

    private ItemListResponse toListResponse(Item e) {
        return new ItemListResponse(
                e.getId(),
                e.getLesson().getId(),
                e.getTitle(),
                e.getTags(),
                e.getUpdatedAt()
        );
    }

    private ItemResponse toResponse(Item e) {
        return new ItemResponse(
                e.getId(),
                e.getLesson().getId(),
                e.getTitle(),
                e.getDescription(),
                e.getTags(),
                e.getBodyMarkdown(),
                e.getCreatedAt(),
                e.getUpdatedAt()
        );
    }

    // Authorization methods
    @Transactional(readOnly = true)
    public void verifyInstructorOwnsCourse(Long lessonId, String instructorEmail) {
        Lesson lesson = lessons.findById(lessonId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesson not found"));
        
        Course course = lesson.getCourse();
        Instructor instructor = course.getInstructor();
        
        if (!instructor.getEmail().equals(instructorEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only modify items in your own courses");
        }
    }

    @Transactional(readOnly = true)
    public void verifyInstructorOwnsItem(Long itemId, String instructorEmail) {
        Item item = items.findByIdWithFullRelations(itemId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        
        Course course = item.getLesson().getCourse();
        Instructor instructor = course.getInstructor();
        
        if (!instructor.getEmail().equals(instructorEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only modify items in your own courses");
        }
    }
}
