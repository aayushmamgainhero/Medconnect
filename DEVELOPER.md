# Medconnect - Developer Guide

## Architecture Overview

Medconnect is a RESTful API backend for a healthcare appointment and telemedicine platform. It follows a modular architecture with clear separation of concerns.

### Technology Stack
- **Runtime**: Node.js v20.x
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Project Structure

```
medconnect/
├── server/
│   ├── models/           # Database schemas and models
│   │   ├── User.js       # User authentication model
│   │   ├── Patient.js    # Patient profile and medical history
│   │   ├── Doctor.js     # Doctor profile and availability
│   │   └── Appointment.js # Appointment bookings
│   ├── routes/           # API route definitions
│   │   ├── auth.js       # Authentication endpoints
│   │   ├── patients.js   # Patient management endpoints
│   │   ├── doctors.js    # Doctor management endpoints
│   │   └── appointments.js # Appointment endpoints
│   ├── middleware/       # Custom middleware
│   │   └── auth.js       # JWT authentication middleware
│   └── index.js          # Application entry point
├── tests/                # Test files
│   └── api.test.js       # API integration tests
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── LICENSE              # MIT License
└── README.md            # User documentation
```

## Data Models

### User Model
Core authentication model with roles (patient, doctor, admin)
- Fields: name, email, password, role, phone, dateOfBirth, gender, address
- Methods: password hashing, password comparison

### Patient Model
Extended profile for patients
- Fields: bloodGroup, allergies, medicalHistory, medications, emergencyContact, insurance
- References: User model

### Doctor Model
Professional profile for healthcare providers
- Fields: specialty, qualifications, experience, licenseNumber, consultationFee, availability, rating
- References: User model

### Appointment Model
Appointment booking and management
- Fields: patientId, doctorId, appointmentDate, timeSlot, status, reason, notes, prescription
- References: User and Doctor models

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user (patient/doctor)
- `POST /login` - User login
- `GET /profile` - Get authenticated user profile (protected)

### Doctors (`/api/doctors`)
- `GET /` - Get all doctors (with optional filters)
- `GET /:id` - Get doctor by ID
- `GET /specialty/:specialty` - Get doctors by specialty
- `POST /` - Create doctor profile (protected, doctor/admin only)
- `PUT /:id` - Update doctor profile (protected, owner/admin only)

### Patients (`/api/patients`)
- `GET /:id` - Get patient profile (protected)
- `PUT /:id` - Update patient profile (protected, owner/admin only)
- `GET /:id/history` - Get patient medical history (protected)

### Appointments (`/api/appointments`)
- `GET /` - Get appointments (filtered by user role, protected)
- `GET /:id` - Get appointment by ID (protected)
- `POST /` - Create new appointment (protected, patient only)
- `PUT /:id` - Update appointment (protected)
- `DELETE /:id` - Cancel appointment (protected)

## Security Features

### Authentication Flow
1. User registers with email and password
2. Password is hashed using bcrypt before storage
3. Upon login, JWT token is generated and returned
4. Token must be included in Authorization header for protected routes
5. Middleware validates token and attaches user to request object

### Authorization
- Role-based access control (patient, doctor, admin)
- Route-level authorization using authorize middleware
- Resource-level authorization (users can only access their own data)

### Best Practices Implemented
- Password hashing with bcrypt (salt rounds: 10)
- JWT with expiration (30 days)
- Input validation on models
- CORS configuration
- Environment variable protection
- Error handling middleware

## Development Workflow

### Setup
1. Clone the repository
2. Copy `.env.example` to `.env` and configure
3. Install dependencies: `npm install`
4. Start MongoDB service
5. Run development server: `npm run dev`

### Testing
```bash
npm test                    # Run all tests
npm test -- --coverage     # Run with coverage report
```

### Code Quality
```bash
npm run lint               # Check code style
```

## Environment Variables

Required environment variables:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing (use strong random string)
- `NODE_ENV` - Environment (development/production)

## Database Schema Relationships

```
User (1) -----> (1) Patient
User (1) -----> (1) Doctor
Patient (1) ----> (N) Appointment
Doctor (1) -----> (N) Appointment
Doctor (1) -----> (N) Reviews (embedded)
```

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Resource created
- `400` - Bad request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Resource not found
- `500` - Server error

Error responses include:
```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Future Enhancements

Potential features to add:
- Video consultation integration (WebRTC)
- Real-time chat (Socket.io)
- Email/SMS notifications
- Payment processing integration
- File upload for medical documents
- Admin dashboard
- Analytics and reporting
- Multi-language support
- Mobile app integration

## Contributing

1. Create feature branch
2. Implement changes with tests
3. Ensure all tests pass
4. Submit pull request with description

## Deployment Considerations

### Production Checklist
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS/TLS
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB Atlas or managed database
- [ ] Enable rate limiting
- [ ] Set up logging and monitoring
- [ ] Configure backup strategy
- [ ] Implement HIPAA compliance measures (if applicable)
- [ ] Set up CI/CD pipeline
- [ ] Configure environment-specific settings

### Recommended Hosting
- **Backend**: Railway, Heroku, AWS EC2, Google Cloud Run
- **Database**: MongoDB Atlas, AWS DocumentDB
- **Monitoring**: New Relic, Datadog, LogRocket

## Support and Documentation

- GitHub Issues: Report bugs and request features
- API Documentation: Can be enhanced with Swagger/OpenAPI
- Code Documentation: JSDoc comments for complex functions

---

Built with ❤️ for healthcare accessibility
