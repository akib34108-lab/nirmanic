-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2026 at 09:46 PM
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
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project_code` varchar(255) DEFAULT NULL,
  `client_id` int(16) DEFAULT NULL,
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

INSERT INTO `projects` (`id`, `project_code`, `client_id`, `name`, `type`, `location`, `description`, `budget`, `progress`, `start_date`, `expected_completion_date`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'PRJ-2026-001', 1, 'Bashundhara Residential Complex', 1, 'Bashundhara, R/A, Dhaka', 'Construction of a modern 12 store residential complex with 96 apartments, basement parking, rooftop facilities, and essential utility services.', '18.90Cr', 15, '2025-02-02', '2028-11-05', 3, NULL, NULL, NULL);

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
(1, 'Mohammad Akibul Islam', NULL, 'akib34108@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1, '29911791830061207691', NULL, NULL, NULL, NULL),
(2, 'Riyad Uddin', NULL, 'riad@gmail.com', '6bb0e3b82a69a2bdf7139d17eeb5f79818b92a4d', 1, '65441791830217721624', NULL, NULL, NULL, NULL);

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
-- Indexes for table `projects`
--
ALTER TABLE `projects`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
