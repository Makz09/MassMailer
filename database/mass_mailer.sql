-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2026 at 11:13 AM
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
-- Database: `mass_mailer`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `patient_id` bigint(20) UNSIGNED DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Scheduled',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `title`, `type`, `patient_id`, `start_time`, `end_time`, `description`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Cat Adoption Day', 'event', 33, '2026-05-10 14:00:00', '2026-05-10 15:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(2, 'Clinic Open House', 'event', 73, '2026-05-21 08:00:00', '2026-05-21 09:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(3, 'Cat Adoption Day', 'event', 49, '2026-05-10 15:00:00', '2026-05-10 16:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(4, 'Follow-up Consultation', 'checkup', 86, '2026-05-19 12:00:00', '2026-05-19 13:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(5, 'Annual Vaccination', 'checkup', 20, '2026-05-19 12:00:00', '2026-05-19 13:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(6, 'Lion Cut', 'grooming', 89, '2026-05-04 16:00:00', '2026-05-04 17:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(7, 'Nutrition Workshop', 'event', 57, '2026-05-28 10:00:00', '2026-05-28 11:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(8, 'Spa Day', 'grooming', 90, '2026-05-02 14:00:00', '2026-05-02 15:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(9, 'Dental Surgery', 'surgery', 98, '2026-05-27 12:00:00', '2026-05-27 13:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(10, 'Lion Cut', 'grooming', 50, '2026-05-22 09:00:00', '2026-05-22 10:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(11, 'Clinic Open House', 'event', 50, '2026-05-04 15:00:00', '2026-05-04 16:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(12, 'Spa Day', 'grooming', 50, '2026-05-02 08:00:00', '2026-05-02 09:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(13, 'Cat Adoption Day', 'event', 23, '2026-05-02 09:00:00', '2026-05-02 10:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(14, 'Senior Wellness Check', 'checkup', 56, '2026-05-17 09:00:00', '2026-05-17 10:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(15, 'Nutrition Workshop', 'event', 34, '2026-05-06 09:00:00', '2026-05-06 10:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(16, 'Neutering', 'surgery', 23, '2026-05-10 14:00:00', '2026-05-10 15:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(17, 'Nutrition Workshop', 'event', 39, '2026-05-19 15:00:00', '2026-05-19 16:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(18, 'Nutrition Workshop', 'event', 10, '2026-05-08 11:00:00', '2026-05-08 12:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(19, 'Annual Vaccination', 'checkup', 64, '2026-05-25 08:00:00', '2026-05-25 09:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(20, 'Neutering', 'surgery', 74, '2026-05-14 11:00:00', '2026-05-14 12:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(21, 'Senior Wellness Check', 'checkup', 91, '2026-05-18 12:00:00', '2026-05-18 13:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(22, 'Clinic Open House', 'event', 24, '2026-05-03 16:00:00', '2026-05-03 17:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(23, 'Nail Trim & Ear Cleaning', 'grooming', 4, '2026-05-06 16:00:00', '2026-05-06 17:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(24, 'Neutering', 'surgery', 22, '2026-05-07 13:00:00', '2026-05-07 14:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(25, 'Follow-up Consultation', 'checkup', 90, '2026-05-03 16:00:00', '2026-05-03 17:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(26, 'Neutering', 'surgery', 27, '2026-05-04 13:00:00', '2026-05-04 14:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(27, 'Tumor Removal', 'surgery', 103, '2026-05-25 14:00:00', '2026-05-25 15:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(28, 'Lion Cut', 'grooming', 49, '2026-05-18 15:00:00', '2026-05-18 16:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(29, 'Cat Adoption Day', 'event', 88, '2026-05-01 08:00:00', '2026-05-01 09:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(30, 'Clinic Open House', 'event', 82, '2026-05-21 10:00:00', '2026-05-21 11:00:00', 'Automatically generated demo appointment.', 'Scheduled', '2026-05-02 08:35:29', '2026-05-02 08:35:29', NULL),
(31, 'Test 1', 'Sending Birthday Email', 103, '2026-05-04 12:00:00', NULL, NULL, 'Scheduled', '2026-05-02 08:47:33', '2026-05-02 08:47:33', NULL),
(32, 'Test 2', 'Test', 4, '2026-05-03 00:00:00', '2026-05-03 00:54:00', 'Test Description', 'Scheduled', '2026-05-02 08:54:52', '2026-05-02 08:54:52', NULL),
(33, 'Test', 'Test', 4, '2026-05-03 02:00:00', '2026-05-03 03:09:00', 'Test', 'Scheduled', '2026-05-02 09:09:55', '2026-05-02 09:09:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('mass-mailer-cache-admin@catdesk.com|127.0.0.1', 'i:2;', 1777632233),
('mass-mailer-cache-admin@catdesk.com|127.0.0.1:timer', 'i:1777632233;', 1777632233),
('mass-mailer-cache-illuminate:queue:restart', 'i:1777738729;', 2093098729);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'Email',
  `status` varchar(255) NOT NULL DEFAULT 'Draft',
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  `total_recipients` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `template_id` bigint(20) UNSIGNED DEFAULT NULL,
  `segment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `name`, `type`, `status`, `scheduled_at`, `sent_at`, `total_recipients`, `created_at`, `updated_at`, `deleted_at`, `template_id`, `segment_id`, `user_id`) VALUES
(3, 'Test', 'Email (Queued SMTP)', 'Completed', '2026-05-02 07:53:37', '2026-05-02 07:53:37', 11, '2026-05-02 07:53:37', '2026-05-02 20:41:43', NULL, 4, 4, 1),
(4, 'Test 2', 'Email (Queued SMTP)', 'Completed', '2026-05-02 08:07:55', '2026-05-02 08:07:55', 4, '2026-05-02 08:07:55', '2026-05-02 20:03:42', NULL, 3, 11, 1),
(5, 'Test 3', 'Email (Queued SMTP)', 'Completed', '2026-05-02 08:16:35', '2026-05-02 08:16:35', 4, '2026-05-02 08:16:35', '2026-05-02 20:03:42', NULL, 2, 12, 1),
(6, 'Test 4', 'Email (Queued SMTP)', 'Completed', '2026-05-02 08:20:31', '2026-05-02 08:20:31', 4, '2026-05-02 08:20:31', '2026-05-02 20:03:42', NULL, 1, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `clinic_settings`
--

CREATE TABLE `clinic_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'The Cat Clinic',
  `email` varchar(255) NOT NULL DEFAULT 'hello@catclinic.ph',
  `phone` varchar(255) NOT NULL DEFAULT '+63 917 123 4567',
  `address` text DEFAULT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `sender_name` varchar(255) NOT NULL DEFAULT 'The Cat Clinic Care Team',
  `reply_to_email` varchar(255) NOT NULL DEFAULT 'support@catclinic.ph',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clinic_settings`
--

INSERT INTO `clinic_settings` (`id`, `name`, `email`, `phone`, `address`, `logo_path`, `sender_name`, `reply_to_email`, `created_at`, `updated_at`) VALUES
(1, 'The Cat Clinic', 'hello@catclinic.ph', '09697662985', 'Quezon City, Philippines', '/images/clinic_logo_1777717234.png', 'The Feline Care Team', 'imbroke058@gmail.com', '2026-05-01 03:54:47', '2026-05-02 07:43:44');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_01_103229_create_patients_table', 1),
(5, '2026_05_01_103239_create_campaigns_table', 1),
(6, '2026_05_01_103249_create_templates_table', 1),
(7, '2026_05_01_103259_create_appointments_table', 1),
(8, '2026_05_01_114902_add_soft_deletes_to_core_tables', 2),
(9, '2026_05_01_115429_create_clinic_settings_table', 3),
(10, '2026_05_02_034649_add_crm_fields_to_patients_table', 4),
(11, '2026_05_02_040031_create_segments_table', 5),
(13, '2026_05_02_041739_add_role_to_users_table', 6),
(14, '2026_05_02_043855_add_phone_and_avatar_to_users_table', 7),
(15, '2026_05_02_044258_add_soft_deletes_to_users_table', 8),
(16, '2026_05_02_045431_add_last_active_at_to_users_table', 9),
(17, '2026_05_02_063147_remove_owner_name_from_patients_table', 10),
(18, '2026_05_02_064011_rename_contact_owner_to_assigned_veterinarian_in_patients_table', 11),
(19, '2026_05_02_073728_add_vitals_to_patients_table', 12),
(20, '2026_05_02_105922_add_date_created_to_patients_table', 13),
(21, '2026_05_02_154826_update_active_templates_to_live', 14),
(22, '2026_05_03_035359_add_template_id_to_campaigns_table', 15),
(23, '2026_05_03_040057_add_segment_and_staff_to_campaigns_table', 16),
(24, '2026_05_03_062640_remove_target_audience_from_campaigns_table', 17);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `age_years` int(11) DEFAULT NULL,
  `weight_kg` decimal(8,2) DEFAULT NULL,
  `owner_first_name` varchar(255) DEFAULT NULL,
  `owner_last_name` varchar(255) DEFAULT NULL,
  `owner_email` varchar(255) NOT NULL,
  `owner_phone` varchar(255) DEFAULT NULL,
  `assigned_veterinarian` varchar(255) DEFAULT NULL,
  `medical_history` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`medical_history`)),
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `date_created` date DEFAULT NULL,
  `last_visit_at` timestamp NULL DEFAULT NULL,
  `last_vaccination_at` date DEFAULT NULL,
  `first_visit_at` timestamp NULL DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `health_score` int(11) NOT NULL DEFAULT 100,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name`, `breed`, `age_years`, `weight_kg`, `owner_first_name`, `owner_last_name`, `owner_email`, `owner_phone`, `assigned_veterinarian`, `medical_history`, `status`, `date_created`, `last_visit_at`, `last_vaccination_at`, `first_visit_at`, `branch`, `health_score`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Luna', 'Domestic Short Hair', NULL, NULL, NULL, NULL, 'elena.j@example.com', NULL, NULL, '[\"Diabetes\"]', 'Critical', '2026-05-01', '2026-04-29 02:41:57', NULL, NULL, NULL, 45, '2026-05-01 02:41:57', '2026-05-01 23:53:55', '2026-05-01 23:53:55'),
(2, 'Oliver', 'Maine Coon', NULL, NULL, NULL, NULL, 'm.reed@vetmail.org', NULL, NULL, '[\"Asthma\"]', 'Recovering', '2026-05-01', '2026-04-21 02:41:57', NULL, NULL, NULL, 82, '2026-05-01 02:41:57', '2026-05-01 23:54:03', '2026-05-01 23:54:03'),
(3, 'sample 1', 'Sample 2', NULL, NULL, NULL, NULL, 'portxmafia@gmail.com', NULL, NULL, NULL, 'Active', '2026-05-01', NULL, NULL, NULL, NULL, 100, '2026-05-01 04:03:30', '2026-05-01 04:03:43', '2026-05-01 04:03:43'),
(4, 'Coco', 'Ragdoll', 10, 6.60, 'Aric', 'Terry', 'kendra.hudson@example.org', '+1-445-789-1180', 'Dr. Maria Garcia', '\"Eum magni nostrum quos ipsa id expedita voluptas. Et incidunt molestiae ut nisi quia tempora ratione deleniti. Fugit culpa officia rerum sit repellat ad laudantium. Nam officiis animi quidem quia non mollitia dolorem.\"', 'Active', '2026-05-02', '2026-04-03 15:33:32', '2026-02-04', '2024-05-25 13:48:32', 'Cebu Main', 50, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(5, 'Lily', 'Sphynx', 8, 4.89, 'Lizzie', 'Baumbach', 'ndietrich@example.net', '1-661-390-3521', 'Dr. Michael Chen', '\"Impedit sed eveniet sed quasi. Aut hic libero aliquid praesentium vitae numquam distinctio. Rerum itaque tenetur corrupti delectus quos.\"', 'Critical', '2026-05-02', '2025-11-02 03:53:48', '2026-01-02', '2023-10-25 09:59:40', 'Quezon City', 48, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(6, 'Bella', 'Bengal', 6, 6.90, 'Kenneth', 'Hayes', 'albina46@example.net', '361.769.9840', 'Dr. Sarah Tan', '\"Molestias laborum dolores tempora praesentium excepturi. Error sed doloribus tempore minus ipsum. Accusamus mollitia a non omnis aut consectetur amet. Voluptatem maiores dolorem deserunt cumque. Ea natus quis officia distinctio odit quibusdam accusantium ratione.\"', 'Active', '2026-05-02', '2025-11-06 08:56:36', '2025-10-27', '2024-02-13 02:34:37', 'Quezon City', 61, '2026-05-01 23:38:19', '2026-05-01 23:44:52', NULL),
(7, 'Bella', 'Maine Coon', 11, 4.25, 'Theodore', 'Runolfsson', 'fanny.strosin@example.net', '1-314-621-0073', 'Dr. James Wilson', '\"Porro dicta earum enim ipsa. Est rerum iure ex in labore unde. Alias et et impedit culpa.\"', 'Active', '2026-05-02', '2025-06-28 21:52:16', '2026-04-18', '2023-05-24 21:11:43', 'Downtown', 72, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(8, 'Max', 'Burmese', 8, 5.77, 'Chesley', 'Kuhlman', 'marquardt.alva@example.com', '919-924-5441', 'Dr. Sarah Tan', '\"Nihil fuga corrupti exercitationem est est nostrum totam. Ipsum tempora numquam qui. Debitis quidem exercitationem magni. Sit officia omnis aperiam cum inventore impedit natus.\"', 'Active', '2026-05-02', '2025-12-15 13:20:08', '2025-09-13', '2024-10-22 05:46:04', 'BGC', 48, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(9, 'Nala', 'Birman', 17, 2.70, 'Katherine', 'Herzog', 'ramon00@example.org', '1-720-744-4723', 'Dr. Sarah Tan', '\"Esse eveniet iusto corporis omnis nihil quo. Nihil odit nisi quia ab. Aut laudantium qui earum reiciendis perferendis debitis omnis maxime.\"', 'Inactive', '2026-05-02', '2025-09-28 01:07:58', '2026-04-17', '2025-01-06 05:54:56', 'North Side', 70, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(10, 'Jasper', 'Sphynx', 1, 6.37, 'Aliyah', 'Langworth', 'shill@example.net', '(828) 920-4455', 'Dr. Sarah Tan', '\"Et ut ea dolorum quis. Consequatur sed suscipit aut nihil ullam atque eaque. Aut alias cum corporis eius magnam. Aut delectus nostrum tempore cumque assumenda.\"', 'Inactive', '2026-05-02', '2026-02-14 21:45:35', '2025-09-03', '2024-02-09 08:52:41', 'Cebu Main', 33, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(11, 'Nala', 'Siamese', 18, 5.88, 'Juliet', 'Bergnaum', 'abechtelar@example.com', '424-440-1770', 'Dr. Maria Garcia', '\"Error qui voluptates laboriosam debitis impedit quo nihil. Non voluptas quas quisquam autem. Quidem illo quidem iure aut dicta. Molestias veniam aut aliquid non iste quia iste.\"', 'Critical', '2026-05-02', '2025-07-05 06:09:06', '2025-07-06', '2024-02-15 01:28:51', 'Quezon City', 38, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(12, 'Max', 'Domestic Longhair', 10, 6.93, 'Alford', 'Feil', 'jessica16@example.org', '+1 (669) 406-2627', 'Dr. James Wilson', '\"Aspernatur et deleniti sed quis voluptatem. Reiciendis officiis iste fuga numquam. Deleniti reprehenderit aut voluptatem eius doloribus sunt architecto atque.\"', 'Inactive', '2026-05-02', '2025-12-09 09:18:13', '2026-01-05', '2024-05-26 14:06:44', 'North Side', 56, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(13, 'Bella', 'Domestic Longhair', 8, 5.82, 'Cecelia', 'Ernser', 'lenny.auer@example.org', '(248) 776-1273', 'Dr. Maria Garcia', '\"Maxime blanditiis dolorem fugit quisquam mollitia. Quis aliquid sequi eum maxime similique impedit. Et ut repellendus et est tenetur. Inventore labore cum minima veritatis est.\"', 'Inactive', '2026-05-02', '2025-11-24 20:19:19', '2025-11-21', '2024-05-16 20:08:41', 'Quezon City', 82, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(14, 'Lucy', 'Sphynx', 3, 5.69, 'Keon', 'Kuhic', 'dabbott@example.net', '+1-469-548-0909', 'Dr. Maria Garcia', '\"Atque sint recusandae illum temporibus sunt ullam ut. Magnam sed quae nemo dicta commodi porro. Aut hic deserunt optio reiciendis. Dolor dolorum libero ipsam sapiente.\"', 'Active', '2026-05-02', '2025-08-08 11:43:06', '2025-09-14', '2024-04-11 12:43:05', 'Cebu Main', 83, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(15, 'Max', 'Domestic Shorthair', 15, 4.50, 'Hassan', 'Skiles', 'robert.wyman@example.com', '+1 (773) 827-8221', 'Dr. Michael Chen', '\"Autem iste aut quidem voluptate sunt. Quis est aut dignissimos dolor molestiae. Aspernatur voluptatem est animi quae quod quaerat dolore.\"', 'Active', '2026-05-02', '2025-11-04 13:23:55', '2025-07-15', '2024-08-22 06:52:59', 'North Side', 87, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(16, 'Leo', 'Ragdoll', 6, 7.30, 'Gerald', 'Mertz', 'ferry.esther@example.com', '+17407798991', 'Dr. Maria Garcia', '\"Dolores aut odit esse consequatur est. Modi quaerat nesciunt perferendis culpa voluptatem ad. Quibusdam vel voluptatem officia odit necessitatibus. Et doloremque rem similique. Alias earum temporibus harum rerum alias.\"', 'Active', '2026-05-02', '2025-11-19 16:24:02', '2025-10-12', '2024-05-29 20:16:31', 'Downtown', 30, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(17, 'Simba', 'Burmese', 10, 4.17, 'Ezekiel', 'Moore', 'heidenreich.creola@example.net', '1-978-816-4182', 'Dr. Maria Garcia', '\"Quibusdam earum ratione repellat suscipit dolorem. Nam dolor et tenetur dolorem unde. Consequatur hic ut corporis. Unde ratione aspernatur libero deserunt ut.\"', 'Active', '2026-05-02', '2026-04-12 05:19:14', '2025-07-07', '2024-08-12 21:20:18', 'North Side', 58, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(18, 'Max', 'Sphynx', 4, 6.87, 'Elyse', 'Volkman', 'stamm.eunice@example.net', '+1.530.290.9865', 'Dr. Sarah Tan', '\"Ipsum dicta laudantium at vitae sapiente eum temporibus. Similique beatae molestiae asperiores autem. Aut deleniti voluptates sint asperiores. Ut et veniam necessitatibus nisi qui inventore. Nesciunt enim fuga et occaecati.\"', 'Critical', '2026-05-02', '2025-06-08 11:30:09', '2026-05-01', '2025-02-23 01:33:50', 'Quezon City', 33, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(19, 'Max', 'Abyssinian', 12, 6.40, 'Emmalee', 'Ernser', 'savanna90@example.org', '(272) 693-7472', 'Dr. Michael Chen', '\"Ratione eum consequatur sit iure laudantium ipsum. Voluptates repellendus similique sit ut quia aut id. Sapiente nesciunt nisi omnis dolor sit consectetur dolorum.\"', 'Active', '2026-05-02', '2025-09-29 00:39:40', '2026-04-28', '2025-02-26 12:03:35', 'Quezon City', 89, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(20, 'Max', 'Persian', 4, 6.87, 'Larissa', 'Stroman', 'vito.ebert@example.com', '+13259644577', 'Dr. James Wilson', '\"Tenetur provident fugit necessitatibus. Consequatur enim dolore aliquid quia optio quis. Vero ullam repellendus autem nam sunt doloribus facere autem. Hic sit consectetur omnis qui. Ipsam voluptas voluptatem repellat voluptas eveniet.\"', 'Critical', '2026-05-02', '2025-09-14 17:25:57', '2025-07-08', '2024-09-02 16:42:41', 'Quezon City', 35, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(21, 'Misty', 'Siamese', 10, 6.22, 'Wilfred', 'Bernier', 'qspinka@example.org', '1-458-640-3991', 'Dr. James Wilson', '\"Eum repudiandae rem eos praesentium sint dolorem unde tempora. Modi dolor sit aut excepturi voluptatem. Qui iure officiis cumque labore.\"', 'Inactive', '2026-05-02', '2025-05-04 05:41:09', '2025-08-25', '2024-07-04 11:16:47', 'BGC', 44, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(22, 'Luna', 'Birman', 8, 2.15, 'Susan', 'Abshire', 'abbigail02@example.org', '1-816-923-2005', 'Dr. Maria Garcia', '\"Id voluptatum vel nostrum non et incidunt qui at. Possimus asperiores dignissimos autem est ea qui consequatur. Non possimus minus sint et amet eius harum.\"', 'Inactive', '2026-05-02', '2025-11-13 03:02:12', '2025-07-25', '2025-02-28 21:59:17', 'BGC', 98, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(23, 'Leo', 'Ragdoll', 3, 4.90, 'Rebekah', 'Lemke', 'obartoletti@example.org', '484.226.9880', 'Dr. James Wilson', '\"Cumque mollitia dolores quam eveniet est. Dolorum cum quis aut qui qui sit eum. Assumenda consequatur sit ipsam atque voluptas.\"', 'Active', '2026-05-02', '2026-01-24 03:47:38', '2025-11-24', '2024-09-27 20:57:02', 'North Side', 88, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(24, 'Lily', 'Russian Blue', 6, 6.46, 'Mason', 'Wisozk', 'vschaefer@example.net', '1-220-639-0655', 'Dr. James Wilson', '\"Deleniti ut impedit iusto. Qui vel dolore odio optio. Sit libero qui placeat et facilis ut sed.\"', 'Active', '2026-05-02', '2025-10-27 08:13:12', '2025-07-06', '2023-11-16 13:46:01', 'BGC', 45, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(25, 'Luna', 'Ragdoll', 12, 4.34, 'Lon', 'Predovic', 'istiedemann@example.net', '1-360-820-1817', 'Dr. Michael Chen', '\"Dolorum reiciendis inventore aliquam ut qui debitis in. Expedita sed voluptates labore consequuntur cum. Officiis sed et et quam amet. Beatae sed aut totam occaecati. Iste fuga est sunt consequatur consequatur dolor numquam.\"', 'Critical', '2026-05-02', '2026-02-02 03:22:38', '2025-09-24', '2024-08-31 03:16:52', 'North Side', 64, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(26, 'Lily', 'Burmese', 14, 5.84, 'Jeffry', 'Welch', 'hansen.anita@example.net', '804.939.3506', 'Dr. Sarah Tan', '\"Eveniet odio blanditiis fugiat distinctio. Quia expedita enim dolorem velit rerum. Reiciendis dignissimos culpa et eaque autem optio. Repellendus fugiat minima enim.\"', 'Critical', '2026-05-02', '2026-04-19 14:07:53', '2026-01-14', '2023-07-08 16:06:51', 'Quezon City', 86, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(27, 'Nala', 'Sphynx', 1, 3.91, 'Ramiro', 'Bogisich', 'marisol.larson@example.com', '(470) 804-4003', 'Dr. Sarah Tan', '\"Provident aut et provident explicabo soluta corporis. Veniam repudiandae repellendus voluptatem et. Deserunt debitis ullam dolorem sed.\"', 'Active', '2026-05-02', '2026-03-24 08:52:45', '2026-04-06', '2023-06-13 18:42:57', 'Quezon City', 88, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(28, 'Lily', 'Ragdoll', 8, 5.01, 'Lonie', 'Ziemann', 'rhoda10@example.com', '+16816511496', 'Dr. Maria Garcia', '\"Nemo consequatur ut nihil exercitationem impedit ut earum. Aut nisi quas culpa itaque sunt eos soluta magni. Sunt voluptate porro adipisci et cupiditate. Voluptatem quibusdam totam sed.\"', 'Active', '2026-05-02', '2025-08-02 05:45:55', '2025-07-21', '2025-04-02 08:11:30', 'BGC', 40, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(29, 'Lucy', 'Sphynx', 15, 3.90, 'Heaven', 'Orn', 'padberg.janelle@example.com', '+1.484.822.1105', 'Dr. Michael Chen', '\"Enim eveniet ipsum et beatae atque quis ratione. Eum enim laborum nihil dolores. Inventore officiis maxime ut magnam.\"', 'Active', '2026-05-02', '2025-10-09 21:59:45', '2026-02-16', '2024-10-28 18:57:31', 'North Side', 90, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(30, 'Misty', 'Domestic Longhair', 2, 5.62, 'Aileen', 'Bechtelar', 'shanel35@example.org', '(346) 218-3310', 'Dr. Michael Chen', '\"Vel aut sunt laudantium facere. Totam quaerat vero dolorem placeat. Adipisci itaque accusantium velit.\"', 'Critical', '2026-05-02', '2025-11-26 15:31:35', '2025-07-26', '2024-10-04 19:26:28', 'BGC', 79, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(31, 'Jasper', 'Domestic Longhair', 4, 4.86, 'Bulah', 'Hane', 'westley.nolan@example.net', '+1.984.764.0205', 'Dr. Elena Rossi', '\"Quisquam asperiores occaecati id sint voluptas quo perferendis. Dolores fuga sint iure occaecati doloremque. Tenetur laboriosam enim in earum.\"', 'Critical', '2026-05-02', '2025-08-24 15:58:40', '2025-11-17', '2024-05-14 00:15:30', 'BGC', 64, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(32, 'Bella', 'Domestic Shorthair', 16, 4.73, 'Kasandra', 'Stamm', 'jeffery.lynch@example.com', '+12487103419', 'Dr. Sarah Tan', '\"Placeat aut laudantium tenetur et similique. Repellat recusandae voluptas veniam repudiandae modi et sit. Praesentium totam dolorem sunt voluptatibus sunt est ipsam qui. Rerum in esse qui voluptatibus debitis non qui.\"', 'Active', '2026-05-02', '2025-08-10 11:00:02', '2025-07-26', '2024-07-08 02:54:33', 'Downtown', 34, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(33, 'Oscar', 'Bengal', 7, 4.46, 'Kendra', 'Littel', 'alize.halvorson@example.com', '+1 (930) 878-6068', 'Dr. Sarah Tan', '\"Soluta sed nesciunt minus delectus. Sit consectetur porro nihil nihil quam amet molestiae. Vero quod ea ut.\"', 'Active', '2026-05-02', '2025-05-19 07:45:12', '2025-09-09', '2025-04-18 21:37:59', 'Quezon City', 77, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(34, 'Charlie', 'Burmese', 7, 4.80, 'Patsy', 'Mueller', 'heathcote.sabrina@example.org', '1-814-849-6232', 'Dr. Maria Garcia', '\"Tenetur dicta ea quasi dolore. Tempora iste fuga at quia. Sed perspiciatis iusto eligendi sit animi quam. Sunt corporis doloremque distinctio inventore voluptatem et et ut.\"', 'Active', '2026-05-02', '2025-08-25 15:26:38', '2025-08-12', '2025-04-15 07:40:25', 'Downtown', 47, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(35, 'Lily', 'Abyssinian', 12, 6.74, 'Florence', 'Little', 'joreilly@example.net', '(551) 427-6389', 'Dr. Elena Rossi', '\"Voluptatum accusantium nesciunt temporibus et architecto dolorem quia ut. Inventore odio totam corporis. Ducimus perferendis quia nam quae autem doloremque enim. Deleniti eos assumenda perspiciatis.\"', 'Critical', '2026-05-02', '2025-08-08 10:21:23', '2026-04-25', '2023-11-05 07:59:34', 'Quezon City', 56, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(36, 'Oliver', 'Persian', 16, 4.86, 'Wanda', 'Funk', 'gibson.estelle@example.org', '352-482-7037', 'Dr. James Wilson', '\"Est nesciunt voluptatem repellat molestiae ut. Dolor autem et porro incidunt. Optio asperiores sapiente odio autem commodi.\"', 'Critical', '2026-05-02', '2025-06-18 00:31:16', '2025-06-26', '2024-10-18 03:24:02', 'Cebu Main', 36, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(37, 'Luna', 'Siamese', 1, 5.92, 'Cyril', 'Cremin', 'vokeefe@example.org', '1-734-300-2641', 'Dr. Maria Garcia', '\"Dolor voluptatem veniam optio sit. Rerum veritatis perferendis repellat error consequatur. Et tempore repellat sit quaerat.\"', 'Active', '2026-05-02', '2025-06-30 22:45:11', '2025-10-08', '2023-09-25 02:43:35', 'North Side', 35, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(38, 'Misty', 'Burmese', 9, 2.24, 'Adolphus', 'Wunsch', 'brendan.kuhn@example.org', '463.895.9303', 'Dr. Sarah Tan', '\"Placeat sit qui et voluptatem ad et. Et et nihil aspernatur. Qui fugiat beatae reprehenderit qui nemo facere quis.\"', 'Active', '2026-05-02', '2026-01-31 00:32:19', '2026-02-23', '2024-06-19 22:56:10', 'North Side', 97, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(39, 'Misty', 'Abyssinian', 12, 5.76, 'David', 'Gutmann', 'jacobi.nickolas@example.com', '+18168914952', 'Dr. Maria Garcia', '\"Similique tempore quia eos eos. Amet accusamus sit quod omnis omnis. Aut laudantium et in quia officia rerum placeat occaecati. Rerum iste nihil aliquam reprehenderit.\"', 'Critical', '2026-05-02', '2025-10-11 21:58:28', '2025-09-18', '2023-12-24 04:16:27', 'BGC', 83, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(40, 'Chloe', 'Maine Coon', 5, 2.02, 'Ursula', 'Shields', 'edach@example.com', '1-458-618-2064', 'Dr. Sarah Tan', '\"Eum et iure atque quia. Sit placeat nobis cupiditate dolore sint. Sint rerum quo enim aut accusamus explicabo dolor.\"', 'Inactive', '2026-05-02', '2025-07-29 21:37:53', '2025-09-20', '2024-02-05 04:22:26', 'Quezon City', 91, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(41, 'Oliver', 'Bengal', 10, 6.72, 'Destini', 'O\'Connell', 'tate.beahan@example.com', '1-443-773-1946', 'Dr. Michael Chen', '\"Eveniet neque totam nulla fuga sapiente. Ut voluptatibus ratione laudantium quia. Voluptatum possimus aut ad dolore velit esse quaerat quidem.\"', 'Critical', '2026-05-02', '2025-12-02 00:34:10', '2025-06-14', '2023-05-05 12:04:56', 'BGC', 79, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(42, 'Coco', 'Domestic Shorthair', 10, 2.00, 'Arno', 'Dietrich', 'margarett.welch@example.org', '1-956-250-4916', 'Dr. Maria Garcia', '\"Soluta enim quia ut neque et. Enim quasi fugit nulla aut non tempora. Nesciunt sint quia saepe.\"', 'Active', '2026-05-02', '2026-02-16 02:33:49', '2025-07-12', '2023-06-05 00:52:03', 'BGC', 68, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(43, 'Bella', 'Russian Blue', 18, 6.73, 'Geoffrey', 'Herman', 'nathan.rowe@example.com', '+13462777674', 'Dr. Maria Garcia', '\"Necessitatibus alias quo aut molestiae iste iste. Odit vitae eligendi temporibus magnam unde. Consequuntur ut officia in aut velit tenetur debitis id.\"', 'Critical', '2026-05-02', '2026-01-14 07:23:54', '2025-06-06', '2023-12-20 09:18:39', 'Downtown', 44, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(44, 'Oliver', 'Bengal', 18, 6.59, 'Caden', 'Anderson', 'jframi@example.net', '+1.224.318.5436', 'Dr. Elena Rossi', '\"Et sunt autem veniam asperiores quo dolores. Exercitationem tempora delectus aperiam magni doloremque consequatur. Odit mollitia pariatur qui quasi minus. Sapiente corporis sapiente dolor voluptas eum ducimus.\"', 'Inactive', '2026-05-02', '2026-02-25 17:51:00', '2025-09-15', '2023-09-09 23:26:27', 'Quezon City', 52, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(45, 'Jasper', 'Ragdoll', 9, 3.69, 'Carolanne', 'Brown', 'haag.isabell@example.org', '626-324-8201', 'Dr. Maria Garcia', '\"Est illo reiciendis est debitis. Qui accusantium laboriosam et fugiat. Omnis omnis consequatur est expedita omnis non ipsa. Consequatur excepturi sunt ut non.\"', 'Inactive', '2026-05-02', '2026-02-14 04:39:56', '2026-01-25', '2025-05-01 16:14:31', 'Cebu Main', 51, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(46, 'Milo', 'Domestic Longhair', 10, 6.99, 'Mohamed', 'Macejkovic', 'alyson.white@example.org', '1-229-393-6161', 'Dr. Sarah Tan', '\"Minima sed unde ad possimus. Enim quo voluptatem facilis. Facere recusandae non deserunt modi. A nesciunt aut temporibus quisquam ipsam.\"', 'Inactive', '2026-05-02', '2025-11-22 03:55:24', '2026-03-09', '2023-08-09 19:42:42', 'Quezon City', 73, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(47, 'Misty', 'Domestic Shorthair', 11, 5.32, 'Damion', 'Jones', 'domenica10@example.com', '(985) 899-8181', 'Dr. Michael Chen', '\"Et vel consequatur facere ut qui molestiae. Corporis consequatur iusto ratione voluptatem. Eius beatae explicabo aut nemo totam eos et. Et vel explicabo qui molestias enim minus.\"', 'Active', '2026-05-02', '2025-11-30 05:25:39', '2025-08-08', '2023-10-06 03:02:34', 'Cebu Main', 42, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(48, 'Lily', 'Maine Coon', 5, 7.40, 'Lizzie', 'Bayer', 'mitchell.marjory@example.com', '302-595-2676', 'Dr. Maria Garcia', '\"Ea voluptatem quis et veniam commodi. Magnam magnam repudiandae enim explicabo totam dicta.\"', 'Critical', '2026-05-02', '2026-04-02 00:09:16', '2025-06-25', '2023-07-04 08:18:02', 'North Side', 64, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(49, 'Oliver', 'Persian', 12, 4.64, 'Boyd', 'Mayert', 'willy33@example.com', '1-949-546-6924', 'Dr. Elena Rossi', '\"Quibusdam quia est labore est cum labore laboriosam. Distinctio unde autem beatae est. Eum sapiente vel est possimus est consequuntur et.\"', 'Active', '2026-05-02', '2025-07-17 21:51:38', '2025-05-07', '2024-04-08 04:38:05', 'BGC', 89, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(50, 'Bella', 'Domestic Shorthair', 12, 2.77, 'Johann', 'Hoppe', 'ykassulke@example.com', '+1-512-728-7920', 'Dr. Sarah Tan', '\"Veniam et aut hic praesentium omnis sed. Nostrum aliquid esse ab. Asperiores facilis ut in. Sit rerum et sint in nesciunt quis quas ducimus.\"', 'Active', '2026-05-02', '2025-07-20 19:42:33', '2026-03-23', '2024-07-30 05:41:50', 'Cebu Main', 81, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(51, 'Milo', 'Maine Coon', 14, 7.49, 'Myriam', 'Cummings', 'weimann.jaeden@example.org', '+1 (847) 544-3375', 'Dr. James Wilson', '\"Ea ratione aut adipisci ipsum et minima. Animi deserunt esse molestias. Laboriosam molestiae facere excepturi culpa molestiae sint ut ipsam. Exercitationem accusamus qui non atque quia qui. Laborum optio non iusto.\"', 'Critical', '2026-05-02', '2025-08-18 12:53:45', '2025-06-23', '2025-01-03 15:54:31', 'North Side', 41, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(52, 'Simba', 'Abyssinian', 1, 6.77, 'Benny', 'Braun', 'ocie93@example.org', '+14795106532', 'Dr. James Wilson', '\"Tenetur optio fugiat perspiciatis ex accusamus iste error. Sed rerum tempore eligendi accusantium magni atque ipsam aspernatur. Et et blanditiis voluptas velit suscipit repellendus.\"', 'Critical', '2026-05-02', '2026-04-20 04:48:53', '2025-05-25', '2024-05-14 00:54:42', 'BGC', 76, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(53, 'Milo', 'Domestic Shorthair', 17, 5.70, 'Dino', 'Prohaska', 'monty.sanford@example.org', '+1-484-307-1428', 'Dr. Michael Chen', '\"Quia natus in dolores molestiae. Corrupti accusantium neque eius dolorem. Eos aut nemo quod quia aperiam non facilis. Distinctio qui quaerat sequi illo ut laboriosam ducimus.\"', 'Active', '2026-05-02', '2026-02-11 21:40:53', '2025-11-10', '2024-06-01 06:44:25', 'Quezon City', 69, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(54, 'Leo', 'Bengal', 18, 2.63, 'Brooke', 'Jacobson', 'pat09@example.com', '585-829-3880', 'Dr. James Wilson', '\"Odit mollitia sunt ea labore est. Praesentium aut modi voluptatem natus molestiae non. Et veritatis rerum iste illo ducimus velit.\"', 'Critical', '2026-05-02', '2026-03-22 03:54:55', '2025-07-09', '2024-11-02 09:56:13', 'Quezon City', 31, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(55, 'Bella', 'Sphynx', 15, 6.21, 'Dawson', 'Ledner', 'roob.loyce@example.net', '+1.305.565.6613', 'Dr. Michael Chen', '\"Id ipsam quis asperiores earum. Delectus ex distinctio molestias vel ducimus. Magni optio quo et harum. Unde natus alias occaecati omnis ad fugit similique.\"', 'Inactive', '2026-05-02', '2026-04-03 00:35:41', '2025-12-05', '2023-05-05 09:21:08', 'BGC', 32, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(56, 'Simba', 'Russian Blue', 9, 6.00, 'Ike', 'Kirlin', 'kling.derrick@example.org', '+1-989-684-2455', 'Dr. Sarah Tan', '\"Explicabo reiciendis consequuntur deserunt at a quis. Voluptatem quaerat esse consequatur alias nihil ducimus voluptas. Quia nesciunt vitae et dolorem.\"', 'Critical', '2026-05-02', '2025-07-25 00:17:42', '2025-12-27', '2024-11-30 22:02:45', 'Quezon City', 31, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(57, 'Luna', 'Burmese', 17, 2.92, 'Janiya', 'Wiza', 'orn.glennie@example.org', '313.679.3780', 'Dr. James Wilson', '\"Voluptatem et ipsa quod veniam velit rerum amet. Aut dolorem atque adipisci consequatur optio. Reprehenderit illo impedit deserunt debitis aperiam et modi mollitia.\"', 'Inactive', '2026-05-02', '2026-01-18 04:34:26', '2025-09-17', '2023-05-14 12:21:41', 'North Side', 73, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(58, 'Bella', 'Birman', 4, 2.28, 'Edwardo', 'Towne', 'ggoodwin@example.com', '+1-412-389-6674', 'Dr. Elena Rossi', '\"Ullam sequi quaerat dolorem non officiis ipsa laboriosam. Molestias animi sapiente cumque perferendis.\"', 'Active', '2026-05-02', '2025-07-28 16:27:03', '2025-12-26', '2023-05-15 13:20:36', 'Quezon City', 69, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(59, 'Nala', 'Burmese', 4, 5.13, 'Monroe', 'O\'Hara', 'lizeth.thompson@example.org', '+19492919128', 'Dr. James Wilson', '\"Aut reiciendis quo ullam exercitationem deleniti natus voluptatem praesentium. Recusandae iusto sunt velit enim. Eos inventore esse quo nesciunt voluptatem omnis.\"', 'Critical', '2026-05-02', '2026-03-17 13:01:46', '2025-06-18', '2025-01-23 18:18:43', 'Cebu Main', 80, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(60, 'Charlie', 'Siamese', 2, 6.95, 'Assunta', 'Waelchi', 'ziemann.terrell@example.com', '279.543.9573', 'Dr. Sarah Tan', '\"Molestias nulla doloremque aut omnis quod asperiores. Sint at iure qui ut. Possimus quaerat non odio ut non repellendus est eveniet.\"', 'Inactive', '2026-05-02', '2026-01-20 16:35:25', '2025-07-24', '2023-12-17 04:29:47', 'Quezon City', 46, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(61, 'Max', 'Russian Blue', 11, 7.69, 'Lily', 'Brakus', 'bradly55@example.net', '1-801-933-9722', 'Dr. Elena Rossi', '\"Temporibus dolores eius eos rerum. Maxime maiores molestiae consequatur consequatur. Dolores omnis voluptas consequatur maiores maxime eveniet eos.\"', 'Active', '2026-05-02', '2026-02-18 20:14:33', '2025-06-13', '2024-11-26 05:11:19', 'North Side', 86, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(62, 'Bella', 'Sphynx', 11, 3.68, 'Ford', 'Goodwin', 'wrodriguez@example.net', '539.367.6389', 'Dr. Michael Chen', '\"Vitae enim autem sint praesentium commodi ut dolorum. Voluptatem rerum reprehenderit explicabo culpa vel est. Incidunt cum recusandae suscipit vitae autem.\"', 'Inactive', '2026-05-02', '2026-04-17 09:47:31', '2025-12-30', '2024-06-02 04:07:29', 'Downtown', 60, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(63, 'Simba', 'Bengal', 2, 2.75, 'Agustina', 'Konopelski', 'ressie.ondricka@example.com', '(760) 493-4748', 'Dr. Sarah Tan', '\"Et commodi repellendus aliquid voluptas et impedit. Quia minus quaerat quaerat id minima. Quasi corporis tempore enim necessitatibus sunt est. Cupiditate perferendis quo non quasi ea cumque sint.\"', 'Critical', '2026-05-02', '2026-01-26 20:08:49', '2025-06-07', '2024-05-27 03:38:17', 'Quezon City', 31, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(64, 'Nala', 'Domestic Longhair', 13, 6.17, 'Cyril', 'Moore', 'maida94@example.com', '(970) 272-2249', 'Dr. Michael Chen', '\"Omnis odit rerum autem sed voluptatibus est alias iusto. Delectus quia quis soluta perspiciatis mollitia tempore. Itaque vel dignissimos blanditiis quas.\"', 'Active', '2026-05-02', '2026-01-07 11:44:08', '2025-07-19', '2025-02-21 10:31:43', 'Cebu Main', 52, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(65, 'Oscar', 'Persian', 6, 2.91, 'Kaleb', 'Krajcik', 'ihegmann@example.org', '+1.816.302.1058', 'Dr. James Wilson', '\"Tenetur magni sit dolor vitae debitis qui ut. Culpa culpa aut possimus perspiciatis qui qui quis ipsum. Incidunt sed molestiae vel natus.\"', 'Active', '2026-05-02', '2025-12-15 18:25:58', '2026-01-22', '2023-06-30 12:50:40', 'BGC', 45, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(66, 'Milo', 'Abyssinian', 18, 4.64, 'Tyrel', 'Lindgren', 'lysanne.shanahan@example.com', '+1.762.637.8969', 'Dr. James Wilson', '\"Nesciunt vel illum sit. Quasi tempore modi et molestias. Fuga placeat id nostrum amet recusandae dolores vel odio. Vel nesciunt velit facere. Neque qui a ad.\"', 'Inactive', '2026-05-02', '2025-05-09 07:33:23', '2025-10-28', '2024-05-14 11:13:38', 'BGC', 100, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(67, 'Lily', 'Abyssinian', 14, 4.85, 'Janick', 'Senger', 'iharber@example.com', '541.491.8249', 'Dr. Sarah Tan', '\"Ut consequatur aut molestiae ut reiciendis quo autem. Et occaecati quaerat ad corrupti sit. Cum libero aliquam deserunt. Et et minima et est mollitia.\"', 'Inactive', '2026-05-02', '2025-05-17 11:10:43', '2025-11-05', '2024-01-27 21:07:53', 'BGC', 52, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(68, 'Max', 'Burmese', 2, 2.46, 'Mariano', 'Ward', 'ybarton@example.org', '234-392-1108', 'Dr. Sarah Tan', '\"Blanditiis est iste voluptatem dignissimos nostrum quo est. Autem perferendis sint eius nobis. Libero illum dignissimos voluptatem ipsum praesentium et ipsum enim. Quibusdam voluptate qui veritatis perspiciatis. Repellendus autem sed ad et voluptas enim.\"', 'Critical', '2026-05-02', '2025-07-19 23:11:59', '2025-10-03', '2023-10-17 08:32:24', 'Cebu Main', 42, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(69, 'Nala', 'Maine Coon', 13, 3.07, 'Tyshawn', 'Pacocha', 'ehegmann@example.net', '1-248-813-3785', 'Dr. Michael Chen', '\"Enim eaque quos est veniam corrupti. Ducimus dolorem culpa qui quae. Aspernatur numquam maiores deserunt sit aut. Velit rerum quia ab aspernatur vel consectetur et.\"', 'Active', '2026-05-02', '2025-08-07 14:29:04', '2025-08-26', '2024-12-10 13:57:06', 'Cebu Main', 98, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(70, 'Misty', 'Siamese', 18, 4.91, 'Quentin', 'Ankunding', 'jalon92@example.com', '1-212-383-1780', 'Dr. Michael Chen', '\"Sed debitis repellat id sed quidem eum odit. Aspernatur libero voluptatem modi sapiente dignissimos asperiores non dolor. Fuga eos dolorem et ex quo.\"', 'Critical', '2026-05-02', '2025-09-07 15:56:03', '2026-04-08', '2023-08-29 13:51:33', 'Cebu Main', 58, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(71, 'Luna', 'Siamese', 7, 4.18, 'Vivienne', 'Lockman', 'mittie63@example.net', '(786) 466-3545', 'Dr. Sarah Tan', '\"Ad molestias odio quis nobis. Maxime velit fugit explicabo quia eius magni. Natus eos consequatur cum ipsum veniam quo maxime. Magni sit nostrum sunt officia quisquam eos assumenda.\"', 'Active', '2026-05-02', '2025-11-25 12:39:00', '2025-07-03', '2024-09-21 09:22:25', 'BGC', 61, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(72, 'Oscar', 'Maine Coon', 12, 6.35, 'Monte', 'Zemlak', 'otto.senger@example.net', '1-409-419-2547', 'Dr. Elena Rossi', '\"Voluptates eveniet et enim odit aut error. Recusandae id consequatur est aliquam deserunt distinctio. Id deleniti exercitationem maiores eum. Iusto dolorum quidem nisi dolores ut possimus quaerat.\"', 'Critical', '2026-05-02', '2026-03-14 08:50:55', '2025-06-19', '2024-06-19 22:30:22', 'Quezon City', 89, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(73, 'Simba', 'Domestic Shorthair', 1, 2.88, 'Hadley', 'Kuhn', 'moconner@example.com', '657-652-2808', 'Dr. James Wilson', '\"Non modi nam eius. Neque quia qui sit tempore eaque ratione est. Ea quaerat id molestiae facilis. Quas optio doloremque non.\"', 'Inactive', '2026-05-02', '2025-09-03 15:29:59', '2025-11-12', '2024-05-23 06:45:23', 'Cebu Main', 89, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(74, 'Charlie', 'Burmese', 5, 5.05, 'Kiarra', 'Ryan', 'giovanna86@example.net', '640-331-3019', 'Dr. James Wilson', '\"Consequatur voluptates libero quibusdam asperiores voluptatum doloribus. Sit sit quos dolorem culpa itaque. Totam autem alias itaque veniam laboriosam error iure eius.\"', 'Critical', '2026-05-02', '2026-02-15 07:04:33', '2025-10-24', '2023-06-19 03:50:45', 'BGC', 40, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(75, 'Lucy', 'Birman', 7, 2.31, 'Alek', 'Schaefer', 'fausto.gleason@example.org', '1-283-788-6653', 'Dr. Sarah Tan', '\"Neque quo sapiente similique voluptates officiis sunt. Dolores accusamus ut provident eligendi harum est. Perspiciatis doloremque velit et et alias modi eos.\"', 'Critical', '2026-05-02', '2025-10-10 05:37:19', '2025-06-25', '2024-11-03 23:46:16', 'North Side', 100, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(76, 'Oliver', 'Siamese', 6, 6.95, 'Louvenia', 'Harris', 'jovani68@example.org', '(743) 422-3552', 'Dr. Elena Rossi', '\"Voluptatum enim ratione dolorem sequi totam autem. Hic aut enim repellat ea. Magni unde eos quisquam porro non consequuntur praesentium.\"', 'Active', '2026-05-02', '2025-08-14 13:15:27', '2025-10-26', '2023-11-20 08:39:58', 'Cebu Main', 98, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(77, 'Misty', 'Sphynx', 5, 2.50, 'Selena', 'Dicki', 'hessel.jana@example.com', '+1 (628) 963-9647', 'Dr. Maria Garcia', '\"Et aut porro voluptatibus assumenda non. Eum in explicabo tenetur officia qui. Dolorum et ullam voluptatibus et voluptas non exercitationem. Error quis nostrum ut nihil ullam et libero.\"', 'Inactive', '2026-05-02', '2025-05-05 03:37:06', '2026-04-20', '2023-11-28 18:16:28', 'Quezon City', 86, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(78, 'Milo', 'Maine Coon', 4, 3.20, 'Dallin', 'Denesik', 'jazmyn.corkery@example.org', '+1 (954) 815-7752', 'Dr. Maria Garcia', '\"Quia qui architecto officiis laborum vitae voluptas. Dolorem corrupti ipsum aliquid vero debitis omnis natus aut. Minima repellendus suscipit iure sunt possimus voluptas. Omnis quos ea error voluptatem. Qui officiis voluptatum totam libero ullam.\"', 'Active', '2026-05-02', '2025-12-26 04:04:05', '2025-08-20', '2024-02-05 17:13:03', 'Downtown', 51, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(79, 'Milo', 'Domestic Longhair', 11, 4.57, 'Lillie', 'Quitzon', 'ccollier@example.org', '+1 (469) 679-0359', 'Dr. Michael Chen', '\"Doloremque voluptatem aut qui illo. Omnis rerum velit quod ad. Magnam debitis et odio aliquam sit quod exercitationem.\"', 'Critical', '2026-05-02', '2026-03-17 22:36:38', '2025-12-25', '2024-02-25 16:12:18', 'Cebu Main', 86, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(80, 'Jasper', 'Maine Coon', 6, 3.60, 'Flo', 'Johnson', 'tstamm@example.net', '+1-737-394-3770', 'Dr. Maria Garcia', '\"Non quia minima expedita quod sint consequatur dolores sit. In ab ut voluptatem maxime. Voluptatum animi natus consequatur voluptatem. Ut cumque voluptatem iusto et aperiam officia corporis dolores.\"', 'Inactive', '2026-05-02', '2025-07-05 20:08:43', '2025-08-18', '2023-08-30 23:47:36', 'North Side', 75, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(81, 'Lucy', 'Domestic Shorthair', 15, 4.68, 'Eldridge', 'Kohler', 'xkonopelski@example.org', '1-253-497-5652', 'Dr. Maria Garcia', '\"Eos porro impedit quo omnis est. Ex eaque odio commodi nam quibusdam recusandae qui. Dolorem doloremque odit recusandae maxime et.\"', 'Inactive', '2026-05-02', '2025-06-13 16:50:20', '2026-02-01', '2023-11-21 10:11:43', 'North Side', 100, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(82, 'Simba', 'Domestic Longhair', 13, 2.15, 'Weston', 'Mann', 'pboyle@example.net', '680-524-3974', 'Dr. Maria Garcia', '\"Autem aspernatur doloremque nobis placeat. Sint sed nam temporibus voluptatibus debitis cum et. Qui aliquam repellendus officiis doloremque asperiores nostrum. Voluptates vel eaque expedita.\"', 'Inactive', '2026-05-02', '2025-07-31 07:55:57', '2025-10-30', '2024-02-08 10:04:46', 'BGC', 43, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(83, 'Coco', 'Ragdoll', 1, 3.63, 'Valentin', 'Spencer', 'gonzalo.bode@example.com', '+1.857.853.9873', 'Dr. Sarah Tan', '\"Laboriosam ullam voluptatem ut quaerat et. Quo ut qui deserunt dolorem. Voluptatem id et natus vitae fugit est. Perferendis et quibusdam ducimus molestiae aliquid.\"', 'Inactive', '2026-05-02', '2025-06-29 21:19:53', '2025-08-14', '2025-04-23 00:13:59', 'Quezon City', 82, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(84, 'Nala', 'Maine Coon', 2, 2.92, 'Casandra', 'Hill', 'johnston.jeanie@example.org', '864.968.1980', 'Dr. James Wilson', '\"Error voluptas maxime dignissimos aspernatur molestias. Odio et quis error ab. Praesentium ipsam ipsum voluptates fuga temporibus excepturi et.\"', 'Active', '2026-05-02', '2026-04-30 23:33:23', '2026-03-08', '2025-01-25 04:56:51', 'Downtown', 51, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(85, 'Chloe', 'Ragdoll', 15, 2.76, 'Tierra', 'Kessler', 'leannon.erich@example.com', '424-481-2071', 'Dr. Michael Chen', '\"Facere illum adipisci vero ut placeat. Accusamus officia asperiores et quia quam veritatis qui. Suscipit porro quos est sunt nisi blanditiis dolor.\"', 'Critical', '2026-05-02', '2025-08-25 03:04:29', '2025-10-18', '2024-07-25 01:10:29', 'Downtown', 86, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(86, 'Milo', 'Ragdoll', 14, 4.67, 'Jettie', 'Dach', 'nelda.lakin@example.org', '(405) 686-3006', 'Dr. Elena Rossi', '\"Omnis provident velit beatae ab aut et. Est perspiciatis et accusamus alias aut nihil possimus. Delectus aliquam blanditiis dolorum minima suscipit. Quia qui dolore nobis.\"', 'Active', '2026-05-02', '2025-09-03 10:16:09', '2025-10-07', '2025-02-27 13:21:20', 'BGC', 52, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(87, 'Bella', 'Burmese', 15, 5.86, 'Katelynn', 'Blanda', 'ocie.turner@example.net', '+13077449468', 'Dr. Sarah Tan', '\"Soluta rerum inventore quis qui vero placeat. Impedit deserunt ipsa ex adipisci. Consequatur dicta rem dolor consectetur.\"', 'Critical', '2026-05-02', '2025-09-29 16:36:16', '2026-01-28', '2023-11-09 20:27:10', 'Cebu Main', 54, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(88, 'Leo', 'Ragdoll', 14, 2.20, 'Mattie', 'Lebsack', 'gianni02@example.com', '757.674.3996', 'Dr. Sarah Tan', '\"Molestiae dignissimos dolorem voluptas. Doloribus quaerat sequi pariatur numquam illo. Odit accusamus aperiam quia similique.\"', 'Critical', '2026-05-02', '2025-06-02 00:48:20', '2026-03-20', '2024-09-26 21:04:14', 'North Side', 37, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(89, 'Milo', 'Birman', 12, 5.10, 'Verdie', 'Keebler', 'senger.domenico@example.org', '+14029825741', 'Dr. Maria Garcia', '\"Quas perspiciatis ut maxime qui. Ut iste voluptas possimus iusto. Ratione voluptatem ut esse voluptate magnam libero.\"', 'Active', '2026-05-02', '2025-10-19 15:15:15', '2026-01-02', '2024-10-27 11:16:01', 'BGC', 56, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(90, 'Jasper', 'Russian Blue', 13, 7.26, 'Breanne', 'Bruen', 'nprice@example.com', '602.510.7580', 'Dr. Michael Chen', '\"Culpa vero alias odit esse repudiandae unde ipsa. Vel at qui eos quibusdam aut. Totam doloribus quis suscipit qui nihil facilis nobis id.\"', 'Critical', '2026-05-02', '2025-05-12 03:21:24', '2025-06-28', '2024-06-25 12:15:11', 'Quezon City', 53, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(91, 'Lucy', 'Maine Coon', 1, 5.26, 'Rosie', 'Cole', 'izabella95@example.net', '+15416395019', 'Dr. James Wilson', '\"Sit nobis sint asperiores et magnam enim ut. Quis quia dolores dolores vitae sed. Voluptatum suscipit provident laudantium occaecati vel ex corrupti. Nobis occaecati vel rerum sed officia dolorum.\"', 'Active', '2026-05-02', '2025-11-25 10:27:53', '2025-06-16', '2024-12-25 05:39:51', 'BGC', 33, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(92, 'Milo', 'Domestic Longhair', 9, 5.78, 'Candido', 'Aufderhar', 'tarmstrong@example.net', '+1.385.438.5194', 'Dr. Michael Chen', '\"Nam alias sit voluptatem corrupti doloremque ea repellendus. Voluptatem fugit autem cupiditate aut repellat aperiam est. Est vero quo quia neque error. Dolores qui deserunt at quae cupiditate aliquam aliquam.\"', 'Critical', '2026-05-02', '2025-12-17 02:51:51', '2025-05-18', '2025-03-06 18:32:08', 'Downtown', 96, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(93, 'Bella', 'Abyssinian', 2, 7.40, 'Santiago', 'Macejkovic', 'brent17@example.net', '+16516236689', 'Dr. Maria Garcia', '\"Odio debitis quia nisi est aliquam sequi. Voluptas ducimus voluptatum voluptas minima cupiditate quo reprehenderit.\"', 'Active', '2026-05-02', '2026-01-04 12:31:48', '2025-09-09', '2023-12-26 13:49:29', 'North Side', 55, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(94, 'Oliver', 'Russian Blue', 6, 4.08, 'Sheridan', 'Bauch', 'bartoletti.dane@example.com', '321-258-3041', 'Dr. James Wilson', '\"Quod est suscipit quo adipisci veniam quo. Sit velit ut quaerat aspernatur pariatur pariatur placeat dicta. Enim quisquam provident perferendis sit hic autem. Dolorem totam autem hic veritatis.\"', 'Critical', '2026-05-02', '2026-03-13 18:09:08', '2026-03-07', '2023-08-18 01:12:10', 'Quezon City', 92, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(95, 'Charlie', 'Domestic Longhair', 17, 4.67, 'Lemuel', 'Hamill', 'vance43@example.org', '+1-361-370-4643', 'Dr. James Wilson', '\"A beatae autem qui quidem saepe est. Recusandae veritatis sapiente pariatur hic. Id quo voluptatem aut delectus labore consectetur sit. Eveniet atque nam maiores impedit corporis similique.\"', 'Critical', '2026-05-02', '2025-06-26 04:05:27', '2025-11-24', '2024-05-26 16:24:39', 'Downtown', 91, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(96, 'Lily', 'Maine Coon', 17, 3.59, 'Clyde', 'Schimmel', 'kiehn.haskell@example.com', '+1.865.309.7190', 'Dr. Maria Garcia', '\"Libero recusandae repellat sint ut quia. Quia minus et deleniti odit placeat voluptatem.\"', 'Critical', '2026-05-02', '2025-08-10 00:58:36', '2026-02-23', '2023-05-22 23:56:55', 'Quezon City', 85, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(97, 'Bella', 'Siamese', 16, 6.55, 'Ryley', 'Connelly', 'mschmitt@example.org', '214.230.3478', 'Dr. James Wilson', '\"Quidem nisi est voluptas eos hic. Facere voluptas voluptatibus et maxime temporibus laudantium quasi voluptatem. Nemo nam ipsa deleniti iure. Atque molestiae aliquid eos laboriosam quisquam et iusto.\"', 'Critical', '2026-05-02', '2026-01-10 02:40:36', '2026-01-06', '2025-04-13 21:33:21', 'Downtown', 82, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(98, 'Leo', 'Ragdoll', 9, 7.11, 'Declan', 'Gutmann', 'dfeest@example.com', '(814) 954-5956', 'Dr. James Wilson', '\"Necessitatibus nihil tempore magni qui est. Est quia ad saepe a voluptatem aperiam numquam. Veritatis quae et culpa sit accusantium molestiae dolores distinctio.\"', 'Active', '2026-05-02', '2025-08-16 15:31:38', '2026-05-01', '2025-03-08 20:21:13', 'Downtown', 60, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(99, 'Luna', 'Sphynx', 18, 4.26, 'Declan', 'Huel', 'arjun.mcclure@example.net', '+18789260135', 'Dr. Michael Chen', '\"Doloremque voluptas consequatur repudiandae eum magnam officia. Consequuntur amet id sit at et tempora. Voluptas maiores necessitatibus fugit ipsum nobis quia fugiat.\"', 'Active', '2026-05-02', '2025-09-06 23:06:00', '2026-03-12', '2024-02-29 21:42:38', 'North Side', 37, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(100, 'Oliver', 'Burmese', 12, 5.30, 'Lyric', 'Sawayn', 'skyla45@example.net', '+1.225.840.2455', 'Dr. Maria Garcia', '\"Ut ut omnis quibusdam sed libero est omnis eligendi. Commodi quia et ex natus in sed placeat.\"', 'Critical', '2026-05-02', '2025-09-28 18:14:59', '2025-08-10', '2023-10-12 03:27:32', 'BGC', 33, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(101, 'Milo', 'Maine Coon', 16, 4.34, 'Kaylee', 'Turner', 'maryjane13@example.net', '(775) 782-6694', 'Dr. Elena Rossi', '\"Sequi possimus fugiat iste sint. Omnis perspiciatis inventore soluta voluptates minus necessitatibus.\"', 'Inactive', '2026-05-02', '2025-10-03 00:55:06', '2025-06-19', '2024-05-03 00:46:17', 'Quezon City', 57, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(102, 'Bella', 'Persian', 7, 7.62, 'Benjamin', 'Mosciski', 'oyundt@example.com', '+1-337-507-7613', 'Dr. Michael Chen', '\"Facere eveniet et eveniet iusto ratione soluta non. Molestiae placeat id dicta sequi aspernatur. Incidunt non eius qui deleniti corporis. Vel mollitia rerum sit dolor.\"', 'Active', '2026-05-02', '2025-08-29 01:01:13', '2025-05-09', '2024-07-03 23:47:09', 'Downtown', 50, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(103, 'Max', 'Burmese', 6, 2.03, 'Sandra', 'Kessler', 'sunny06@example.net', '(920) 946-1673', 'Dr. Elena Rossi', '\"Voluptates rerum optio iste necessitatibus eum iste molestiae voluptatum. Dolor asperiores et beatae blanditiis. Est tenetur harum aliquam sed enim qui rerum facere.\"', 'Active', '2026-05-02', '2025-07-06 23:34:47', '2026-01-12', '2023-07-23 14:55:04', 'North Side', 53, '2026-05-01 23:38:19', '2026-05-01 23:38:19', NULL),
(104, 'test', 'test', 4, 6.80, 'Apollon', 'Artemis', 'charles_donor@alterforever.com', '+635094526952', 'Dr. Matt', '\"fwefwefsdfsdfsd\"', 'Active', '2026-05-02', NULL, NULL, NULL, 'North Side', 80, '2026-05-02 02:33:19', '2026-05-02 02:33:34', '2026-05-02 02:33:34'),
(105, 'Luna', 'Siamese', 6, 6.20, 'test 1', 'test 2', 'sample@example.com', '265', 'Dr. Me', '\"None\"', 'Active', '2026-05-02', NULL, NULL, NULL, 'QC', 100, '2026-05-02 02:51:32', '2026-05-02 03:03:54', '2026-05-02 03:03:54');

-- --------------------------------------------------------

--
-- Table structure for table `segments`
--

CREATE TABLE `segments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `rules` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`rules`)),
  `recipient_count` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `segments`
--

INSERT INTO `segments` (`id`, `name`, `rules`, `recipient_count`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'test', '[{\"id\":1777702325376,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777702325377,\"field\":\"First Visit\",\"op\":\"preset\",\"val\":\"today\"}]}]', 0, '2026-05-01 22:13:19', '2026-05-02 01:21:49', '2026-05-02 01:21:49'),
(2, 'test', '[{\"id\":1777709595198,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777709595199,\"field\":\"age_years\",\"op\":\"between\",\"val\":\"6,10\"},{\"id\":1777709667517,\"field\":\"branch\",\"op\":\"contains\",\"val\":\"BGC\"}]},{\"id\":1777709680107,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777709680108,\"field\":\"last_visit_at\",\"op\":\"between\",\"val\":\"2023-05-02,2026-05-02\"}]}]', 100, '2026-05-02 00:15:19', '2026-05-02 01:05:24', '2026-05-02 01:05:24'),
(3, 'dasdsadsad', '[{\"id\":1777709595198,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777709595199,\"field\":\"age_years\",\"op\":\"between\",\"val\":\"6,10\"},{\"id\":1777709667517,\"field\":\"branch\",\"op\":\"contains\",\"val\":\"BGC\"}]},{\"id\":1777709680107,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777709680108,\"field\":\"last_visit_at\",\"op\":\"between\",\"val\":\"2023-05-02,2026-05-02\"}]}]', 100, '2026-05-02 00:39:29', '2026-05-02 00:40:38', '2026-05-02 00:40:38'),
(4, '11 Recipients', '[{\"id\":1777709595198,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777709595199,\"field\":\"age_years\",\"op\":\"between\",\"val\":\"4,10\"},{\"id\":1777709667517,\"field\":\"branch\",\"op\":\"contains\",\"val\":\"BGC\"}]},{\"id\":1777709680107,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777709680108,\"field\":\"last_visit_at\",\"op\":\"between\",\"val\":\"2024-05-02,2025-05-02\"}]}]', 11, '2026-05-02 00:40:30', '2026-05-02 00:40:30', NULL),
(11, 'Updated Client', '[{\"id\":1777709595198,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777709595199,\"field\":\"age_years\",\"op\":\"between\",\"val\":\"6,10\"},{\"id\":1777709667517,\"field\":\"branch\",\"op\":\"contains\",\"val\":\"BGC\"},{\"id\":1777712677408,\"field\":\"status\",\"op\":\"contains\",\"val\":\"Critical\"}]},{\"id\":1777709680107,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777712648138,\"field\":\"branch\",\"op\":\"is\",\"val\":\"Cebu Main\"}]}]', 17, '2026-05-02 01:05:21', '2026-05-02 01:05:21', NULL),
(12, 'Test Run', '[{\"id\":1777737333960,\"matchType\":\"ALL\",\"rules\":[{\"id\":1777737333961,\"field\":\"status\",\"op\":\"contains\",\"val\":\"Active\"},{\"id\":1777737345259,\"field\":\"branch\",\"op\":\"is\",\"val\":\"Quezon City\"},{\"id\":1777737377353,\"field\":\"age_years\",\"op\":\"between\",\"val\":\"4,6\"}]}]', 4, '2026-05-02 07:57:13', '2026-05-02 07:57:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('e9oSCjEEcpg3MrMOuoBQF5cubewOzfczx5Nvbsz5', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWkllNERmUTZiVTlwdWVXOHprWGpwbWtMcHVxS1RYZ2pwVVRVN29sZiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToyOntzOjM6InVybCI7czozMToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2Rhc2hib2FyZCI7czo1OiJyb3V0ZSI7czo5OiJkYXNoYm9hcmQiO319', 1777799590),
('ZvblTNFh2etZiWPVFMY4ZYRj1BUoXRMgd8uhVskf', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoieTBpVGpva244ajJYOTBIMzlLZm92a3hRbDVZS0tyaGkyaEM1azBGaSI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjMxOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvZGFzaGJvYXJkIjtzOjU6InJvdXRlIjtzOjk6ImRhc2hib2FyZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1777790094);

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` longtext DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Standard',
  `preview_image` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `name`, `subject`, `body`, `category`, `status`, `preview_image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Annual Vaccination Reminder', 'Time for {{patient_name}}\'s Yearly Protection!', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Hi {{owner_name}},</p><p>It\'s that time of year again! {{patient_name}} is due for their annual vaccinations to stay protected against common feline diseases.</p><p>Keeping up with shots is the best way to ensure a long, healthy life for your furry friend. </p><p>Click here to book an appointment: [Link]</p><p>Stay pawsome,<br>The Cat Clinic Team</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Vaccination', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Annual+Vaccination+Reminder', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(2, 'Kitten First Checkup', 'Welcome to the Family! Kitten Wellness Pack', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Hello {{owner_name}},</p><p>Congratulations on your new kitten, {{patient_name}}! The first few months are crucial for their development. </p><p>Our Kitten Wellness Pack covers:<br>- Initial Health Exam<br>- First Round of Vaccinations<br>- Nutrition Consultation<br>- Deworming</p><p>Let\'s get {{patient_name}} off to a great start! Reply to this email to schedule your first visit.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Kitten+First+Checkup', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(3, 'Senior Cat Wellness', 'Special Care for Your Senior Companion: {{patient_name}}', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Hi {{owner_name}},</p><p>As {{patient_name}} gets older, their health needs change. Cats are masters at hiding discomfort, so regular senior screenings are vital.</p><p>We recommend a bi-annual checkup for cats over 7 years old to monitor kidney function, joint health, and dental status.</p><p>Let\'s ensure {{patient_name}}\\\'s golden years are comfortable and happy.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Senior+Cat+Wellness', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(4, 'Dental Health Month', 'Is {{patient_name}}\'s Smile Sparkling?', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Did you know that 80% of cats over age 3 have some form of dental disease?</p><p>This month, we are offering a 10% discount on professional dental cleanings. Bad breath can be a sign of underlying issues. </p><p>Book a dental assessment for {{patient_name}} today!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Dental+Health+Month', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(5, 'Feline Stress Management', 'Helping {{patient_name}} Stay Calm and Happy', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Hi {{owner_name}},</p><p>Cats can be sensitive to changes in their environment. Whether it\'s a new move, a new pet, or even just rearranged furniture, {{patient_name}} might feel a bit stressed.</p><p>Check out our latest blog post on \'Creating a Stress-Free Sanctuary for Your Cat\' for tips on pheromone diffusers, vertical space, and safe hiding spots.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Wellness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Feline+Stress+Management', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(6, 'Weight Management Tips', 'Keeping {{patient_name}} Fit and Fabulous!', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Hi {{owner_name}},</p><p>Maintaining a healthy weight is key to preventing diabetes and joint pain in cats. If {{patient_name}} has gained a little \'extra fluff\' recently, we\'re here to help!</p><p>Schedule a nutrition consultation to find the perfect diet plan for your feline friend.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Wellness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Weight+Management+Tips', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(7, 'Flea & Tick Prevention', 'Don\'t Let the Bugs Bite {{patient_name}}!', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>It\'s parasite season! Even indoor cats like {{patient_name}} can be at risk from hitchhiking fleas or ticks brought in on clothes.</p><p>Pick up your monthly preventative at The Cat Clinic this week. Protect your home and your cat!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Flea+%26+Tick+Prevention', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(8, 'Grooming Services Announcement', 'A Spa Day for {{patient_name}}? Yes Please!', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Is {{patient_name}} struggling with mats or shedding? Our feline-certified groomers specialize in gentle, low-stress grooming.</p><p>Services include:<br>- Lion Cuts<br>- Sanitary Trims<br>- De-shedding Treatments<br>- Nail Trims</p><p>Book {{patient_name}}\\\'s spa day today!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Grooming', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Grooming+Services+Announcement', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(9, 'Indoor Enrichment Guide', 'Boredom Busters for {{patient_name}}', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Hi {{owner_name}},</p><p>Keep {{patient_name}} sharp and active with indoor enrichment! From puzzle feeders to window perches (cat TV!), there are so many ways to engage their natural instincts.</p><p>Need ideas? Stop by our clinic to see our curated selection of feline enrichment toys.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Wellness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Indoor+Enrichment+Guide', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(10, 'Microchipping Safety', 'The Best Way to Bring {{patient_name}} Home', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Collars can break, but a microchip is permanent. If {{patient_name}} ever slips out the door, a microchip is their ticket back to you.</p><p>It\'s a quick, painless procedure that we can do during any visit. Ask us about microchipping {{patient_name}} next time you\'re in!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Microchipping+Safety', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(11, 'Chronic Kidney Disease Awareness', 'Monitoring {{patient_name}}\'s Kidney Health', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Kidney issues are common in older cats. Early detection through bloodwork is the most effective way to manage the condition and maintain quality of life.</p><p>Is {{patient_name}} drinking more water than usual? Let\'s check their levels.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Chronic+Kidney+Disease+Awareness', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(12, 'Post-Surgery Care Instructions', 'Helping {{patient_name}} Recover Comfortably', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Hi {{owner_name}},</p><p>As {{patient_name}} recovers from their recent procedure, please remember to:<br>- Keep them in a quiet, confined space.<br>- Monitor the incision site for redness or swelling.<br>- Ensure they are eating and drinking normally.</p><p>Call us immediately if you have any concerns!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Emergency', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Post-Surgery+Care+Instructions', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(13, 'Holiday Safety Tips', 'Keeping {{patient_name}} Safe This Holiday Season', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>From toxic lilies to dangerous tinsel, the holidays can be tricky for curious cats like {{patient_name}}.</p><p>Check out our \'Holiday Hazard Guide\' to ensure a safe and festive time for your entire family.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Holiday+Safety+Tips', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(14, 'Deworming Schedule', 'Time for {{patient_name}}\'s Routine Deworming', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Routine deworming is essential even for indoor cats. It protects both {{patient_name}} and your family from zoonotic parasites.</p><p>Drop by to pick up {{patient_name}}\\\'s dose today!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Vaccination', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Deworming+Schedule', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(15, 'Feline Nutrition FAQ', 'What Should {{patient_name}} Be Eating?', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Wet food vs. dry food? Grain-free? High protein? Nutrition can be confusing!</p><p>We\'ve compiled an FAQ based on the most common questions from our cat parents. Read more here: [Link]</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Wellness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Feline+Nutrition+FAQ', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(16, 'Diabetes Awareness in Cats', 'Managing Feline Diabetes for {{patient_name}}', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>A diagnosis of diabetes can be overwhelming, but with the right diet and insulin management, cats like {{patient_name}} can live long, happy lives.</p><p>We offer training for home glucose monitoring and injections. You\'re not alone!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Diabetes+Awareness+in+Cats', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(17, 'Summer Heatwave Alert', 'Keep {{patient_name}} Cool This Week!', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Temperatures are rising! Ensure {{patient_name}} has access to plenty of fresh water and a cool, shaded area.</p><p>Signs of heatstroke include panting, lethargy, and bright red gums. If you see these, call us immediately.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Emergency', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Summer+Heatwave+Alert', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(18, 'New Branch Opening', 'The Cat Clinic is Growing!', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>We are excited to announce our newest branch opening in [Location]! </p><p>Now it\'s even easier to get the specialized feline care that {{patient_name}} deserves. Come visit our new state-of-the-art facility!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Newsletter', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=New+Branch+Opening', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(19, 'Refer-a-Friend Rewards', 'Share the Love (and Get a Discount!)', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Hi {{owner_name}},</p><p>Do you have friends with feline family members? Refer them to The Cat Clinic! </p><p>When they book their first visit, both you and your friend will receive 10% off your next consultation. Thank you for being part of our community!</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Newsletter', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=Refer-a-Friend+Rewards', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL),
(20, 'End of Life Support', 'Compassionate Care for {{patient_name}}', '\n<div style=\"font-family: \'Manrope\', Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 20px;\">\n    <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;\">\n        <div style=\"background-color: #084C4B; padding: 40px; text-align: center;\">\n            <img src=\"http://localhost:8000/images/clinic_logo_1777717234.png\" alt=\"The Cat Clinic\" style=\"max-width: 150px; margin-bottom: 20px; border-radius: 12px;\">\n            <h1 style=\"color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;\">The Cat Clinic</h1>\n            <p style=\"color: #2dd4bf; margin: 8px 0 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;\">Specialized Feline Care</p>\n        </div>\n        <div style=\"padding: 50px 40px; color: #334155; line-height: 1.8; font-size: 15px;\">\n            <p>Saying goodbye is the hardest part of being a pet parent. We are here to support you and {{patient_name}} with compassion and dignity.</p><p>We offer hospice care and peaceful end-of-life services when the time comes. Lean on us.</p>\n        </div>\n        <div style=\"padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 11px; font-weight: 600;\">\n            <p style=\"margin: 0; text-transform: uppercase; letter-spacing: 1px;\">© 2026 The Cat Clinic</p>\n            <p style=\"margin: 8px 0 0;\">This email was sent to you because you are a valued client. <br> <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Manage Preferences</a> • <a href=\"#\" style=\"color: #084C4B; text-decoration: none; border-bottom: 1px solid #084C4B;\">Privacy Policy</a></p>\n        </div>\n    </div>\n</div>', 'Health Awareness', 'Live', 'https://placehold.co/600x400/084C4B/FFFFFF?text=End+of+Life+Support', '2026-05-02 08:14:31', '2026-05-02 08:14:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'Others',
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `avatar_path` varchar(255) DEFAULT NULL,
  `last_active_at` timestamp NULL DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `phone`, `address`, `avatar_path`, `last_active_at`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Boss Matt', 'admin@example.com', 'Super Admin', NULL, NULL, NULL, '2026-05-03 01:13:08', '2026-05-01 02:41:57', '$2y$12$KBmAOgJ3ywnQLrjlhj43WODAPGoRwIL7CLDQyetpMi7eDiYqZbj3K', 'IQGX6aWVjw58oiIM0H76r82B5pBhwTVzsIrx3FLu8VdqMjO9Tzk6jhO8EEh1', '2026-05-01 02:41:57', '2026-05-03 01:13:08', NULL),
(2, 'Apollon', 'charles_donor@alterforever.com', 'Marketing', '5094526952', 'Troy Ave, Brooklyn, NY 11213', NULL, NULL, NULL, '$2y$12$SnqWCLncAHxDwfKuoy8es..JlcROu60Hg29ZK/rODfbALbc.wUEHK', NULL, '2026-05-01 20:52:22', '2026-05-01 20:52:22', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_patient_id_foreign` (`patient_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaigns_template_id_foreign` (`template_id`),
  ADD KEY `campaigns_segment_id_foreign` (`segment_id`),
  ADD KEY `campaigns_user_id_foreign` (`user_id`);

--
-- Indexes for table `clinic_settings`
--
ALTER TABLE `clinic_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `segments`
--
ALTER TABLE `segments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `clinic_settings`
--
ALTER TABLE `clinic_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `segments`
--
ALTER TABLE `segments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD CONSTRAINT `campaigns_segment_id_foreign` FOREIGN KEY (`segment_id`) REFERENCES `segments` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `campaigns_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `campaigns_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
