-- Drop FK to course_id if it exists, then drop the column
SET @fk_name := (
  SELECT rc.CONSTRAINT_NAME
  FROM information_schema.REFERENTIAL_CONSTRAINTS rc
  JOIN information_schema.KEY_COLUMN_USAGE kcu
    ON kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
   AND kcu.CONSTRAINT_SCHEMA = rc.CONSTRAINT_SCHEMA
  WHERE rc.CONSTRAINT_SCHEMA = DATABASE()
    AND rc.TABLE_NAME = 'assignment'
    AND kcu.COLUMN_NAME = 'course_id'
  LIMIT 1
);

SET @sql := IF(@fk_name IS NOT NULL,
  CONCAT('ALTER TABLE assignment DROP FOREIGN KEY ', @fk_name),
  'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Column drop (safe if it still exists)
SET @has_col := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'assignment'
    AND COLUMN_NAME = 'course_id'
);
SET @sql2 := IF(@has_col = 1,
  'ALTER TABLE assignment DROP COLUMN course_id',
  'SELECT 1'
);
PREPARE stmt2 FROM @sql2; EXECUTE stmt2; DEALLOCATE PREPARE stmt2;
