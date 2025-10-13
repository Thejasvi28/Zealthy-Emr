# Zealthy EMR & Patient Portal - Technical Submission

## About This Project

I built this EMR and Patient Portal application as my submission for the Zealthy Full Stack Engineering Exercise. The goal was to create a comprehensive system that healthcare providers could use to manage patients, while giving patients easy access to their medical information.

The application includes both an admin interface for healthcare providers and a patient portal, complete with secure authentication, appointment scheduling, prescription management, and a modern, intuitive user interface.

## What I Built

The application has two main parts:

- **Admin EMR Interface** (`/admin`) - Where healthcare providers can manage all patient data
- **Patient Portal** (`/`) - Where patients can log in and view their medical information

## Key Features

### Admin EMR Interface (`/admin`)

For healthcare providers, I created a comprehensive admin interface that handles:

**Patient Management**
- View all patients in a clean table format with key information at a glance
- Add new patients with a detailed form (name, contact info, address, etc.)
- Edit existing patient information, including the ability to clear optional fields
- Quick access to individual patient records

**Appointment Management**
- Schedule new appointments for any patient
- Edit appointment details like provider name, time, and recurrence patterns
- Delete appointments when needed
- Support for recurring appointments (daily, weekly, monthly)

**Prescription Management**
- Add new prescriptions with medication, dosage, and quantity
- Edit prescription details including refill schedules
- Remove prescriptions from patient records
- Track refill dates and schedules

**Data Management**
- Full create, read, update, delete operations for all data
- Form validation to ensure data integrity
- Clear error messages when something goes wrong

### Patient Portal (`/`)

For patients, I built a secure portal where they can:

**Authentication & Security**
- Log in securely using email and password
- Session management that keeps them logged in
- Passwords are properly hashed and stored securely

**Dashboard Overview**
- See upcoming appointments within the next 7 days
- View medications that need refills soon
- Quick overview of their medical information
- Clean, modern interface with smooth animations

**Detailed Information**
- Complete appointment history and upcoming schedule
- All current prescriptions with dosage and refill information
- Access to their personal medical records

## How to Run This Project

You'll need Node.js 18+ and npm installed on your machine.

### Quick Setup

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd zealthy-emr
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/zealthy_emr"
   JWT_SECRET="your-super-secret-jwt-key-here"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Seed the database with sample data
   npx prisma db seed
   ```

4. **Start the app**
   ```bash
   npm run dev
   ```

5. **Open in your browser**
   - Patient Portal: [http://localhost:3000](http://localhost:3000)
   - Admin EMR: [http://localhost:3000/admin](http://localhost:3000/admin)

## Deployment to Vercel

This application is configured for easy deployment to Vercel with PostgreSQL support.

### Prerequisites
- A PostgreSQL database (Vercel Postgres, Neon, Supabase, or Railway)
- A Vercel account

### Deployment Steps

1. **Set up PostgreSQL Database**
   - Use Vercel Postgres (recommended) or any PostgreSQL provider
   - Copy your database connection string

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set these environment variables in Vercel dashboard:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `JWT_SECRET`: A secure random string
     - `NEXT_PUBLIC_BASE_URL`: Your Vercel app URL

3. **Run Database Migrations**
   ```bash
   npx prisma migrate deploy
   ```

4. **Seed Production Database** (optional)
   ```bash
   npx prisma db seed
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Test Login Credentials

I've included some sample patients you can use to test the patient portal:

- **Email**: `mark@some-email-provider.net`
- **Password**: `Password123!`

- **Email**: `lisa@some-email-provider.net`
- **Password**: `Password123!`

The admin interface doesn't require login - you can go directly to `/admin` to test it out.

## Application Architecture

### Frontend Structure
```
app/
├── admin/                    # Admin EMR interface
│   ├── page.tsx            # Patient directory
│   ├── new-patient/        # Add new patient
│   └── patient/[id]/       # Individual patient management
├── portal/                  # Patient portal
│   ├── page.tsx           # Dashboard
│   ├── appointments/      # Appointment views
│   └── prescriptions/     # Prescription views
├── api/                    # API routes
│   ├── auth/              # Authentication endpoints
│   ├── patients/          # Patient management
│   ├── appointments/      # Appointment management
│   └── prescriptions/     # Prescription management
└── globals.css            # Global styles
```

### Database Schema
```
Patient
├── id (String, Primary Key)
├── firstName (String)
├── lastName (String)
├── email (String, Unique)
├── passwordHash (String)
├── phone (String, Optional)
├── address (String, Optional)
├── city (String, Optional)
├── state (String, Optional)
├── zip (String, Optional)
├── dob (DateTime, Optional)
├── appointments (Appointment[])
└── prescriptions (Prescription[])

Appointment
├── id (String, Primary Key)
├── patientId (String, Foreign Key)
├── providerName (String)
├── startAt (DateTime)
├── repeat (Enum: NONE, DAILY, WEEKLY, MONTHLY)
├── repeatInterval (Int)
└── repeatUntil (DateTime, Optional)

Medication
├── id (String, Primary Key)
└── name (String)

Prescription
├── id (String, Primary Key)
├── patientId (String, Foreign Key)
├── medicationId (String, Foreign Key)
├── dosage (String)
├── quantity (Int)
├── refillDate (DateTime, Optional)
└── refillSchedule (Enum: NONE, DAILY, WEEKLY, MONTHLY)
```

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with server components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Modern icon library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Prisma ORM**: Type-safe database access
- **SQLite**: Lightweight database for development
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation and validation

### Development Tools
- **Turbopack**: Fast bundler for development
- **ESLint**: Code linting and formatting
- **Prisma Studio**: Database management interface

## API Endpoints

### Authentication
- `POST /api/auth/login` - Patient login
- `POST /api/auth/logout` - Patient logout

### Patients
- `GET /api/patients` - Get all patients (admin)
- `POST /api/patients` - Create new patient
- `GET /api/patients/[id]` - Get patient details
- `PUT /api/patients/[id]` - Update patient information

### Appointments
- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments` - Update appointment
- `DELETE /api/appointments/[id]` - Delete appointment

### Prescriptions
- `GET /api/prescriptions` - Get prescriptions
- `POST /api/patients/[id]/prescriptions` - Create prescription
- `PUT /api/patients/[id]/prescriptions/[prescriptionId]` - Update prescription
- `DELETE /api/patients/[id]/prescriptions/[prescriptionId]` - Delete prescription

## UI/UX Features

### Design System
- **Glass-morphism**: Modern translucent design elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Responsive Design**: Mobile-first approach
- **Dark Mode Support**: Automatic theme switching
- **Smooth Animations**: Framer Motion powered transitions

### User Experience
- **Intuitive Navigation**: Clear information hierarchy
- **Real-time Feedback**: Loading states and error messages
- **Form Validation**: Client and server-side validation
- **Accessibility**: WCAG compliant design patterns

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate dev # Run migrations
npx prisma db seed   # Seed database
npx prisma studio    # Open database GUI

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Deployment

### Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret-key"
NODE_ENV="development"
```

### Production Deployment
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up production database**
   - Configure PostgreSQL or MySQL for production
   - Update `DATABASE_URL` in environment variables
   - Run migrations: `npx prisma migrate deploy`

3. **Deploy to your platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS, Google Cloud, or Azure

## Testing

### Manual Testing
- **Patient Portal**: Login with sample credentials and explore features
- **Admin Interface**: Access `/admin` and test CRUD operations
- **Responsive Design**: Test on different screen sizes
- **Error Handling**: Test with invalid inputs and network issues

### Sample Data
The database includes:
- 3 sample patients with complete profiles
- Multiple appointments with different providers
- Various prescriptions with refill schedules
- Different medication types

## Requirements Fulfillment

### Section 1 - Mini EMR (`/admin`) - COMPLETED
**Requirement**: Admin interface without authentication for managing patients, appointments, and prescriptions.

**Implementation**:
-  **Patient Directory**: Table view with at-a-glance patient data
-  **Patient CRUD Operations**: Create, Read, Update patient records
-  **New Patient Form**: Comprehensive form for patient creation
-  **Appointment Management**: Full CRUD for patient appointments
-  **Prescription Management**: Complete prescription lifecycle management
-  **Patient Detail Views**: Drill-down capability into individual patient records

### Section 2 - Patient Portal (`/`) - COMPLETED
**Requirement**: Patient portal with login and access to medical information.

**Implementation**:
- **Secure Authentication**: JWT-based login system with sample credentials
- **Dashboard Overview**: Summary of appointments and refills within next 7 days
- **Appointment Schedule**: Complete upcoming appointment view
- **Prescription Details**: Full prescription information and refill schedules
- **Patient Information**: Access to personal medical records  

## Technical Implementation Highlights

### Architecture Decisions
- **Next.js 15 with App Router**: Leveraged latest React features and server components
- **TypeScript**: Full type safety throughout the application
- **Prisma ORM**: Type-safe database operations with SQLite for development
- **JWT Authentication**: Secure session management with httpOnly cookies
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Code Quality
- **Error Handling**: Comprehensive error handling at API and UI levels
- **Form Validation**: Both client-side and server-side validation
- **Loading States**: User feedback during async operations
- **Modern UI/UX**: Glass-morphism design with smooth animations
- **Accessibility**: WCAG compliant design patterns

### Database Design
- **Normalized Schema**: Proper relationships between patients, appointments, and prescriptions
- **Data Integrity**: Foreign key constraints and validation
- **Sample Data**: Pre-seeded database for immediate testing
- **Migration System**: Version-controlled database schema changes

## Demonstration Instructions

### Quick Start
1. **Clone and Install**: `git clone <repo> && npm install`
2. **Setup Database**: `npx prisma migrate dev && npx prisma db seed`
3. **Start Application**: `npm run dev`
4. **Access Application**: 
   - Patient Portal: http://localhost:3000
   - Admin EMR: http://localhost:3000/admin

### Testing Credentials
- **Email**: `mark@some-email-provider.net`
- **Password**: `Password123!`

### Key Features to Test
1. **Admin Interface**: Navigate to `/admin` and test patient management
2. **Patient Creation**: Use "Add New Patient" button to create new records
3. **Patient Editing**: Edit existing patients and clear optional fields
4. **Appointment Management**: Schedule, edit, and delete appointments
5. **Prescription Management**: Add, edit, and remove prescriptions
6. **Patient Portal**: Login and explore dashboard and detailed views

## Conclusion

I really enjoyed building this application! It was a great opportunity to work with modern web technologies and create something that could actually be useful in a healthcare setting.

The project demonstrates my ability to:
- Build full-stack applications with React, Next.js, and TypeScript
- Design and implement secure authentication systems
- Create intuitive user interfaces that work well for both technical and non-technical users
- Handle complex data relationships and CRUD operations
- Write clean, maintainable code with proper error handling

I tried to go beyond just meeting the basic requirements by adding things like:
- Modern UI design with smooth animations
- Comprehensive form validation
- Clear error messages and loading states
- Responsive design that works on mobile devices
- The ability to clear optional fields (which was trickier than it sounds!)

The application is ready to run and test, and I've included sample data so you can see everything in action right away. Feel free to explore both the admin interface and patient portal - I think you'll find it's pretty intuitive to use.

Thanks for the opportunity to work on this project!
