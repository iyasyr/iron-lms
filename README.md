# IronLMS - Learning Management System

A modern, full-stack Learning Management System built with React, Spring Boot, and GraphQL. This project demonstrates advanced web development practices and exceeds the basic CRUD requirements with enterprise-grade features.

## 🚀 Project Overview

IronLMS is a comprehensive learning management system that allows instructors to create courses, lessons, and items, while students can enroll and track their progress. The system features a modern architecture with GraphQL API, real-time updates, and a beautiful, responsive UI.

## ✨ Key Features

### Core Functionality
- **Full CRUD Operations** for Courses, Lessons, Items, and Submissions
- **Advanced Search & Pagination** with server-side filtering
- **User Authentication** with JWT tokens and role-based access control
- **Real-time Health Monitoring** with database connection status
- **Responsive Design** with mobile-first approach
- **Accessibility Features** with proper ARIA labels and keyboard navigation

### Advanced Features (Beyond Requirements)
- **GraphQL API** instead of REST for better performance and flexibility
- **Docker Compose** for easy development and deployment
- **Feature-Sliced Design (FSD)** architecture for scalable frontend
- **TypeScript** throughout the entire stack for type safety
- **Apollo Client** for efficient GraphQL data management
- **Framer Motion** for smooth animations and transitions
- **React Hot Toast** for user-friendly notifications
- **Markdown Support** for rich content creation
- **Role-based Access Control** (Instructor/Student roles)

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Apollo Client** for GraphQL integration
- **Framer Motion** for animations
- **SCSS** for styling with CSS custom properties
- **Feature-Sliced Design** for scalable architecture

### Backend Stack
- **Spring Boot 3** with Java 17
- **GraphQL** with Spring GraphQL
- **JPA/Hibernate** for data persistence
- **PostgreSQL** for production database
- **H2** for development and testing
- **JWT** for authentication
- **Spring Security** for authorization

### DevOps & Infrastructure
- **Docker & Docker Compose** for containerization
- **Nginx** for reverse proxy and static file serving
- **Multi-stage builds** for optimized production images

## 📁 Project Structure

```
iron-lms/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── app/             # Application layer (FSD)
│   │   ├── pages/           # Page components
│   │   ├── features/        # Feature modules
│   │   ├── entities/        # Business entities
│   │   ├── widgets/         # Composite UI blocks
│   │   ├── shared/          # Shared utilities and components
│   │   └── generated/       # GraphQL generated types
│   ├── public/
│   └── package.json
├── backend/                  # Spring Boot application
│   ├── src/main/java/
│   │   └── com/ironhack/lms/
│   │       ├── config/      # Configuration classes
│   │       ├── domain/      # JPA entities
│   │       ├── repository/  # Data access layer
│   │       ├── service/     # Business logic
│   │       └── web/         # GraphQL resolvers
│   ├── src/main/resources/
│   │   └── graphql/         # GraphQL schema files
│   └── pom.xml
├── ops/                      # Docker and deployment configs
│   ├── docker-compose.yml
│   ├── docker-compose.dev.yml
│   └── nginx.conf
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **Java** 17+
- **Docker** and Docker Compose
- **PostgreSQL** (optional, Docker will provide one)

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd iron-lms
   ```

2. **Start all services**
   ```bash
   docker compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend GraphQL Playground: http://localhost:8080/graphiql
   - Health Check: http://localhost:8080/api/health

### Option 2: Local Development

#### Backend Setup
```bash
cd backend

# Install dependencies
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ironlms
SPRING_DATASOURCE_USERNAME=ironlms
SPRING_DATASOURCE_PASSWORD=ironlms

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000

# GraphQL
GRAPHQL_PLAYGROUND_ENABLED=true
```

### Frontend (.env)
```env
VITE_GRAPHQL_ENDPOINT=http://localhost:8080/graphql
VITE_API_BASE_URL=http://localhost:8080
```

## 📊 API Documentation

### GraphQL Schema
The application uses GraphQL instead of REST for better performance and flexibility. Access the interactive GraphQL Playground at `http://localhost:8080/graphiql`.

#### Key Queries
```graphql
# Get all items with search and pagination
query GetItems($search: String, $page: Int, $pageSize: Int) {
  items(search: $search, page: $page, pageSize: $pageSize) {
    content {
      id
      title
      description
      tags
      createdAt
      updatedAt
    }
    pageInfo {
      totalPages
      totalElements
      hasNext
      hasPrevious
    }
  }
}

# Create a new item
mutation CreateItem($input: ItemCreateInput!) {
  createItem(input: $input) {
    id
    title
    description
    tags
  }
}
```

#### Health Check
```bash
curl http://localhost:8080/api/health
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
# or
yarn test
```

### Integration Tests
The project includes comprehensive integration tests for all CRUD operations and GraphQL resolvers.

## 🎨 UI/UX Features

### Design System
- **Dark Theme** with glassmorphism effects
- **Responsive Design** supporting mobile-first approach (≤360px)
- **Smooth Animations** with Framer Motion
- **Accessibility** with proper focus management and ARIA labels
- **Loading States** with skeleton screens
- **Error Handling** with user-friendly messages

### Key Components
- **Reusable Select Components** with custom styling
- **Modal Forms** with multi-step workflows
- **Search with Debouncing** for optimal performance
- **Pagination Controls** with proper navigation
- **Toast Notifications** for user feedback

## 🔐 Authentication & Authorization

### User Roles
- **Instructor**: Can create, edit, and delete courses, lessons, and items
- **Student**: Can view content, enroll in courses, and submit assignments

### Security Features
- JWT-based authentication
- Role-based access control
- Protected routes and API endpoints
- Secure password hashing

## 🐳 Docker Configuration

### Development
```bash
docker compose -f ops/docker-compose.dev.yml up -d
```

### Production
```bash
docker compose up -d
```

### Services
- **Frontend**: React app served by Nginx
- **Backend**: Spring Boot application
- **Database**: PostgreSQL with persistent volumes
- **Reverse Proxy**: Nginx for routing and static files

## 📈 Performance Optimizations

### Frontend
- **Code Splitting** with React.lazy()
- **GraphQL Caching** with Apollo Client
- **Debounced Search** to reduce API calls
- **Optimized Images** and assets
- **Bundle Analysis** and tree shaking

### Backend
- **Connection Pooling** for database connections
- **GraphQL Query Optimization** with DataLoader
- **Caching Strategies** for frequently accessed data
- **Pagination** for large datasets

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend (Render/Fly.io)
```bash
cd backend
./mvnw clean package
# Deploy the JAR file
```

### Docker Production
```bash
docker compose up -d
```

## 🧪 Sample Data

The application includes seed data with:
- Sample courses and lessons
- Test users (instructor and student)
- Example items with various tags
- Realistic content for testing

## 🔍 Monitoring & Health Checks

### Health Endpoints
- `GET /api/health` - Database connection status
- `GET /actuator/health` - Spring Boot actuator health
- GraphQL Playground for API exploration

### Logging
- Structured logging with SLF4J
- Request/response logging
- Error tracking and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Project Goals Achieved

### ✅ Mandatory Requirements
- [x] React frontend with TypeScript
- [x] Spring Boot backend with Java 17
- [x] Full CRUD for Items with real persistence
- [x] List, detail, and create/edit forms
- [x] Real backend integration with loading/error states
- [x] Search functionality for items
- [x] Health check endpoint with connection status
- [x] Comprehensive README with setup instructions

### ✅ Optional Requirements
- [x] Advanced CSS styling with SCSS
- [x] Responsive design (mobile-first, ≤360px)
- [x] Smooth animations with Framer Motion
- [x] JWT authentication with protected routes
- [x] Accessibility features (ARIA labels, focus management)
- [x] Docker Compose for one-command startup
- [x] TypeScript throughout the stack

### 🚀 Beyond Requirements
- [x] GraphQL API instead of REST
- [x] Feature-Sliced Design architecture
- [x] Apollo Client for efficient data management
- [x] Multi-role user system (Instructor/Student)
- [x] Course and Lesson management
- [x] Markdown content support
- [x] Advanced search with tags
- [x] Real-time notifications
- [x] Comprehensive error handling
- [x] Production-ready Docker setup

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using modern web technologies and best practices.**

