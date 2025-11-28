# 🏥 Healthcare Appointment Management System

A complete, production-ready healthcare appointment management platform built with modern technologies and best practices.

![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Spring%20Boot%20%7C%20MySQL-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange)
![Deployment](https://img.shields.io/badge/Deployment-Kubernetes%20%7C%20Docker-blue)

## ✨ Features

### For Patients
- 🔐 Secure registration and authentication
- 👨‍⚕️ Browse doctors by specialization
- 📅 Book appointments with real-time availability
- 📧 Email confirmations for appointments
- 🔔 Real-time WebSocket notifications
- ❌ Cancel or reschedule appointments
- 📱 Fully responsive mobile-first design

### For Doctors
- 📊 Comprehensive dashboard with statistics
- ✅ Approve or reject appointment requests
- 📅 Manage weekly availability schedule
- 👥 View patient history and appointments
- 🔔 Real-time notifications for new bookings
- 📈 Track appointments by status

### For Administrators
- 📊 System-wide analytics dashboard
- 👥 Complete user management (CRUD)
- ➕ Add and manage doctors
- 📈 View appointment statistics
- 🔍 Monitor system health

### Technical Features
- 🔑 JWT-based authentication with role-based access control (RBAC)
- 🔄 Real-time WebSocket notifications using STOMP/SockJS
- 📧 Email service integration for confirmations
- 🌙 Dark/Light theme toggle with persistence
- 🎨 Beautiful UI with Tailwind CSS and micro-interactions
- ♿ Accessibility-first design (ARIA labels, keyboard navigation)
- 🐳 Full Docker and Kubernetes support
- 🚀 CI/CD pipelines with GitHub Actions
- 📦 Automated deployment with Ansible

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **SockJS + STOMP** - WebSocket communication
- **React Hot Toast** - Elegant notifications
- **Headless UI** - Accessible components
- **Heroicons** - Beautiful icons
- **date-fns** - Date formatting
- **Vite** - Build tool

### Backend
- **Spring Boot 3.2** - Java framework
- **Spring Security** - Authentication & authorization
- **JWT** - Token-based auth
- **Spring Data JPA** - Database access
- **MySQL** - Relational database
- **WebSocket** - Real-time communication
- **JavaMail** - Email service
- **Lombok** - Boilerplate reduction
- **Maven** - Build tool

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Local orchestration
- **Kubernetes** - Container orchestration
- **GitHub Actions** - CI/CD pipelines
- **Ansible** - Infrastructure automation
- **Nginx** - Web server

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local frontend development)
- Java 17+ (for local backend development)
- MySQL 8.0+ (if running without Docker)

### One-Command Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd last-health-medi

# Start all services
docker-compose up -d
```

That's it! The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **MySQL**: localhost:3306

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Patient** | john.doe@email.com | patient123 |
| **Doctor** | dr.sarah.johnson@healthcare.com | doctor123 |
| **Admin** | admin@healthcare.com | admin123 |

## 📋 Manual Setup

<details>
<summary>Click to expand manual setup instructions</summary>

### Backend Setup

```bash
cd backend

# Configure database (edit application.yml or set environment variables)
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=healthcare_db
export DB_USER=root
export DB_PASSWORD=root

# Build and run
./mvnw clean package
./mvnw spring-boot:run
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure API URL (edit .env file)
echo "VITE_API_URL=http://localhost:8080/api" > .env
echo "VITE_WS_URL=http://localhost:8080/api/ws" >> .env

# Start development server
npm run dev
```

### Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE healthcare_db;

# Run schema and seed files
mysql -u root -p healthcare_db < database/schema.sql
mysql -u root -p healthcare_db < database/seed.sql
```

</details>

## 🐳 Docker Hub Images

### Building and Pushing Images

```bash
# Backend
cd backend
docker build -t YOUR_USERNAME/healthcare-backend:latest .
docker push YOUR_USERNAME/healthcare-backend:latest

# Frontend
cd frontend
docker build -t YOUR_USERNAME/healthcare-frontend:latest .
docker push YOUR_USERNAME/healthcare-frontend:latest
```

### Using Pre-built Images

Update `YOUR_USERNAME` in:
- `k8s/backend-deployment.yaml`
- `k8s/frontend-deployment.yaml`

## ☸️ Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (minikube, EKS, GKE, AKS, etc.)
- kubectl configured
- Ingress controller (nginx recommended)

### Manual Deployment

```bash
# Apply manifests in order
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml

# Check status
kubectl get pods
kubectl get services
kubectl get ingress
```

### Automated Deployment with Ansible

```bash
# Install Ansible and Kubernetes collection
pip install ansible
ansible-galaxy collection install kubernetes.core

# Run playbook
cd ansible
ansible-playbook -i inventory.ini playbook.yml
```

## 📁 Project Structure

```
healthcare-appointment-system/
├── backend/                  # Spring Boot backend
│   ├── src/main/java/com/healthcare/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # REST controllers
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data repositories
│   │   ├── security/        # JWT security
│   │   ├── service/         # Business logic
│   │   └── dto/             # Data transfer objects
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   └── services/        # API services
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── database/                 # Database files
│   ├── schema.sql           # Database schema
│   └── seed.sql             # Sample data
├── k8s/                      # Kubernetes manifests
│   ├── mysql-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── secrets.yaml
│   └── ingress.yaml
├── ansible/                  # Ansible automation
│   ├── playbook.yml
│   └── inventory.ini
├── .github/workflows/        # CI/CD workflows
│   ├── backend-ci.yml
│   └── frontend-ci.yml
├── docker-compose.yml
└── README.md
```

## 🔄 CI/CD Pipeline

The project includes automated CI/CD workflows using GitHub Actions:

### Setup

1. Add secrets to your GitHub repository:
   - `DOCKER_USERNAME` - Your Docker Hub username
   - `DOCKER_PASSWORD` - Your Docker Hub password/token

2. Push to main branch - workflows will automatically:
   - Build and test the code
   - Create Docker images
   - Push images to Docker Hub
   - Tag images with commit SHA

### Workflows

- **Backend CI/CD** (`.github/workflows/backend-ci.yml`)
  - Triggers on changes to `backend/` directory
  - Builds with Maven
  - Runs tests
  - Builds and pushes Docker image

- **Frontend CI/CD** (`.github/workflows/frontend-ci.yml`)
  - Triggers on changes to `frontend/` directory
  - Builds with npm
  - Builds and pushes Docker image

## 📊 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register       # Register new patient
POST /api/auth/login          # User login
GET  /api/auth/health         # Health check
```

### Patient Endpoints (Requires PATIENT role)

```http
GET    /api/patient/doctors              # Browse doctors
GET    /api/patient/specializations      # Get specializations
POST   /api/patient/appointments         # Book appointment
GET    /api/patient/appointments         # View appointments
DELETE /api/patient/appointments/:id     # Cancel appointment
```

### Doctor Endpoints (Requires DOCTOR role)

```http
GET  /api/doctor/profile                 # Get profile
GET  /api/doctor/appointments            # View appointments
PUT  /api/doctor/appointments/:id/approve # Approve appointment
PUT  /api/doctor/appointments/:id/reject  # Reject appointment
GET  /api/doctor/schedule                # View schedule
POST /api/doctor/schedule                # Add schedule
GET  /api/doctor/patients                # View patients
```

### Admin Endpoints (Requires ADMIN role)

```http
GET    /api/admin/users          # List all users
POST   /api/admin/doctors        # Create doctor
PUT    /api/admin/doctors/:id    # Update doctor
DELETE /api/admin/users/:id      # Delete user
GET    /api/admin/analytics      # Get analytics
```

## 🔧 Configuration

### Environment Variables

#### Backend
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=healthcare_db
DB_USER=root
DB_PASSWORD=root
JWT_SECRET=your-jwt-secret-key
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

#### Frontend
```env
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=http://localhost:8080/api/ws
```

## 🧪 Testing

```bash
# Backend tests
cd backend
./mvnw test

# Frontend tests (if implemented)
cd frontend
npm test

# Integration tests
docker-compose up -d
# Test endpoints with curl or Postman
```

## 🎨 UI/UX Features

- **Medical Blue Color Palette** - Professional healthcare aesthetic
- **Dark Mode** - Eye-friendly dark theme with smooth transitions
- **Micro-interactions** - Hover effects, loading states, animations
- **Card-based Layouts** - Clean, organized information display
- **Gradient Icons** - Beautiful, modern icon design
- **Responsive Grid** - Mobile-first, fully responsive design
- **Custom Scrollbar** - Styled scrollbars for better UX
- **Toast Notifications** - Elegant, non-intrusive notifications
- **Modal Dialogs** - Accessible, smooth modal transitions
- **Loading States** - Skeleton loaders and spinners

## 🔒 Security Features

- JWT token-based authentication
- Password encryption with BCrypt
- Role-based access control (RBAC)
- CORS configuration
- SQL injection protection (JPA/Prepared Statements)
- XSS protection headers
- Secure WebSocket connections
- Environment variable management
- Kubernetes secrets for sensitive data

## 📈 Scalability

- **Backend**: Stateless design, horizontal scaling with replicas
- **Database**: MySQL with persistent volumes
- **Frontend**: CDN-ready static files
- **Load Balancing**: Kubernetes services with multiple replicas
- **Caching**: Nginx static asset caching
- **Health Checks**: Liveness and readiness probes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ using agentic coding

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review demo credentials above

---

**Happy Coding! 🚀**
