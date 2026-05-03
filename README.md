# MassMailer: Clinic Management & Campaign Launchpad

![Version](https://img.shields.io/badge/version-1.4.1--alpha-teal)
![Laravel](https://img.shields.io/badge/Laravel-11.x-red)
![React](https://img.shields.io/badge/React-18.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-teal)

## 📋 Project Description
**MassMailer** is a high-performance, all-in-one administrative suite designed specifically for veterinary clinics and healthcare providers. It merges robust patient record management with a powerful marketing launchpad, allowing clinics to automate engagement, track growth analytics, and manage multi-branch logistics from a single, premium dashboard.

---

## 🎯 Key Objectives
- **Centralized Administration**: Manage patient health records, staff presence, and branch logistics in one unified interface.
- **Data-Driven Marketing**: Leverage clinic data to launch targeted email campaigns with real-time ROI tracking.
- **Operational Efficiency**: Streamline scheduling via an interactive calendar and automate reporting via the custom Reports Engine.
- **Staff Transparency**: Monitor real-time staff presence and workload across multiple branch locations.

---

## ✨ Key Features

### 🚀 Campaign Launchpad
- **Bulk Email Engine**: Send high-volume communications with ease.
- **SMTP Integration**: Fully configurable mail server settings with support for secure TLS/SSL.
- **Performance ROI**: Track reach and success rates for every initiative.

### 📊 Reports Engine
- **Master Logs**: Export the entire patient database to CSV for offline auditing.
- **Growth Summary**: Generate monthly registration and engagement summaries.
- **Campaign Analytics**: Deep-dive into campaign performance and recipient reach.

### 📅 Interactive Calendar
- **Dynamic Scheduling**: Manage appointments with a drag-and-drop feel.
- **Status Filtering**: Instantly filter by *Confirmed*, *Pending*, or *Cancelled* status.
- **Real-time Updates**: Visual legend for quick assessment of the day's agenda.

### 🐾 Patient Management
- **Health Scores**: Intelligent tracking of patient wellness and vaccination status.
- **Medical History**: JSON-aware search for chronic conditions (e.g., Diabetes).
- **Breed & Vitals**: Detailed biological and clinical tracking for feline and canine patients.

### ⚙️ Workspace Settings
- **Multi-Branch Tracking**: Assign staff to different clinic locations.
- **Staff Presence Hub**: Monitor which users are currently online and active.
- **Role Management**: Granular control over permissions and access levels.

---

## 👥 User Roles
| Role | Permissions |
| :--- | :--- |
| **Super Admin** | Full system control, user management, and global configuration. |
| **Admin** | Clinic profile management, report generation, and data audits. |
| **Marketing** | Campaign creation, template management, and ROI tracking. |
| **Recepts** | Patient intake, scheduling, and calendar management. |
| **Others** | View-only access or limited operational permissions. |

---

## 🛠️ Technology Stack
- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 18 with Inertia.js (Modern SPA experience)
- **Styling**: Tailwind CSS 3 (including Dark Mode support)
- **Database**: MySQL 8.x / MariaDB
- **Build Tool**: Vite
- **Mail**: SMTP-based mailing with Laravel Mailer

---

## 📥 Installation Guide

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & NPM
- MySQL/MariaDB

### 1. Clone the Repository
```bash
git clone https://github.com/Makz09/MassMailer.git
cd MassMailer
```

### 2. Environmental Setup
Copy the example environment file and generate your application key:
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Dependency Installation
Install both backend and frontend dependencies:
```bash
composer install
npm install
```

### 4. Database Setup
Configure your database credentials in the `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mass_mailer
DB_USERNAME=root
DB_PASSWORD=your_password
```

Run the migrations and seeders:
```bash
php artisan migrate --seed
```

### 5. Start the Application
Run the development server and the asset compiler:
```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev

# Terminal 3 (for Background Jobs/Emails)
php artisan queue:work
```

---

## 📖 Usage Guide
- **Login**: Use the credentials created via the seeder (default: `admin@example.com` / `password`).
- **Dashboard**: Use the bento-grid widgets to see real-time clinic health.
- **Launchpad**: Set up your SMTP credentials in `Settings` before launching your first campaign.
- **Presence**: Check who is online in the `Workspace Settings` under the *Presence Hub*.

---

## 📄 License
This project is open-sourced software licensed under the **MIT license**.

---

*Built with ❤️ by the MassMailer Team*
