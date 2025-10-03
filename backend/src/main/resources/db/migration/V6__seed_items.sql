-- Pick first 3 lessons if they exist
SET @l1 := (SELECT id FROM lesson ORDER BY id LIMIT 1);
SET @l2 := (SELECT id FROM lesson ORDER BY id LIMIT 1 OFFSET 1);
SET @l3 := (SELECT id FROM lesson ORDER BY id LIMIT 1 OFFSET 2);

-- Items
INSERT INTO items (lesson_id, title, description, body_markdown)
SELECT @l1, 'Intro to the Course', 'Overview',
       '# Welcome\nThis course…\n```java\nclass Hello{}\n```'
WHERE @l1 IS NOT NULL;

INSERT INTO items (lesson_id, title, description, body_markdown)
SELECT @l2, 'Java Basics', 'Variables and Types',
       '## Variables\n`int x = 42;`'
WHERE @l2 IS NOT NULL;

INSERT INTO items (lesson_id, title, description, body_markdown)
SELECT @l3, 'Control Flow', 'if/else, loops',
       '### Control Flow\n- if\n- for\n- while'
WHERE @l3 IS NOT NULL;

-- Tags (insert only if the item exists)
INSERT INTO item_tags (item_id, tag)
SELECT i.id, 'intro' FROM items i WHERE i.lesson_id = @l1;

INSERT INTO item_tags (item_id, tag)
SELECT i.id, 'java' FROM items i WHERE i.lesson_id = @l1;

INSERT INTO item_tags (item_id, tag)
SELECT i.id, 'java' FROM items i WHERE i.lesson_id = @l2;
