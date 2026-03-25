# 🚀 ERP Admin Dashboard (Frontend)

A modern, scalable ERP/Admin Dashboard built with **React, TypeScript, and Tailwind CSS**.  
This project simulates a real-world enterprise dashboard with authentication, analytics, and CRUD interfaces — designed to reflect **production-level frontend architecture**.

---

## ✨ Features

- 🔐 Authentication (fake login with protected routes)
- 📊 Dashboard with analytics & charts
- 👥 User management (table, search, filters, pagination)
- 📦 Orders & products management UI
- 🌙 Dark / Light mode
- ⚡ Loading, error, and empty states
- 🧠 State management with Zustand
- 🔄 Server state handling with React Query
- 🧩 Reusable components & clean architecture
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

- **React (Vite)**
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **TanStack React Query**
- **Zustand**
- **React Hook Form**
- **Recharts**
- **Lucide Icons**

---

## 📁 Project Structure
```bash
src/
├── app/ # App setup (router, providers)
├── components/ # Shared & UI components
├── features/ # Feature-based modules (auth, users, etc.)
├── hooks/ # Custom hooks
├── services/ # API layer (mocked)
├── store/ # Global state (Zustand)
├── data/ # Mock data
├── utils/ # Utility functions
├── types/ # TypeScript types
└── pages/ # Route-level pages
```
---

## 🔐 Authentication (Mocked)

This project uses a simulated authentication flow:
- Login stores a fake token in `localStorage`
- Protected routes restrict access
- Session persists on refresh

---

## 🔄 API Simulation

No backend is used.

All data is:
- mocked locally
- wrapped in async functions
- delayed with `setTimeout` to simulate real API calls

---

## 🚀 Getting Started

### 1. Clone the repository
git clone https://github.com/your-username/erp-dashboard.git
cd erp-dashboard

### 2. Install dependencies
npm install

### 3. Run the app
npm run dev

---

### 🎯 Project Goal

This project is built to:

simulate real-world frontend development
demonstrate mid-level React skills
showcase clean architecture and best practices
📌 Future Improvements
Real backend integration (Spring Boot / Node.js)
Role-based access control (admin/user)
Unit & integration testing
WebSocket / real-time updates
Advanced analytics

### 👨‍💻 Author

- ***Farrukh Tugonov***

Frontend & Fullstack Developer (React + Spring Boot)
Focused on building scalable, production-ready applications

---

### ⭐️ Show your support

If you like this project:

⭐ Star the repo
🍴 Fork it
💬 Share feedback
