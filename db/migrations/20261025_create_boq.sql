CREATE TABLE IF NOT EXISTS `boq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `boq_no` varchar(40) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(180) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'draft',
  `revision` int(11) NOT NULL DEFAULT 1,
  `notes` text DEFAULT NULL,
  `rejection_note` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_boq_no` (`boq_no`),
  KEY `idx_boq_project` (`project_id`),
  KEY `idx_boq_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `boq_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `boq_id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `quantity` decimal(15,3) NOT NULL,
  `rate` decimal(15,2) NOT NULL,
  `amount` decimal(17,2) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_boq_item_boq` (`boq_id`),
  KEY `idx_boq_item_material` (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `boq_revision` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `boq_id` int(11) NOT NULL,
  `revision` int(11) NOT NULL,
  `snapshot` longtext NOT NULL,
  `change_note` varchar(255) NOT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_boq_revision` (`boq_id`, `revision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `boq_approval` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `boq_id` int(11) NOT NULL,
  `revision` int(11) NOT NULL,
  `action` varchar(20) NOT NULL,
  `comment` text DEFAULT NULL,
  `actor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_boq_approval_boq` (`boq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
