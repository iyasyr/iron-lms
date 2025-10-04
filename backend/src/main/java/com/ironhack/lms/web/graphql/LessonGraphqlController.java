package com.ironhack.lms.web.graphql;

import com.ironhack.lms.repository.item.ItemRepository;
import com.ironhack.lms.web.graphql.types.ItemGql;
import com.ironhack.lms.web.graphql.types.LessonGql;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

@Controller
@RequiredArgsConstructor
public class LessonGraphqlController {

    private final ItemRepository items;

    @SchemaMapping(typeName = "Lesson", field = "item")
    @Transactional(readOnly = true)
    public ItemGql item(LessonGql lesson) {
        return items.findByLesson_Id(lesson.id())
                .map(ItemGqlMapper::toGql)
                .orElse(null);
    }
}
