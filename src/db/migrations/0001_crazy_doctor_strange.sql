PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_likes` (
	`session_id` text,
	`collection` text,
	`slug` text,
	`created_at` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`session_id`, `collection`, `slug`)
);
--> statement-breakpoint
INSERT INTO `__new_likes`("session_id", "collection", "slug", "created_at") SELECT "session_id", "collection", "slug", "created_at" FROM `likes`;--> statement-breakpoint
DROP TABLE `likes`;--> statement-breakpoint
ALTER TABLE `__new_likes` RENAME TO `likes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;