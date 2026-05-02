ALTER TABLE `segment` ADD `subtitle` text;--> statement-breakpoint
ALTER TABLE `segment` ADD `type` text;--> statement-breakpoint
ALTER TABLE `segment` ADD `date` text;--> statement-breakpoint
ALTER TABLE `segment` ADD `time` text;--> statement-breakpoint
ALTER TABLE `segment` ADD `venue` text;--> statement-breakpoint
ALTER TABLE `segment` ADD `seatsTotal` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `segment` ADD `seatsFilled` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `segment` ADD `created_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `segment` ADD `updated_at` integer NOT NULL;