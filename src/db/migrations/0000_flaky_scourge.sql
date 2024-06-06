CREATE TABLE `likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`count` integer DEFAULT 0 NOT NULL
);
