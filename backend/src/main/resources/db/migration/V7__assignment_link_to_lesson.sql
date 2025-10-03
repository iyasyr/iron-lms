-- 1) Add nullable lesson_id + FK
ALTER TABLE assignment ADD COLUMN lesson_id BIGINT NULL;
ALTER TABLE assignment
  ADD CONSTRAINT fk_assignment_lesson
  FOREIGN KEY (lesson_id) REFERENCES lesson(id)
  ON DELETE CASCADE;

-- 2) Backfill: choose the first lesson by order_index within the assignment’s course
UPDATE assignment a
JOIN (
  SELECT l.course_id, MIN(l.order_index) AS min_order
  FROM lesson l GROUP BY l.course_id
) t ON t.course_id = a.course_id
JOIN lesson lmin ON lmin.course_id = a.course_id AND lmin.order_index = t.min_order
SET a.lesson_id = lmin.id
WHERE a.lesson_id IS NULL;

-- 3) Fallback by smallest lesson id (in case order_index is NULL)
UPDATE assignment a
JOIN (
  SELECT l.course_id, MIN(l.id) AS lesson_id
  FROM lesson l GROUP BY l.course_id
) x ON x.course_id = a.course_id
SET a.lesson_id = COALESCE(a.lesson_id, x.lesson_id)
WHERE a.lesson_id IS NULL;

-- 4) (Optional strictness) uncomment to enforce NOT NULL once backfill is guaranteed
-- ALTER TABLE assignment MODIFY COLUMN lesson_id BIGINT NOT NULL;
