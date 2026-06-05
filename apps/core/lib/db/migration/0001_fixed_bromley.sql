CREATE TABLE `early_access` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`plan_id` int NOT NULL,
	`requests_per_minute` int NOT NULL,
	`monthly_quota` int NOT NULL,
	CONSTRAINT `early_access_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usage_rollup_monthly` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`plan_id` int NOT NULL,
	`period_string` varchar(7) NOT NULL,
	`requests_used` int NOT NULL DEFAULT 0,
	CONSTRAINT `usage_rollup_monthly_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `plans` MODIFY COLUMN `monthly_quota` int NOT NULL;--> statement-breakpoint
ALTER TABLE `subscriptions` MODIFY COLUMN `provider` enum('none','processor','manual') NOT NULL;--> statement-breakpoint
ALTER TABLE `plans` ADD `features` json NOT NULL;--> statement-breakpoint
ALTER TABLE `early_access` ADD CONSTRAINT `early_access_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `early_access` ADD CONSTRAINT `early_access_plan_id_plans_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usage_rollup_monthly` ADD CONSTRAINT `usage_rollup_monthly_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usage_rollup_monthly` ADD CONSTRAINT `usage_rollup_monthly_plan_id_plans_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `plans` DROP COLUMN `requests_per_hour`;--> statement-breakpoint
ALTER TABLE `plans` DROP COLUMN `api_key_limit`;