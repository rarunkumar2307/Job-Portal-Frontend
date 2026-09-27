# Job Portal

## Spring Boot Based Online Job Recruitment Management System

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen)
![Spring Security](https://img.shields.io/badge/Spring_Security-Security-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-purple)
![Maven](https://img.shields.io/badge/Maven-Build-red)
![REST API](https://img.shields.io/badge/REST-API-orange)
![Oracle SQL](https://img.shields.io/badge/Oracle-SQL-red)
![License](https://img.shields.io/badge/License-MIT-green)

Job Portal is a Spring Boot based backend application developed to manage the core functionalities of an online recruitment platform. The project follows a layered architecture and demonstrates REST API development using Spring Boot while applying secure authentication and role-based authorization for Candidate, Recruiter, and Admin management.

---

# Features

- Candidate Management
- Recruiter Management
- Admin Management
- User Registration and Login
- JWT Authentication
- Role-Based Authorization
- Candidate Profile Management
- Job Search
- Job Creation
- Job Management
- Job Application
- Application Management
- Application Status Management
- Resume Management
- REST API Development
- Password Encryption
- Exception Handling
- Swagger / OpenAPI Documentation
- Postman API Testing

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| Java | Programming Language |
| Spring Boot | Backend Framework |
| Spring MVC | REST API Development |
| Spring Security | Authentication & Authorization |
| JWT | Authentication |
| Spring Data JPA | Data Access |
| Hibernate | ORM |
| REST API | Backend Communication |
| JDBC | Database Connectivity |
| Oracle Database 21c XE | Database |
| Oracle SQL | Database Management |
| Maven | Build Automation |
| Postman | API Testing |
| Swagger / OpenAPI | API Documentation |
| IntelliJ IDEA | Development Environment |
| Git | Version Control |
| GitHub | Repository Hosting |
| Oracle SQL Developer | Database Management |

---

# Application Workflow

```text
Client Request
      │
      ▼
JWT Authentication
      │
      ▼
REST Controller
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
Spring Data JPA / Hibernate
      │
      ▼
Oracle Database
      │
      ▼
JSON Response
```

---

# Project Structure

```text
Job-Portal
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── jobportal
│   │   │           └── jobportal
│   │   │               ├── controller
│   │   │               ├── dto
│   │   │               ├── entity
│   │   │               ├── repository
│   │   │               ├── security
│   │   │               ├── service
│   │   │               └── JobPortalApplication.java
│   │   │
│   │   └── resources
│   │       └── application.properties
│   │
│   └── test
│
├── .mvn
├── pom.xml
├── mvnw
├── mvnw.cmd
├── README.md
└── LICENSE
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/rarunkumar2307/Job-Portal.git
```

## Navigate to Project

```bash
cd Job-Portal
```

## Build Project

```bash
mvn clean install
```

## Run Application

```bash
mvn spring-boot:run
```

---

# API Documentation

Swagger / OpenAPI documentation is available after starting the application.

```text
http://localhost:8080/swagger-ui.html
```

or

```text
http://localhost:8080/swagger-ui/index.html
```

---

# Database Configuration

The application uses Oracle Database for persistent data storage.

Example configuration:

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/XEPDB1
spring.datasource.username=JOB
spring.datasource.password=JOB
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
```

Make sure Oracle Database is running and the required database user has been configured before starting the application.

---

# Testing

The REST APIs can be tested using Postman.

Main testing areas include:

- User Registration
- User Login
- JWT Authentication
- Job Management
- Candidate Management
- Recruiter Management
- Job Applications
- Application Status
- Admin Operations

---

# Future Enhancements

- Advanced Job Search
- Job Recommendation System
- Resume File Upload
- Email Notifications
- Candidate Dashboard
- Recruiter Dashboard
- Admin Dashboard
- Pagination and Sorting
- Online Interview Management
- Docker Deployment
- Cloud Deployment
- Frontend Integration

---

# Author

**Arun Kumar**

Bachelor of Technology (Information Technology)

Backend Java Developer

### GitHub

https://github.com/rarunkumar2307

---

# License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a Star.
