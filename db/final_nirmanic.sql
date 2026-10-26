-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2026 at 10:13 AM
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
-- Table structure for table `boq`
--

CREATE TABLE `boq` (
  `id` int(11) NOT NULL,
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
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `boq`
--

INSERT INTO `boq` (`id`, `boq_no`, `project_id`, `title`, `status`, `revision`, `notes`, `rejection_note`, `created_by`, `approved_by`, `approved_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'BOQ-20261026-58DA2A', 3, 'Green Valley Residential Complex - BOQ', 'approved', 1, 'Estimated quantities and rates for the initial construction phase. Actual quantities must be verified against approved drawings and site measurements.', NULL, 1, 1, '2026-10-26 12:35:27', '2026-10-26 05:47:42', '2026-10-26 06:35:27', NULL),
(2, 'BOQ-20261026-17C14B', 3, 'Padma Riverside Bridge Approch Road- BOQ', 'draft', 1, 'Estimated quantities and rates for the initial construction phase. Actual quantities must be verified against approved drawings and site measurements.', NULL, 1, NULL, NULL, '2026-10-26 06:37:01', '2026-10-26 06:37:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `boq_approval`
--

CREATE TABLE `boq_approval` (
  `id` int(11) NOT NULL,
  `boq_id` int(11) NOT NULL,
  `revision` int(11) NOT NULL,
  `action` varchar(20) NOT NULL,
  `comment` text DEFAULT NULL,
  `actor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `boq_approval`
--

INSERT INTO `boq_approval` (`id`, `boq_id`, `revision`, `action`, `comment`, `actor_id`, `created_at`) VALUES
(1, 1, 1, 'submitted', '', 1, '2026-10-26 06:35:23'),
(2, 1, 1, 'approved', '', 1, '2026-10-26 06:35:27');

-- --------------------------------------------------------

--
-- Table structure for table `boq_item`
--

CREATE TABLE `boq_item` (
  `id` int(11) NOT NULL,
  `boq_id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `quantity` decimal(15,3) NOT NULL,
  `rate` decimal(15,2) NOT NULL,
  `amount` decimal(17,2) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `boq_item`
--

INSERT INTO `boq_item` (`id`, `boq_id`, `material_id`, `description`, `unit`, `quantity`, `rate`, `amount`, `sort_order`) VALUES
(1, 1, 7, '\"Electrical Copper Cable 2.5mm', 'Meter', 500.000, 85.00, 42500.00, 0),
(2, 1, 8, 'Modular Wall Switch', 'Piece', 100.000, 180.00, 18000.00, 1),
(3, 1, 9, 'PVC Plumbing Pipe 4 Inch', 'Meter', 100.000, 320.00, 32000.00, 2),
(4, 2, 6, 'First-Class Clay Brick', 'Piece', 1500.000, 14.00, 21000.00, 0),
(5, 2, 1, 'Cement & Binding Materials', 'Bag', 200.000, 450.00, 90000.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `boq_revision`
--

CREATE TABLE `boq_revision` (
  `id` int(11) NOT NULL,
  `boq_id` int(11) NOT NULL,
  `revision` int(11) NOT NULL,
  `snapshot` longtext NOT NULL,
  `change_note` varchar(255) NOT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Abdul Rahman', 'Rahman Developers Ltd.', '+8801712345001', 'info@rahmandevelopers.example', 'House 12, Road 7, Sector 4, Uttara, Dhaka', 10, 1, NULL, NULL, NULL),
(2, 'Mohammad Faisal', 'Skyline Properties Ltd.', '+8801712345002', 'contact@skylineproperties.example', 'House 25, Road 11, Block C, Gulshan, Dhaka', 4, 1, NULL, NULL, NULL),
(3, 'Kamal Hossain', 'National Infrastructure Development Ltd.', '+8801712345003', 'projects@nid.example', 'Plot 18, Sector 10, Mawa Road, Munshiganj', 9, 2, NULL, NULL, NULL);

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
(1, 'Engineering & Construction', 'Responsible for structural design, site execution, construction quality, and technical supervision.', NULL, NULL, NULL),
(2, 'Project Planning & Management', 'Responsible for project scheduling, budget monitoring, resource allocation, and progress tracking.', NULL, NULL, NULL),
(3, 'Procurement & Materials', 'Responsible for purchasing construction materials, supplier management, inventory coordination, and material delivery.', NULL, NULL, NULL);

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
(1, 'Project Engineer', 'Responsible for construction execution, technical supervision, and quality control.', NULL, NULL, NULL),
(2, 'Project Manager', 'Responsible for project planning, scheduling, budget monitoring, and team coordination.', NULL, NULL, NULL),
(3, 'Procurement Officer', 'Responsible for material purchasing, supplier coordination, and procurement documentation.', NULL, NULL, NULL);

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
(1, 1, 1, 'Md. Mahmudul Hasan', '+8801712345101', 'Uttara, Dhaka, Bangladesh', '19901234567890123', 'image/employee/412278766_face17.jpg', '55000', '2025-08-05', 'mahmudul.hasan@example.com', 'DEMO-DBBL-100001', '02 years', 1, NULL, NULL, NULL),
(2, 2, 2, 'Farhan Ahmed', '+8801712345102', 'Gulshan, Dhaka, Bangladesh', '1991123456789012', 'image/employee/293348377_face19.jpg', '85000', '2026-06-16', 'farhan.ahmed@example.com', 'DEMO-BRAC-100002', '01', 1, NULL, NULL, NULL),
(3, 3, 3, 'Tanvir Hasan', '+8801712345103', 'Narayanganj, Bangladesh', '19921234567890125', 'image/employee/133883772_face24.jpg', '40000', '2027-01-01', 'tanvir.hasan@example.com', 'DEMO-IBBL-100003', '04', 2, NULL, NULL, NULL);

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
(1, 'Cement & Binding Materials', 'Cement, lime, and other binding materials', NULL, NULL, NULL),
(2, 'Steel & Reinforcement', 'Rebar, steel rods, and structural steel', NULL, NULL, NULL),
(3, 'Aggregates & Masonry', 'Sand, bricks, stone chips, and aggregates', NULL, NULL, NULL),
(4, 'Electrical Materials', 'Cables, switches, conduits, and electrical accessories', NULL, NULL, NULL),
(5, 'Plumbing & Sanitary', 'Pipes, fittings, valves, and sanitary fixtures', NULL, NULL, NULL);

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
(1, 1, 1, 500, 220, 280, 0, 1, NULL, '2026-10-26 06:28:35', NULL),
(2, 2, 1, 100, 40, 60, 0, 1, NULL, '2026-10-26 06:28:35', NULL),
(3, 3, 1, 5, 0, 5, 0, 1, NULL, NULL, NULL),
(4, 4, 1, 100, 0, 100, 0, 1, NULL, NULL, NULL),
(5, 5, 1, 1000, 0, 1000, 0, 1, NULL, NULL, NULL),
(6, 6, 1, 0, 0, 0, 0, 3, NULL, '2026-10-26 05:49:40', NULL);

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
(1, 1, 1, '2025-03-12', '1', 'Concrete casting and masonry work', 'Cement and lime issued to the site team for foundation work and wall construction.', NULL, '2026-10-26 06:28:35', NULL);

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
(3, 1, 1, 220, 1, NULL, NULL, NULL),
(4, 1, 2, 40, 2, NULL, NULL, NULL);

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
(1, 'Cement & Binding Materials', 1, 1, 280, NULL, '2026-10-26 06:28:35', NULL),
(2, 'Ready-Mix Lime', 1, 2, 60, NULL, '2026-10-26 06:28:35', NULL),
(3, 'Deformed Steel Rod 16mm', 2, 3, 5, NULL, '2026-10-26 05:01:16', NULL),
(4, 'Structural Steel Angle', 2, 6, 100, NULL, '2026-10-26 05:01:16', NULL),
(5, 'Fine Construction Sand', 3, 4, 1000, NULL, '2026-10-26 05:02:07', NULL),
(6, 'First-Class Clay Brick', 3, 5, 0, NULL, '2026-10-26 05:49:40', NULL),
(7, '\"Electrical Copper Cable 2.5mm', 4, 6, NULL, NULL, NULL, NULL),
(8, 'Modular Wall Switch', 4, 5, NULL, NULL, NULL, NULL),
(9, 'PVC Plumbing Pipe 4 Inch', 5, 6, NULL, NULL, NULL, NULL),
(10, 'PVC Elbow Fitting 4 Inch', 5, 5, NULL, NULL, NULL, NULL);

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
(1, '0001', '2025-01-07', 1, 1, 5, NULL, NULL, NULL, NULL),
(2, '0002', '2025-03-13', 2, 1, 5, NULL, NULL, NULL, NULL),
(3, '0003', '2025-08-11', 3, 1, 5, NULL, NULL, NULL, NULL);

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
(1, 1, 1, 500, 1, 275000, 550, NULL, NULL, NULL),
(2, 1, 2, 100, 2, 3500, 35, NULL, NULL, NULL),
(3, 2, 3, 5, 3, 475000, 95000, NULL, NULL, NULL),
(4, 2, 4, 100, 6, 45000, 450, NULL, NULL, NULL),
(5, 3, 5, 1000, 4, 65000, 65, NULL, NULL, NULL),
(6, 3, 6, 10000, 5, 140000, 14, NULL, NULL, NULL);

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
(1, 1, 1, '2025-01-07', 1, 1, 1, 500, 0, 500, 'Purchase 0001', NULL, NULL, NULL),
(2, 2, 1, '2025-01-07', 1, 1, 1, 100, 0, 100, 'Purchase 0001', NULL, NULL, NULL),
(3, 3, 1, '2025-03-13', 1, 1, 2, 5, 0, 5, 'Purchase 0002', NULL, NULL, NULL),
(4, 4, 1, '2025-03-13', 1, 1, 2, 100, 0, 100, 'Purchase 0002', NULL, NULL, NULL),
(5, 5, 1, '2025-08-11', 1, 1, 3, 1000, 0, 1000, 'Purchase 0003', NULL, NULL, NULL),
(6, 6, 1, '2025-08-11', 1, 1, 3, 10000, 0, 10000, 'Purchase 0003', NULL, NULL, NULL),
(7, 1, 1, '2025-03-12', 2, 2, 1, 0, 220, 280, 'Issue #1', NULL, NULL, NULL),
(8, 2, 1, '2025-03-12', 2, 2, 1, 0, 40, 60, 'Issue #1', NULL, NULL, NULL),
(9, 6, 1, '2026-10-26', 1, 1, 4, 9999999999, 0, 9999999999, 'Purchase 0004', NULL, NULL, NULL),
(10, 6, 1, '2026-10-26', 2, 1, 4, 0, 9999999999, 0, 'Purchase #0004 reversed', NULL, NULL, NULL),
(11, 1, 1, '2025-03-12', 1, 2, 1, 220, 0, 500, 'Issue #1 reversed for edit', NULL, NULL, NULL),
(12, 2, 1, '2025-03-12', 1, 2, 1, 40, 0, 100, 'Issue #1 reversed for edit', NULL, NULL, NULL),
(13, 1, 1, '2025-03-12', 2, 2, 1, 0, 220, 280, 'Issue #1', NULL, NULL, NULL),
(14, 2, 1, '2025-03-12', 2, 2, 1, 0, 40, 60, 'Issue #1', NULL, NULL, NULL);

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
(1, 'Bag', 'bag', NULL, NULL, NULL),
(2, 'Kilogram', 'kg', NULL, NULL, NULL),
(3, 'Metric Ton', 'ton', NULL, NULL, NULL),
(4, 'Cubic Foot', 'cft', NULL, NULL, NULL),
(5, 'Piece', 'piece', NULL, NULL, NULL),
(6, 'Meter', 'm', NULL, NULL, NULL);

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
(1, 'PRJ-2026-001', 1, 1, 'Green Valley Residential Complex', 1, 'Uttara, Dhaka, Bangladesh', 'Construction of a 10-storey residential building with parking and modern facilities.', '32500000', 32, '2025-04-15', '2027-08-07', 3, NULL, NULL, NULL),
(2, 'PRJ-2026-002', 2, 2, 'Skyline Commercial Tower', 2, 'Gulshan, Dhaka, Bangladesh', 'Construction of a 15-storey commercial tower with office spaces and retail facilities.', '15000000', 18, '2025-01-16', '2028-10-02', 3, NULL, NULL, NULL),
(3, 'PRJ-2026-003', 3, 3, 'Padma Riverside Bridge Approach Road', 7, 'Mawa, Munshiganj, Bangladesh', 'Development of an approach road including drainage, pavement and road safety infrastructure.', '650000000', 0, '2026-10-26', '2029-01-16', 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_progress_images`
--

CREATE TABLE `project_progress_images` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_progress_images`
--

INSERT INTO `project_progress_images` (`id`, `project_id`, `image_path`, `caption`, `created_at`) VALUES
(4, 1, 'image/project_progress/fd438b043e98adf5b0069374b5585cbb.jpg', NULL, '2026-10-26 06:09:20'),
(5, 1, 'image/project_progress/098389428bcded7511b8896a65c8e6be.jpg', NULL, '2026-10-26 06:09:36'),
(6, 1, 'image/project_progress/da53db03e3ee4ec60b6789b414cbf0ad.jpg', NULL, '2026-10-26 06:09:43'),
(7, 1, 'image/project_progress/25d29b4f89f3bd58da30e86f81319f62.jpg', NULL, '2026-10-26 06:09:48');

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
(1, 'Abdul Karim', 'Dhaka Cement Traders', '+8801712345201', 'sales@dhakacement.example', 'Tongi Industrial Area, Gazipur, Bangladesh', NULL, NULL, NULL),
(2, 'Mohammad Hasan', 'Bangladesh Steel Supply', '+8801712345202', 'info@bdsteelsupply.example', 'Narayanganj, Bangladesh', NULL, NULL, NULL),
(3, 'Rafiqul Islam', 'Meghna Sand & Brick Suppliers', '+8801712345203', 'sales@meghnasand.example', 'Sonargaon, Narayanganj, Bangladesh', NULL, NULL, NULL),
(4, 'Sabbir Ahmed', 'PowerLine Electrical Supplies', '+8801712345204', 'contact@powerline.example', 'Nawabpur Road, Dhaka, Bangladesh', NULL, NULL, NULL),
(5, 'Imran Hossain', 'Reliable Plumbing Solutions', '+8801712345205', 'sales@reliableplumbing.example', 'Chawkbazar, Chattogram, Bangladesh', NULL, NULL, NULL);

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
(1, 'Mohammad Akibul Islam', NULL, 'akib34108@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1, '84991793005064152686', NULL, NULL, NULL, NULL),
(4, 'Majhar Pritam', NULL, 'pritam@gmail.com', 'fbce66f99c809283638f344ecb3d50674ea64189', 1, '34761792904239432859', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boq`
--
ALTER TABLE `boq`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_boq_no` (`boq_no`),
  ADD KEY `idx_boq_project` (`project_id`),
  ADD KEY `idx_boq_status` (`status`);

--
-- Indexes for table `boq_approval`
--
ALTER TABLE `boq_approval`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_boq_approval_boq` (`boq_id`);

--
-- Indexes for table `boq_item`
--
ALTER TABLE `boq_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_boq_item_boq` (`boq_id`),
  ADD KEY `idx_boq_item_material` (`material_id`);

--
-- Indexes for table `boq_revision`
--
ALTER TABLE `boq_revision`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_boq_revision` (`boq_id`,`revision`);

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
-- Indexes for table `project_progress_images`
--
ALTER TABLE `project_progress_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_project_progress_images_project` (`project_id`);

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
-- AUTO_INCREMENT for table `boq`
--
ALTER TABLE `boq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `boq_approval`
--
ALTER TABLE `boq_approval`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `boq_item`
--
ALTER TABLE `boq_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `boq_revision`
--
ALTER TABLE `boq_revision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material_category`
--
ALTER TABLE `material_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `material_list`
--
ALTER TABLE `material_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `material_purchase`
--
ALTER TABLE `material_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `material_purchase_item`
--
ALTER TABLE `material_purchase_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `material_transaction`
--
ALTER TABLE `material_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `material_unit`
--
ALTER TABLE `material_unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_progress_images`
--
ALTER TABLE `project_progress_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project_progress_images`
--
ALTER TABLE `project_progress_images`
  ADD CONSTRAINT `fk_project_progress_images_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
