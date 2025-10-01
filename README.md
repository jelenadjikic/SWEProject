# 🦷 Dental Clinic Management System

A comprehensive web application for dental clinic management built with the MERN stack (MongoDB, Express.js, React, Node.js). This system provides a complete solution for managing patients, appointments, medical records, and communication between dental staff and patients.

## 🚀 Features

### 👥 User Management
- **Role-based Authentication**: Admin, User (Dentist), and Patient roles
- **Secure Login/Registration**: JWT-based authentication
- **User Profile Management**: Update personal information and change passwords
- **Admin Panel**: Manage users and system settings

### 🏥 Patient Management
- **Patient Registration**: Complete patient information management
- **Patient Search**: Find patients by name
- **Medical Records**: Digital carton system for tracking dental treatments
- **Intervention Tracking**: Record and manage dental procedures
- **Patient History**: Complete treatment history

### 📅 Appointment Scheduling
- **Appointment Booking**: Patients can request appointments
- **Schedule Management**: Dentists can manage their schedules
- **Appointment Approval**: Admin approval system for appointments
- **Time Slot Management**: Efficient time slot allocation

### 💬 Communication System
- **Messaging**: Direct communication between patients and dental staff
- **Forum**: Q&A system where patients can ask questions
- **Answer System**: Dentists can provide professional answers
- **Notification System**: Unread message tracking

### 🦷 Dental Services
- **Aesthetic Dentistry**: Information about cosmetic dental procedures
- **Oral Surgery**: Surgical procedure information
- **Endodontics**: Root canal treatment information
- **Service Gallery**: Visual showcase of dental work

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **GraphQL**: API query language and runtime
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: Frontend library
- **Apollo Client**: GraphQL client
- **React Router**: Client-side routing
- **Bootstrap**: CSS framework
- **Reactstrap**: Bootstrap components for React
- **Font Awesome**: Icons
- **React Image Lightbox**: Image gallery functionality

## 📁 Project Structure

```
SWEProject-main/
├── app.js                 # Main server file
├── config/               # Configuration files
├── middlewares/          # Authentication middleware
├── models/              # MongoDB models
├── resolvers/           # GraphQL resolvers
├── schema/              # GraphQL schema
├── react-app/           # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── auth/    # Authenticated components
│   │   │   │   ├── forum/      # Forum functionality
│   │   │   │   ├── messages/   # Messaging system
│   │   │   │   ├── patients/   # Patient management
│   │   │   │   ├── schedual/   # Scheduling system
│   │   │   │   └── users/      # User management
│   │   │   └── pages/   # Public pages
│   │   ├── context/     # React context
│   │   ├── mutations/   # GraphQL mutations
│   │   ├── queries/     # GraphQL queries
│   │   └── middleware/  # Frontend middleware
│   └── public/          # Static assets
└── package.json         # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SWEProject-main
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd react-app
   npm install
   cd ..
   ```

4. **Configure MongoDB**
   - Update the MongoDB connection string in `app.js`
   - Replace the connection string with your MongoDB instance

5. **Configure JWT Secret**
   - Update the secret key in `config/default.json`

### Running the Application

1. **Start the backend server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:4000`

2. **Start the React frontend**
   ```bash
   cd react-app
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 🔧 Configuration

### Environment Variables
- **PORT**: Server port (default: 4000)
- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT tokens

### Database Setup
The application uses MongoDB with the following main collections:
- **Users**: System users (admin, dentists)
- **Patients**: Patient information
- **Questions**: Forum questions
- **Answers**: Forum answers
- **Messages**: Communication messages
- **Schedules**: Appointment schedules
- **Interventions**: Medical procedures
- **Cartons**: Dental treatment records

## 👤 User Roles

### Admin
- Manage all users
- View system statistics
- Approve appointments
- System configuration

### User (Dentist)
- Manage patients
- View and respond to messages
- Answer forum questions
- Manage appointments
- Record interventions

### Patient
- View personal information
- Request appointments
- Send messages to dental staff
- Ask questions in forum
- View treatment history

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected routes
- Input validation
- CORS configuration

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
