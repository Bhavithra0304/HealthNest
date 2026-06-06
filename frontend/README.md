# 🏥 HealthNest — Hospital Management System

## 🌟 Overview

**HealthNest** is a production-ready Hospital Management System frontend designed to manage patients, doctors, and appointments. It features a complete authentication system using `localStorage` and `sessionStorage`, protected routes, a full admin dashboard, and a professional public-facing website — all built without any CSS framework.

---

## ✨ Features

### 🌐 Public Website
- **Home Page** — Hero section, statistics, services, featured doctors, testimonials, emergency banner
- **About Page** — Hospital history, mission, vision, key features
- **Services Page** — 12 medical specialties with cards
- **Doctors Page** — Searchable and filterable doctor directory
- **Contact Page** — Contact form with validation + contact info
- **FAQ Page** — Accordion-style frequently asked questions
- **Privacy Policy** — Full privacy policy content
- **Terms & Conditions** — Full terms content

### 🔐 Authentication
- **Register** — Full form with validation, duplicate email prevention, stores in `localStorage`
- **Login** — Email + password with **Remember Me** toggle
  - ✅ Remember Me checked → `localStorage`
  - ✅ Remember Me unchecked → `sessionStorage`
- **Forgot Password** — Email verification flow
- **Logout** — Clears all storage, redirects to Login
- **User display** in Header with dropdown menu after login

### 🛡️ Protected Routes
Only authenticated users can access:
- `/appointment` — Book Appointment
- `/admin` — Admin Dashboard
- `/admin/doctors` — Manage Doctors
- `/admin/patients` — Manage Patients
- `/admin/appointments` — Manage Appointments

### 🏥 Appointment Booking
- Pre-filled user data from session
- Doctor & department selection
- Date & time slot picker
- Stores appointments in `localStorage`
- Confirmation screen after booking

### 👨‍💼 Admin Panel
- Fixed full-height sidebar with gradient design
- Dashboard with live stats from `localStorage`
- Recent appointments table
- Department load progress bars
- Recent activity feed
- Manage Doctors — view, search, delete
- Manage Patients — view, search, delete
- Manage Appointments — view, search, update status, delete

---

## 🛠️ Tech Stack

| Technology      | Purpose                          |
|-----------------|----------------------------------|
| React 18        | UI component framework           |
| React Router v7 | Client-side routing              |
| React Icons v5  | Icon library (FontAwesome, etc.) |
| Pure CSS3       | Styling — Flexbox & CSS Grid     |
| localStorage    | Persistent auth & data storage   |
| sessionStorage  | Session-based auth storage       |

---

## 📁 Project Structure

```
src/
│
├── Assets/
│   ├── css/
│   │   ├── global.css        
│   │   ├── header.css       
│   │   ├── footer.css        
│   │   ├── home.css          
│   │   ├── auth.css          
│   │   ├── admin.css         
│   │   └── pages.css         
│   └── images/
│
├── Components/
│   ├── Header.jsx            
│   ├── Footer.jsx            
│   ├── Hero.jsx              
│   ├── ServiceCard.jsx       
│   ├── DoctorCard.jsx        
│   ├── FAQAccordion.jsx      
│   ├── StatsSection.jsx      
│   ├── ProtectedRoute.jsx    
│   └── AdminSidebar.jsx      
│
├── Pages/
│   ├── Home.jsx              
│   ├── About.jsx             
│   ├── Services.jsx          
│   ├── Doctors.jsx           
│   ├── Appointment.jsx       
│   ├── Contact.jsx           
│   ├── FAQ.jsx               
│   ├── PrivacyPolicy.jsx    
│   ├── TermsAndConditions.jsx
│   ├── Login.jsx             
│   ├── Register.jsx          
│   ├── ForgotPassword.jsx    
│   ├── AdminDashboard.jsx    
│   ├── ManageDoctors.jsx     
│   ├── ManagePatients.jsx    
│   ├── ManageAppointments.jsx
│   └── NotFound.jsx          
│
├── Routers/
│   └── AppRoutes.jsx         
│
├── App.jsx                   
└── index.js                  
```

---

## 🔐 Authentication

### Regular User

| Step        | Details                                               |
|-------------|-------------------------------------------------------|
| Register    | Go to `/register`, fill the form, submit              |
| Login       | Go to `/login`, enter credentials                     |
| Remember Me | Checked → `localStorage` / Unchecked → `sessionStorage` |
| After Login | Redirected to `/appointment`, name shown in Header    |
| Logout      | Click user dropdown → Logout → clears storage         |

### Admin Login


| Field    | Value                      |
|----------|----------------------------|
| Email    | `admin@healthnest.com`     |
| Password | `Admin@123`                |
| Redirect | `/admin` (Admin Dashboard) |

---

## 👨‍💼 Admin Panel

Access the admin panel at `/admin` after logging in with admin credentials.

### Dashboard
- **Total Patients** — live count from `localStorage`
- **Total Doctors** — static (12)
- **Appointments Today** — filtered by today's date
- **Departments** — static (25)
- Recent Appointments table
- Department Load progress bars
- Recent Activity feed

### Sidebar Navigation
- Dashboard
- Manage Doctors
- Manage Patients
- Manage Appointments
- Logout

---

## 🗺️ Pages & Routes

| Route                   | Page                  | Access     |
|-------------------------|-----------------------|------------|
| `/`                     | Home                  | Public     |
| `/about`                | About                 | Public     |
| `/services`             | Services              | Public     |
| `/doctors`              | Doctors               | Public     |
| `/contact`              | Contact               | Public     |
| `/faq`                  | FAQ                   | Public     |
| `/privacy-policy`       | Privacy Policy        | Public     |
| `/terms`                | Terms & Conditions    | Public     |
| `/login`                | Login                 | Public     |
| `/register`             | Register              | Public     |
| `/forgot-password`      | Forgot Password       | Public     |
| `/appointment`          | Book Appointment      | 🔒 Auth    |
| `/admin`                | Admin Dashboard       | 🔒 Admin   |
| `/admin/doctors`        | Manage Doctors        | 🔒 Admin   |
| `/admin/patients`       | Manage Patients       | 🔒 Admin   |
| `/admin/appointments`   | Manage Appointments   | 🔒 Admin   |
| `*`                     | 404 Not Found         | Public     |

---








