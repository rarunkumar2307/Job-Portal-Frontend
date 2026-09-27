# Job Portal Frontend

## React Based Job Recruitment Management System

![React](https://img.shields.io/badge/React-18%2B-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![CSS](https://img.shields.io/badge/CSS-Styling-blue)
![REST API](https://img.shields.io/badge/REST-API-orange)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-green)
![npm](https://img.shields.io/badge/npm-Package-red)
![License](https://img.shields.io/badge/License-MIT-green)

Job Portal Frontend is a modern web interface for an online recruitment management system. It provides a user-friendly interface for Candidates, Recruiters, and Admins to interact with the Job Portal backend through REST APIs.

The frontend communicates with the Spring Boot backend for authentication, job management, candidate management, recruiter management, and application-related operations.

---

# Features

- User Registration
- User Login
- Role-Based User Interface
- Candidate Interface
- Recruiter Interface
- Admin Interface
- Job Listing
- Job Search
- Job Details
- Job Management
- Job Application
- Application Management
- Candidate Profile
- Recruiter Management
- Admin Management
- JWT Authentication
- Protected Routes
- REST API Integration
- Responsive User Interface
- API Error Handling
- Loading State Handling

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend Library |
| JavaScript | Programming Language |
| Vite | Development & Build Tool |
| HTML5 | Page Structure |
| CSS3 | Styling |
| REST API | Backend Communication |
| JWT | Authentication |
| Node.js | JavaScript Runtime |
| npm | Package Management |
| Git | Version Control |
| GitHub | Repository Hosting |
| IntelliJ IDEA / VS Code | Development Environment |

---

# Application Architecture

```text
User
 │
 ▼
React Frontend
 │
 ├── Authentication
 ├── Job Management
 ├── Candidate Management
 ├── Recruiter Management
 └── Admin Management
 │
 ▼
REST API
 │
 ▼
Spring Boot Backend
 │
 ▼
Spring Security + JWT
 │
 ▼
Service Layer
 │
 ▼
Repository Layer
 │
 ▼
Oracle Database
```

---

# Application Workflow

```text
User Opens Application
        │
        ▼
      Login
        │
        ▼
JWT Authentication
        │
        ▼
Role Identification
        │
 ┌──────┼────────┐
 ▼      ▼        ▼
Candidate Recruiter Admin
 │        │        │
 ▼        ▼        ▼
Jobs    Manage   Manage
Apply   Jobs     Users
 │        │        │
 └────────┼────────┘
          ▼
      REST APIs
          │
          ▼
   Spring Boot Backend
          │
          ▼
      Oracle Database
```

---

# Project Structure

```text
job-portal-frontend
│
├── public
│
├── src
│   ├── assets
│   │
│   ├── components
│   │
│   ├── pages
│   │
│   ├── services
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# Prerequisites

Before running the project, make sure the following are installed:

- Node.js
- npm
- Git
- Job Portal Spring Boot Backend

Check Node.js version:

```bash
node -v
```

Check npm version:

```bash
npm -v
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/rarunkumar2307/Job-Portal-Frontend.git
```

## Navigate to Project

```bash
cd Job-Portal-Frontend
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Backend Integration

This frontend is designed to communicate with the Job Portal Spring Boot backend through REST APIs.

The backend should be running before using features that require server-side data.

Default backend URL:

```text
http://localhost:8080
```

Frontend requests are sent to the backend REST API for operations such as:

- Authentication
- User Management
- Job Management
- Candidate Management
- Recruiter Management
- Application Management
- Admin Operations

---

# Authentication

The application uses JWT-based authentication provided by the Spring Boot backend.

```text
Login
  │
  ▼
Spring Boot Authentication API
  │
  ▼
JWT Token
  │
  ▼
Frontend
  │
  ▼
Authenticated API Requests
```

Protected functionality requires a valid authentication token.

---

# Development

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# Production Build

To create an optimized production build:

```bash
npm run build
```

The production files will be generated in:

```text
dist/
```

---

# Backend Requirement

The frontend requires the Job Portal Spring Boot backend for API-based functionality.

Backend technologies include:

- Java
- Spring Boot
- Spring MVC
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Oracle SQL
- REST APIs

---

# Future Enhancements

- Advanced Job Search
- Resume Upload Interface
- Email Notification Interface
- Candidate Dashboard Enhancements
- Recruiter Dashboard Enhancements
- Admin Dashboard Enhancements
- Application Tracking
- Job Recommendation Interface
- Pagination and Sorting
- Online Interview Management
- Docker Deployment
- Cloud Deployment

---

# Author

**Arun Kumar**

Bachelor of Technology (Information Technology)

Java Backend Developer

### GitHub

https://github.com/rarunkumar2307

### LinkedIn

https://www.linkedin.com/in/arunkumar2307/

---

# License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a Star.
