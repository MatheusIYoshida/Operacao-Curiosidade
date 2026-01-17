# Operação Curiosidade

A comprehensive profile management system with authentication, built with ASP.NET Core and Angular.

## 📋 About the Project

Operação Curiosidade is a full-stack web application designed for managing user profiles with complete CRUD operations, authentication, and activity logging. The system features a modern interface with real-time notifications, pagination, and detailed reporting capabilities.

### Key Features

- **Authentication & Authorization**: JWT-based authentication with role management (Admin/User)
- **Profile Management**: Complete CRUD operations for user profiles
- **Dashboard**: Real-time statistics and recent activity overview
- **Activity Logs**: Comprehensive tracking of all system operations
- **Reports**: Exportable user reports with print functionality
- **Search & Filtering**: Advanced search capabilities across profiles and logs
- **Responsive Design**: Modern UI built with SCSS and Angular components

## 🛠️ Technologies

### Backend
- **ASP.NET Core 8.0** - Web API framework
- **Entity Framework Core 9.0** - ORM for database operations
- **SQL Server** - Relational database
- **JWT Authentication** - Secure token-based authentication
- **Swagger/OpenAPI** - API documentation

### Frontend
- **Angular 17** - Frontend framework
- **TypeScript 5.2** - Primary development language
- **SCSS** - Styling with variables and mixins
- **RxJS** - Reactive programming
- **Angular Forms** - Reactive forms with validation

## 📁 Project Structure

```
operacao-curiosidade/
├── api/                          # Backend (ASP.NET Core)
│   └── Server/
│       ├── Controllers/          # API endpoints
│       ├── Models/              # Domain models
│       ├── DTOs/                # Data transfer objects
│       ├── Services/            # Business logic
│       ├── Repositories/        # Data access layer
│       ├── Validations/         # Input validation
│       └── Data/                # Database context
│
├── client/                       # Frontend (Angular)
│   └── src/
│       ├── app/
│       │   ├── features/        # Feature modules
│       │   │   ├── auth/        # Authentication
│       │   │   └── main/        # Main application
│       │   ├── layouts/         # Page layouts
│       │   ├── services/        # Angular services
│       │   └── shared/          # Shared components
│       └── styles/              # Global styles
```
