# HealthNest Backend

Node.js + Express.js + MongoDB Atlas backend for the HealthNest Hospital Management System.

## Folder Structure

```
backend/
├── config/
│   └── db.js                  # MongoDB Atlas connection
├── controllers/
│   ├── authController.js      # Register, Login, Forgot/Reset Password
│   ├── doctorController.js    # Doctor CRUD
│   ├── appointmentController.js
│   ├── patientController.js
│   ├── contactController.js
│   └── dashboardController.js
├── middleware/
│   ├── auth.js                # JWT protect + adminOnly
│   ├── validate.js            # express-validator error handler
│   └── errorHandler.js        # Centralized error handler
├── models/
│   ├── User.js
│   ├── Doctor.js
│   ├── Appointment.js
│   └── Contact.js
├── routes/
│   ├── authRoutes.js
│   ├── doctorRoutes.js
│   ├── appointmentRoutes.js
│   ├── patientRoutes.js
│   ├── contactRoutes.js
│   └── dashboardRoutes.js
├── scripts/
│   └── seedDoctors.js         # One-time doctor seed script
├── utils/
│   ├── jwt.js
│   └── sendResponse.js
├── .env                       # Environment variables (fill in MONGO_URI)
├── .env.example
├── server.js
└── package.json
```

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment variables
Edit `backend/.env` and replace the placeholder with your real MongoDB Atlas URI:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/healthnest?retryWrites=true&w=majority
```

### 3. Seed initial doctors (optional)
```bash
node backend/scripts/seedDoctors.js
```

### 4. Start the backend
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on **http://localhost:5000**

---

## API Endpoints

### Auth — `/api/auth`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login (user or admin) |
| POST | `/forgot-password` | Request password reset |
| POST | `/reset-password/:token` | Reset password |
| GET  | `/me` | Get current user (protected) |
| PUT  | `/change-password` | Change password (protected) |

### Doctors — `/api/doctors`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | List all doctors (public) |
| GET | `/:id` | Get doctor by ID (public) |
| POST | `/` | Add doctor (admin) |
| PUT | `/:id` | Update doctor (admin) |
| DELETE | `/:id` | Delete doctor (admin) |

### Appointments — `/api/appointments`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/` | Book appointment (protected) |
| GET | `/` | Get appointments (own / all for admin) |
| PUT | `/:id/status` | Update status (admin) |
| PUT | `/:id/reschedule` | Reschedule (protected) |
| DELETE | `/:id` | Delete (protected) |

### Patients — `/api/patients`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/profile` | Own profile (protected) |
| PUT | `/profile` | Update own profile (protected) |
| GET | `/` | All patients (admin) |
| DELETE | `/:id` | Remove patient (admin) |
| PUT | `/:id/status` | Toggle status (admin) |

### Contact — `/api/contact`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/` | Submit contact form (public) |
| GET | `/` | View all contacts (admin) |
| PUT | `/:id/status` | Update status (admin) |

### Dashboard — `/api/dashboard`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Dashboard analytics (admin) |

---

## Admin Credentials
- Email: `admin@healthnest.com`
- Password: `Admin@123`

These are configured via `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).
