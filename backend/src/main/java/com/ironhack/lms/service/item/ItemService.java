package com.ironhack.lms.service.item;

import com.ironhack.lms.service.content.HtmlSanitizer;
import com.ironhack.lms.service.content.MarkdownService;
import com.ironhack.lms.domain.course.Lesson;
import com.ironhack.lms.domain.item.Item;
import com.ironhack.lms.repository.course.LessonRepository;
import com.ironhack.lms.repository.item.ItemRepository;
import com.ironhack.lms.repository.item.ItemSpecifications;
import com.ironhack.lms.web.item.dto.ItemCreateRequest;
import com.ironhack.lms.web.item.dto.ItemListResponse;
import com.ironhack.lms.web.item.dto.ItemResponse;
import com.ironhack.lms.web.item.dto.ItemUpdateRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository repo;
    private final LessonRepository lessons;
    private final MarkdownService md;
    private final HtmlSanitizer sanitizer;

    @Transactional
    public ItemResponse create(ItemCreateRequest req) {
        Lesson lesson = lessons.findById(req.lessonId())
                .orElseThrow(() -> new EntityNotFoundException("Lesson not found: " + req.lessonId()));

        Item entity = new Item();
        entity.setLesson(lesson);
        entity.setTitle(req.title());
        entity.setDescription(req.description());
        entity.getTags().clear();
        if (req.tags() != null) entity.getTags().addAll(req.tags());
        entity.setBodyMarkdown(req.bodyMarkdown());

        String html = sanitizer.sanitize(md.toHtml(req.bodyMarkdown()));
        entity.setBodyHtml(html);

        Item saved = repo.save(entity);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ItemResponse get(Long id) {
        return repo.findById(id).map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));
    }

    @Transactional
    public ItemResponse update(Long id, ItemUpdateRequest req) {
        Item e = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));

        if (req.title() != null) e.setTitle(req.title());
        if (req.description() != null) e.setDescription(req.description());
        if (req.tags() != null) { e.getTags().clear(); e.getTags().addAll(req.tags()); }
        if (req.bodyMarkdown() != null) {
            e.setBodyMarkdown(req.bodyMarkdown());
            e.setBodyHtml(sanitizer.sanitize(md.toHtml(req.bodyMarkdown())));
        }
        return toResponse(e);
    }

    @Transactional
    public void delete(Long id) { repo.deleteById(id); }

    @Transactional(readOnly = true)
    public Page<ItemListResponse> search(String search, Pageable pageable) {
        Specification<Item> spec = ItemSpecifications.titleContains(search)
                .or(ItemSpecifications.tagsContain(search));

        return repo.findAll(spec, pageable).map(this::toListResponse);
    }

    private ItemListResponse toListResponse(Item e) {
        return new ItemListResponse(e.getId(), e.getLesson().getId(), e.getTitle(), e.getTags(), e.getUpdatedAt());
    }
    private ItemResponse toResponse(Item e) {
        return new ItemResponse(e.getId(), e.getLesson().getId(), e.getTitle(), e.getDescription(),
                e.getTags(), e.getBodyMarkdown(), e.getBodyHtml(), e.getCreatedAt(), e.getUpdatedAt());
    }
}
