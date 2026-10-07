-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2026 at 10:05 PM
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
  `name` varchar(255) DEFAULT NULL,
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

INSERT INTO `clients` (`id`, `name`, `company`, `phone`, `email`, `address`, `type`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'gfjtjyjty', '', '', '', '', 0, 0, NULL, NULL, NULL),
(2, 'Mohammad Akibul Islam', 'IsDB', '01533198825', 'akib34108@gmail.com', 'New Housing Society, Fulkoli, Rahattarpul, Chattogram', 1, 3, NULL, NULL, NULL);

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
(1, 'PRJ-2026-001', 1, 'Bashundhara Residential Complex', 1, 'Bashundhara, R/A, Dhaka', 'Construction of a modern 12 store residential complex with 96 apartments, basement parking, rooftop facilities, and essential utility services.', '18.90Cr', 15, '2025-02-02', '2028-11-05', 3, NULL, NULL, NULL),
(2, 'PRJ-2026-002', 2, 'Uttara Commercial Tower', 2, 'Uttara, Dhaka', 'Development of a 15 store commercial building including office spaces, retail areas, parking facilities, elevators, and modern fire safety systems.', '12.75Cr', 80, '2026-10-07', '2026-10-31', 1, NULL, NULL, NULL),
(3, 'PRJ-2026-003', 3, 'Chattogram Bay View Apartments', 1, 'Khulshi, Chattogram', 'Construction of a premium residential apartment complex with modern amenities, underground parking, landscaped areas, and utility infrastructure.', '9.80Cr', 25, '2026-10-29', '2027-03-19', 2, NULL, NULL, NULL),
(4, 'PRJ-2026-004', 4, 'Cox\'s Bazar Hotel Project', 6, 'Cox\'s Bazar', 'Construction of a modern beachfront hotel with guest rooms, restaurants, conference facilities, swimming pool, parking, and recreational areas.', '21.03Cr', 90, '2024-05-21', '2026-11-23', 3, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
