# Medconnect

A comprehensive healthcare platform connecting patients with medical professionals, enabling appointment booking, telemedicine consultations, and medical record management.

## Features

- **User Authentication**: Secure registration and login for patients and healthcare providers
- **Appointment Booking**: Schedule appointments with doctors based on their availability
- **Profile Management**: Comprehensive profiles for both patients and doctors
- **Medical Records**: Secure storage and management of patient medical history
- **Telemedicine**: Video consultations and real-time messaging
- **Notifications**: Automated reminders for appointments and medications
- **Admin Dashboard**: Comprehensive management interface for administrators

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **React.js** with modern hooks
- **React Router** for navigation
- **Axios** for API calls
- **Material-UI** or Bootstrap for UI components

## Project Structure

```
medconnect/
├── server/              # Backend application
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── config/         # Configuration files
│   └── index.js        # Entry point
├── client/             # Frontend application
│   ├── public/         # Static files
│   └── src/           # React source code
│       ├── components/ # Reusable components
│       ├── pages/      # Page components
│       ├── services/   # API services
│       └── App.js      # Main component
├── package.json        # Dependencies
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aayushmamgainhero/Medconnect.git
cd Medconnect
```

2. Install dependencies for both server and client:
```bash
npm run install-all
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medconnect
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the development server:
```bash
# Start backend server
npm run server

# In another terminal, start frontend
npm run client
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/specialty/:specialty` - Get doctors by specialty

### Patients
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient profile
- `GET /api/patients/:id/history` - Get medical history

## Security Features

- Password encryption using bcrypt
- JWT-based authentication
- Protected routes and API endpoints
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

Run tests with:
```bash
npm test
```

## Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy using platform-specific commands

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder

## License

This project is licensed under the MIT License.

## Compliance Note

This application is designed for educational purposes. For production use in healthcare:
- Ensure HIPAA compliance (US) or equivalent regulations in your region
- Implement proper data encryption at rest and in transit
- Regular security audits
- Proper access controls and audit logging
- Patient data privacy protections

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Healthcare technology community
- Open-source contributors
- Medical professionals for feature guidance