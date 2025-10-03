CREATE TABLE IF NOT EXISTS items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  lesson_id BIGINT NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000),
  body_markdown MEDIUMTEXT NOT NULL,
  body_html MEDIUMTEXT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_item_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item_tags (
  item_id BIGINT NOT NULL,
  tag VARCHAR(64) NOT NULL,
  PRIMARY KEY (item_id, tag),
  CONSTRAINT fk_item_tags_item FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

-- Create FULLTEXT index only if it doesn't already exist
SET @ft_exists := (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name   = 'items'
    AND index_name   = 'ft_items_title'
);
SET @ddl := IF(@ft_exists = 0,
  'CREATE FULLTEXT INDEX ft_items_title ON items (title)',
  'SELECT 1'
);
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;
