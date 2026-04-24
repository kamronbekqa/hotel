# 🏖️ Coastal Luxury Dacha - Full Stack Application

Production-ready full-stack application for managing luxury coastal dacha properties with real-time booking system.

## 🚀 Tech Stack

**Frontend:**
- React + Vite
- React Router DOM
- Framer Motion (animations)
- Axios (API calls)
- Context API (state management)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt (password hashing)
- Multer (image uploads)

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies  (already done):
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure random string

4. Seed initial data (creates admin user and sample dachas):
```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@dacha.com`
- Password: `admin123`

5. Start development server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd MAIN_HOTEL
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🎯 Key Features

### User Features
- Browse properties (sale/rent)
- View detailed property information
- Create booking requests
- User registration and authentication

### Admin Features  
- Dashboard with real-time statistics
- Manage dachas (CRUD operations)
- View and manage all bookings
- Approve/reject booking requests
- Upload property images
- JWT-protected admin routes

## 🔐 Authentication

The application uses JWT-based authentication:
- Tokens expire in 30 days
- Admin routes are protected with role-based middleware
- Tokens stored in localStorage on frontend

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Dachas
- `GET /api/dachas` - Get all dachas (public)
- `GET /api/dachas/:id` - Get single dacha (public)
- `POST /api/dachas` - Create dacha (admin only)
- `PUT /api/dachas/:id` - Update dacha (admin only)
- `DELETE /api/dachas/:id` - Delete dacha (admin only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/my` - Get user's bookings (authenticated)
- `PUT /api/bookings/:id` - Update booking status (admin only)
- `DELETE /api/bookings/:id` - Delete booking (admin/owner)
- `GET /api/bookings/stats` - Get dashboard statistics (admin only)

### Upload
- `POST /api/upload` - Upload image (admin only)

## 📁 Project Structure

```
backend/
├── config/          # Database and seed scripts
├── controllers/     # Request handlers
├── middleware/      # Auth, upload, error handling
├── models/          # Mongoose schemas
├── routes/          # API routes
├── uploads/         # Uploaded images
└── server.js        # Express app entry

MAIN_HOTEL/
├── src/
│   ├── components/  # React components
│   ├── context/     # Auth & Language contexts
│   ├── layout/      # Layout components
│   ├── pages/       # Page components
│   ├── services/    # API service layer
│   └── styles/      # Global styles
```

## 🧪 Testing

1. Start both servers (backend and frontend)
2. Navigate to `http://localhost:5173`
3. Login with admin credentials
4. Test property creation, booking management
5. Logout and test user registration/booking flow

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAX_FILE_SIZE=5242880
FRONTEND_URL=http://localhost:5173
```

## 🎨 UI Features

- Premium coastal luxury design
- Smooth page transitions
- Micro-animations
- Responsive layout
- Loading states
- Error handling
- Form validation

## 📝 Notes

- Make sure MongoDB is running before starting the backend
- The premium UI design is preserved - only logic connections added
- Images are stored locally in `backend/uploads/`
- Admin panel shows real-time statistics from database

## 🚧 Future Enhancements

- User profile management
- Advanced search filters
- Payment integration
- Email notifications
- Cloud image storage (AWS S3)
- Rating and review system

---

**Built with ❤️ for coastal luxury living**
# hotel
