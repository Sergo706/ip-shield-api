CREATE TABLE `plan_prices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`plan_id` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`interval` enum('month','year','one_time') NOT NULL,
	`amount_cents` int NOT NULL,
	`provider` enum('internal','processor','manual') NOT NULL,
	`provider_price_id` varchar(128),
	`active` boolean NOT NULL DEFAULT true,
	`effective_from` timestamp NOT NULL DEFAULT (now()),
	`effective_to` timestamp,
	CONSTRAINT `plan_prices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(32) NOT NULL,
	`name` varchar(100) NOT NULL,
	`billing_mode` enum('free','processor','manual') NOT NULL,
	`requests_per_minute` int NOT NULL,
	`requests_per_hour` int NOT NULL,
	`monthly_quota` int,
	`api_key_limit` int NOT NULL DEFAULT 1,
	`is_public` boolean NOT NULL DEFAULT true,
	`is_active` boolean NOT NULL DEFAULT true,
	CONSTRAINT `plans_id` PRIMARY KEY(`id`),
	CONSTRAINT `plans_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`plan_id` int NOT NULL,
	`plan_price_id` int,
	`status` enum('trialing','active','past_due','canceled','expired') NOT NULL,
	`provider` enum('none','processor','monero','manual') NOT NULL,
	`current_period_start` timestamp,
	`current_period_end` timestamp,
	`cancel_at_period_end` boolean NOT NULL DEFAULT false,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `plan_prices` ADD CONSTRAINT `plan_prices_plan_id_plans_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_id_plans_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_price_id_plan_prices_id_fk` FOREIGN KEY (`plan_price_id`) REFERENCES `plan_prices`(`id`) ON DELETE no action ON UPDATE no action;