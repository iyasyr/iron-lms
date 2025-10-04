package com.ironhack.lms.web.graphql;

import com.ironhack.lms.service.item.ItemService;
import com.ironhack.lms.web.graphql.input.ItemCreateInput;
import com.ironhack.lms.web.graphql.input.ItemUpdateInput;
import com.ironhack.lms.web.graphql.types.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.graphql.data.method.annotation.*;
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
    public ItemGql createItem(@Argument ItemCreateInput input) {
        var created = items.createEntity(input.lessonId(), input.title(), input.description(),
                input.tags(), input.bodyMarkdown());
        return ItemGqlMapper.toGql(created);
    }

    @MutationMapping
    @Transactional
    public ItemGql updateItem(@Argument Long id, @Argument ItemUpdateInput input) {
        var updated = items.updateEntity(id, input.title(), input.description(),
                input.tags(), input.bodyMarkdown());
        return ItemGqlMapper.toGql(updated);
    }

    @MutationMapping
    @Transactional
    public Boolean deleteItem(@Argument Long id) {
        items.delete(id); // keep your existing REST delete; or add a new one that deletes by id
        return true;
    }
}
