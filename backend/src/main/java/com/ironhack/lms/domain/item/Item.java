package com.ironhack.lms.domain.item;

import com.ironhack.lms.domain.course.Lesson;
import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity @Table(name = "items")
@Getter @Setter
public class Item {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "lesson_id", unique = true, nullable = false)
    private Lesson lesson;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 1000)
    private String description;

    @Lob @Column(name = "body_markdown", columnDefinition = "MEDIUMTEXT", nullable = false)
    private String bodyMarkdown;

    @Lob @Column(name = "body_html", columnDefinition = "MEDIUMTEXT")
    private String bodyHtml;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "item_tags", joinColumns = @JoinColumn(name = "item_id"))
    @Column(name = "tag", nullable = false, length = 64)
    private Set<String> tags = new java.util.LinkedHashSet<>();

    @CreationTimestamp @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
