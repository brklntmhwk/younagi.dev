CREATE TABLE `likes` (
	`session_id` text,
	`collection` text,
	`slug` text,
	`created_at` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`collection`, `session_id`, `slug`)
);
