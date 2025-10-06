package com.ironhack.lms.web.graphql;

import com.ironhack.lms.domain.item.Item;
import com.ironhack.lms.web.graphql.types.ItemGql;
import com.ironhack.lms.web.graphql.types.ItemPageGql;
import com.ironhack.lms.web.graphql.types.PageInfoGql;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

public final class ItemGqlMapper {
    private ItemGqlMapper() {}

    private static OffsetDateTime toOffset(LocalDateTime ldt) {
        return ldt == null ? null : ldt.atOffset(ZoneOffset.UTC);
    }

    public static ItemGql toGql(Item i) {
        return new ItemGql(
                i.getId(),
                i.getLesson().getId(),
                i.getTitle(),
                i.getDescription(),
                i.getTags(),
                i.getBodyMarkdown(),
                toOffset(i.getCreatedAt()),
                toOffset(i.getUpdatedAt())
        );
    }

    public static ItemPageGql toGql(Page<Item> page) {
        List<ItemGql> content = page.getContent().stream()
                .map(ItemGqlMapper::toGql)
                .toList();

        PageInfoGql pi = new PageInfoGql(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.hasNext()
        );

        return new ItemPageGql(content, pi);
    }
}
