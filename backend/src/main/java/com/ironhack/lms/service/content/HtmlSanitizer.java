package com.ironhack.lms.service.content;

import org.owasp.html.HtmlPolicyBuilder;
import org.owasp.html.PolicyFactory;
import org.springframework.stereotype.Component;

@Component
public class HtmlSanitizer {
    private final PolicyFactory policy = new HtmlPolicyBuilder()
            .allowElements("p","h1","h2","h3","h4","h5","h6","ul","ol","li","pre","code","em","strong","blockquote","a","table","thead","tbody","tr","th","td","hr")
            .allowStandardUrlProtocols()
            .allowAttributes("href").onElements("a")
            .requireRelNofollowOnLinks()
            .toFactory();

    public String sanitize(String html) {
        return html == null ? "" : policy.sanitize(html);
    }
}
