// src/main/java/com/ironhack/lms/service/item/ItemSpecifications.java
package com.ironhack.lms.service.item;

import com.ironhack.lms.domain.item.Item;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public final class ItemSpecifications {
    private ItemSpecifications() {}

    public static Specification<Item> titleOrTagContains(String q) {
        return (root, query, cb) -> {
            if (q == null || q.isBlank()) return cb.conjunction();
            query.distinct(true);
            String like = "%" + q.toLowerCase() + "%";
            var titleLike = cb.like(cb.lower(root.get("title")), like);
            var tagJoin   = root.joinSet("tags", JoinType.LEFT);
            var tagLike   = cb.like(cb.lower(tagJoin.as(String.class)), like);
            return cb.or(titleLike, tagLike);
        };
    }
}
