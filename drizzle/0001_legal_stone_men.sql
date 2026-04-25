ALTER TABLE `user` ADD `fest_id` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_fest_id_unique` ON `user` (`fest_id`);