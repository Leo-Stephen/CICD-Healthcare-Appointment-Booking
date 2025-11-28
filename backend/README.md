# Healthcare Appointment Backend

Spring Boot-based REST API for Healthcare Appointment Management System.

## Features
- JWT Authentication with role-based access control
- Patient appointment booking and management
- Doctor schedule management and appointment approval
- Admin panel for user and analytics management
- Real-time WebSocket notifications
- Email confirmations

## Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+

## Environment Variables
- `DB_HOST`: Database host (default: localhost)
- `DB_PORT`: Database port (default: 3306)
- `DB_NAME`: Database name (default: healthcare_db)
- `DB_USER`: Database username (default: root)
- `DB_PASSWORD`: Database password (default: root)
- `JWT_SECRET`: JWT secret key
- `MAIL_HOST`: SMTP server host
- `MAIL_USERNAME`: Email username
- `MAIL_PASSWORD`: Email password

## Build and Run

```bash
# Build
./mvnw clean package

# Run
./mvnw spring-boot:run
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new patient
- `POST /api/auth/login` - User login
- `GET /api/auth/health` - Health check

### Patient (PATIENT role required)
- `GET /api/patient/doctors` - Browse doctors
- `GET /api/patient/specializations` - Get specializations
- `POST /api/patient/appointments` - Book appointment
- `GET /api/patient/appointments` - View my appointments
- `DELETE /api/patient/appointments/{id}` - Cancel appointment

### Doctor (DOCTOR role required)
- `GET /api/doctor/profile` - Get profile
- `GET /api/doctor/appointments` - View appointments
- `PUT /api/doctor/appointments/{id}/approve` - Approve appointment
- `PUT /api/doctor/appointments/{id}/reject` - Reject appointment
- `GET /api/doctor/schedule` - View schedule
- `POST /api/doctor/schedule` - Add schedule
- `GET /api/doctor/patients` - View patients

### Admin (ADMIN role required)
- `GET /api/admin/users` - List all users
- `POST /api/admin/doctors` - Create doctor
- `PUT /api/admin/doctors/{id}` - Update doctor
- `DELETE /api/admin/users/{id}` - Delete user
- `GET /api/admin/analytics` - Get analytics
