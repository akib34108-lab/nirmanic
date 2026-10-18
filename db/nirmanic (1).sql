-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2026 at 09:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nirmanic`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `type` int(10) DEFAULT NULL COMMENT '1=individual,2=property_developer, 3=corporate,4=industrial,5=government,6=hospitality,7=educational, 8=healthcare,9=ngo, 10=real_estate_company',
  `status` int(10) DEFAULT NULL COMMENT '1=active, 2=pending, 3=prospect, 4=inactive, 5=blocked',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `client_name`, `company`, `phone`, `email`, `address`, `type`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Arif Hossain', 'Bashundhara Group', '+880 1712-458921', 'arif.hossain@example.com', 'Bashundhara R/A, Dhaka', 3, 1, NULL, NULL, NULL),
(2, 'Fahim Chowdhury', 'Bay View Properties Ltd.', '+880 1611-782456', 'fahim.chowdhury@example.com', 'Khulshi, Chattogram', 2, 1, NULL, NULL, NULL),
(3, 'Saif Rahman', 'Uttara Commercial Tower', '+880 1819-624735', 'saif.rahman@example.com', 'Sector 7, Uttara, Dhaka', 4, 1, NULL, NULL, NULL),
(4, 'Shakil Ahmed', 'Ocean View Resorts Ltd.', '+880 1716-924583', 'shakil.ahmed@example.com', 'Hotel-Motel Zone, Cox\'s Bazar', 10, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `department_name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Software Development', ' Collaborates with team members to deliver reliable, user-friendly web solutions and troubleshoots technical issues as needed.', NULL, NULL, NULL),
(2, 'fgnfgn', 'fgnfgf', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `id` int(11) NOT NULL,
  `designation_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `designation_name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Full Stack Web Developer', 'Responsible for designing, developing, testing, and maintaining responsive web applications. Develops front-end interfaces and back-end functionality, manages databases, integrates APIs, and ensures website performance, security, and scalability.', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `designation_id` int(10) DEFAULT NULL,
  `department_id` int(10) DEFAULT NULL,
  `employee_name` varchar(255) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `nid` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `basic_salary` varchar(255) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `bank_account` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `status` int(4) DEFAULT NULL COMMENT '1=active, 2=pending, 3=propective, 4=inactive, 5=blocked',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `designation_id`, `department_id`, `employee_name`, `phone`, `address`, `nid`, `image`, `basic_salary`, `joining_date`, `email`, `bank_account`, `experience`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 1, 1, 'Mohammad Akibul Islam', '01879228978', 'GPO circle, New market, Chattogram', '12957201295720', 'image/employee/1944480036_ChatGPT Image Sep 9, 2026, 10_40_14 AM.png', '12,00,000', '2026-10-13', 'akib34108@gmail.com', '12129595720', '2', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_attendance`
--

CREATE TABLE `employee_attendance` (
  `id` int(11) NOT NULL,
  `employee_id` int(20) DEFAULT NULL,
  `project_id` int(20) DEFAULT NULL,
  `attendance_date` date DEFAULT NULL,
  `check_in` time DEFAULT NULL,
  `check_out` time DEFAULT NULL,
  `working_hours` decimal(10,0) DEFAULT NULL,
  `late_min` int(11) DEFAULT NULL,
  `early_leave_min` int(11) DEFAULT NULL,
  `overtime_hour` decimal(10,0) DEFAULT NULL,
  `status` int(20) DEFAULT NULL COMMENT '1=present, 2=absent, 3=late, 4=leave, 5=halfday, 6=holiday',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `material_category`
--

CREATE TABLE `material_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_category`
--

INSERT INTO `material_category` (`id`, `category_name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 'Cement', 'Cement used for concrete, mortar, and construction work.', NULL, NULL, NULL),
(5, 'Masonry', 'Bricks and masonry materials used for walls and partitions.', NULL, NULL, NULL),
(6, 'Steel', 'Steel rods and reinforcement materials for structural strength.', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `material_inventory`
--

CREATE TABLE `material_inventory` (
  `id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `quantity_available` decimal(10,0) DEFAULT NULL,
  `quantity_used` decimal(10,0) DEFAULT NULL,
  `current_stock` decimal(10,0) DEFAULT NULL,
  `minimum_stock` decimal(10,0) DEFAULT NULL,
  `status` int(4) DEFAULT NULL COMMENT '1=in stock, 2=low stock, 3=out of stock',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_inventory`
--

INSERT INTO `material_inventory` (`id`, `material_id`, `project_id`, `quantity_available`, `quantity_used`, `current_stock`, `minimum_stock`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 4, 1, 2000, 1350, 650, 0, 1, NULL, '2026-10-18 07:11:03', NULL),
(6, 6, 1, 500, 0, 500, 0, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `material_issue`
--

CREATE TABLE `material_issue` (
  `id` int(11) NOT NULL,
  `issue_no` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `issue_to` varchar(255) DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_issue`
--

INSERT INTO `material_issue` (`id`, `issue_no`, `project_id`, `issue_date`, `issue_to`, `purpose`, `remark`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, '2026-10-18', '2', 'sgdf', 's', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `material_issue_item`
--

CREATE TABLE `material_issue_item` (
  `id` int(11) NOT NULL,
  `issue_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL,
  `quantity` decimal(11,0) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_issue_item`
--

INSERT INTO `material_issue_item` (`id`, `issue_id`, `material_id`, `quantity`, `unit_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 4, 1350, 4, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `material_list`
--

CREATE TABLE `material_list` (
  `id` int(11) NOT NULL,
  `material_name` varchar(255) DEFAULT NULL,
  `category_id` int(20) DEFAULT NULL,
  `unit_id` int(20) DEFAULT NULL,
  `current_stock` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_list`
--

INSERT INTO `material_list` (`id`, `material_name`, `category_id`, `unit_id`, `current_stock`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 'Bricks', 5, 4, 650, NULL, '2026-10-18 07:11:03', NULL),
(5, 'Rod', 6, 5, NULL, NULL, NULL, NULL),
(6, 'Cement', 4, 4, 500, NULL, '2026-10-18 06:59:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `material_purchase`
--

CREATE TABLE `material_purchase` (
  `id` int(11) NOT NULL,
  `purchase_no` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `supplier_id` int(20) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `status` int(4) DEFAULT NULL COMMENT '1=draft, 2=pending, 3=ordered, 4=partially_received, 5=received, 6=cancelled',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_purchase`
--

INSERT INTO `material_purchase` (`id`, `purchase_no`, `purchase_date`, `supplier_id`, `project_id`, `status`, `notes`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '0001', '2026-10-19', 2, 1, 5, NULL, NULL, NULL, NULL),
(2, '0002', '2026-10-18', 4, 1, 5, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `material_purchase_item`
--

CREATE TABLE `material_purchase_item` (
  `id` int(11) NOT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,0) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,0) DEFAULT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_purchase_item`
--

INSERT INTO `material_purchase_item` (`id`, `purchase_id`, `material_id`, `quantity`, `unit_id`, `total_price`, `unit_price`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 4, 1000, 4, 13000, 13, NULL, NULL, NULL),
(2, 1, 6, 500, 4, 20000, 40, NULL, NULL, NULL),
(3, 2, 4, 1000, 4, 12000, 12, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `material_transaction`
--

CREATE TABLE `material_transaction` (
  `id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `transaction_date` date DEFAULT NULL,
  `transaction_type` int(11) DEFAULT NULL,
  `ref_type` int(11) DEFAULT NULL,
  `ref_id` int(11) DEFAULT NULL,
  `quantity_in` decimal(10,0) DEFAULT NULL,
  `quantity_out` decimal(10,0) DEFAULT NULL,
  `balance_after` decimal(10,0) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_transaction`
--

INSERT INTO `material_transaction` (`id`, `material_id`, `project_id`, `transaction_date`, `transaction_type`, `ref_type`, `ref_id`, `quantity_in`, `quantity_out`, `balance_after`, `notes`, `created_at`, `updated_at`, `deleted_at`) VALUES
(6, 4, 1, '2026-10-19', 1, 1, 1, 1000, 0, 1000, 'Backfilled received purchase #0001', NULL, NULL, NULL),
(7, 6, 1, '2026-10-19', 1, 1, 1, 500, 0, 500, 'Backfilled received purchase #0001', NULL, NULL, NULL),
(8, 4, 1, '2026-10-18', 1, 1, 2, 1000, 0, 2000, 'Purchase 0002', NULL, NULL, NULL),
(10, 4, 1, '2026-10-18', 2, 2, 1, 0, 1350, 650, 'Issue #1', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `material_unit`
--

CREATE TABLE `material_unit` (
  `id` int(11) NOT NULL,
  `unit_name` varchar(255) DEFAULT NULL,
  `short_name` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `update_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_unit`
--

INSERT INTO `material_unit` (`id`, `unit_name`, `short_name`, `deleted_at`, `created_at`, `update_at`) VALUES
(4, 'Bag', 'B', NULL, NULL, NULL),
(5, 'Ton', 'T', NULL, NULL, NULL),
(6, 'Piece', 'P', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project_code` varchar(255) DEFAULT NULL,
  `client_id` int(16) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` int(16) DEFAULT NULL COMMENT '1=residential, 2=commercial, 3=industrial, 4=infrastructure, 5=institutional, 6=hospitality, 7=government, 8=renovation, 9=other',
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `budget` varchar(255) DEFAULT NULL,
  `progress` int(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `expected_completion_date` date DEFAULT NULL,
  `status` int(16) DEFAULT NULL COMMENT '1=planning, 2=upcoming, 3=ongoing, 4=on_hold, 5=delayed,6=completed, 7=cancelled',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project_code`, `client_id`, `employee_id`, `name`, `type`, `location`, `description`, `budget`, `progress`, `start_date`, `expected_completion_date`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'PRJ-2026-001', 1, 2, 'Bashundhara Residential Complex', 1, 'Bashundhara, R/A, Dhaka', 'Construction of a modern 12 store residential complex with 96 apartments, basement parking, rooftop facilities, and essential utility services.', '18.90Cr', 15, '2025-02-02', '2028-11-05', 3, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  `deleted_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `supplier_name`, `company_name`, `phone`, `email`, `address`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 'Mahmud Hasan', 'Shah Cement Industries Ltd.', '+880 1712-456781', 'cement.supplier@example.com', 'Dhaka, Bangladesh', NULL, NULL, NULL),
(3, 'Tanvir Ahmed', 'Bangladesh Steel Re-Rolling Mills Ltd. (BSRM)', '+880 1819-563427', 'steel.supplier@example.com', 'Chattogram, Bangladesh', NULL, NULL, NULL),
(4, 'Rakib Hossain', 'Karim Bricks & Blocks', '+880 1912-784563', 'bricks.supplier@example.com', 'Gazipur, Bangladesh', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `remember_token` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `contact_no`, `email`, `password`, `status`, `remember_token`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Mohammad Akibul Islam', NULL, 'akib34108@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1, '34071792303524707567', NULL, NULL, NULL, NULL),
(2, 'Riyad Uddin', NULL, 'riad@gmail.com', '6bb0e3b82a69a2bdf7139d17eeb5f79818b92a4d', 1, '65441791830217721624', NULL, NULL, NULL, NULL),
(3, 'segsg', NULL, 'Aki@gmail.com', '09cad82f43c6fcf04357b175cdf4763a3daf9a89', 1, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_category`
--
ALTER TABLE `material_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_inventory`
--
ALTER TABLE `material_inventory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `material_inventory_material_project_unique` (`material_id`,`project_id`);

--
-- Indexes for table `material_issue`
--
ALTER TABLE `material_issue`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_issue_item`
--
ALTER TABLE `material_issue_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_list`
--
ALTER TABLE `material_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_purchase`
--
ALTER TABLE `material_purchase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_purchase_item`
--
ALTER TABLE `material_purchase_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_transaction`
--
ALTER TABLE `material_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_unit`
--
ALTER TABLE `material_unit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material_category`
--
ALTER TABLE `material_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `material_inventory`
--
ALTER TABLE `material_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `material_issue`
--
ALTER TABLE `material_issue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `material_issue_item`
--
ALTER TABLE `material_issue_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `material_list`
--
ALTER TABLE `material_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `material_purchase`
--
ALTER TABLE `material_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `material_purchase_item`
--
ALTER TABLE `material_purchase_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `material_transaction`
--
ALTER TABLE `material_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `material_unit`
--
ALTER TABLE `material_unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
