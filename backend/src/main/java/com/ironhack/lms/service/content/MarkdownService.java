package com.ironhack.lms.service.content;

import com.vladsch.flexmark.ext.tables.TablesExtension;
import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;
import com.vladsch.flexmark.util.misc.Extension;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkdownService {
    private final Parser parser;
    private final HtmlRenderer renderer;

    public MarkdownService() {
        MutableDataSet opts = new MutableDataSet()
                .set(Parser.EXTENSIONS, List.<Extension>of(TablesExtension.create()));
        this.parser = Parser.builder(opts).build();
        this.renderer = HtmlRenderer.builder(opts).build();
    }

    public String toHtml(String markdown) {
        if (markdown == null) return "";
        return renderer.render(parser.parse(markdown));
    }
}
