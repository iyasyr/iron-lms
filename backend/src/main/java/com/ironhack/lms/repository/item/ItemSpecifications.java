package com.ironhack.lms.repository.item;

import com.ironhack.lms.domain.item.Item;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.SetJoin;
import org.springframework.data.jpa.domain.Specification;

public final class ItemSpecifications {
    private ItemSpecifications() {}

    public static Specification<Item> titleContains(String q) {
        return (root, cq, cb) -> {
            if (q == null || q.isBlank()) return cb.conjunction();
            String pat = "%" + q.toLowerCase() + "%";
            return cb.like(cb.lower(root.get("title")), pat);
        };
    }

    public static Specification<Item> tagsContain(String q) {
        return (root, cq, cb) -> {
            if (q == null || q.isBlank()) return cb.conjunction();
            // Typed join to avoid SetJoin<Object,Object>
            SetJoin<Item, String> tagJoin = root.joinSet("tags", JoinType.LEFT);
            cq.distinct(true); // avoid duplicates from the join
            String pat = "%" + q.toLowerCase() + "%";
            // Convert the join to an Expression<String> for cb.lower / cb.like
            return cb.like(cb.lower(tagJoin.as(String.class)), pat);
        };
    }

    /** Combine title OR tags for a simple "search" param without using deprecated where(). */
    public static Specification<Item> searchAnyField(String q) {
        // see section 2 for deprecation-free composition
        return titleContains(q).or(tagsContain(q));
    }
}
