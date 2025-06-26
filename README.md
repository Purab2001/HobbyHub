# 🎨 HobbyHub - Connect Through Shared Passions

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen)](https://hobbyhub-19bff.web.app/)
[![Server](https://img.shields.io/badge/Server-Online-blue)](https://hobby-hub-server.vercel.app)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-yellow)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.8-blue)](https://tailwindcss.com/)

## 🌟 Overview

**HobbyHub** is a full-stack web application that connects people through shared interests. It provides a platform for users to:

- Discover and join hobby groups
- Create and manage their own communities
- Interact with like-minded enthusiasts
- Share experiences and knowledge

### Key Links
- **Live Client:** [https://hobbyhub-19bff.web.app/](https://hobbyhub-19bff.web.app/)
- **Live Server:** [https://hobby-hub-server.vercel.app](https://hobby-hub-server.vercel.app)

## ✨ Features

### Core Functionality
- **Group Management**:
  - Browse popular hobby groups
  - Create new groups with custom details
  - Manage your created groups
  - Join/leave groups with one click

- **Social Interaction**:
  - Comment on group discussions
  - Like and interact with posts
  - Real-time updates on group activities

- **User Experience**:
  - Responsive design for all devices
  - Light/dark theme toggle
  - Smooth animations and transitions
  - Loading states and error handling

### Dashboard
- All users have access to a personalized dashboard.
- Users can:
  - View an overview of their activity.
  - Manage groups they have created or joined.
  - Update their profile information (display name, photo, bio).
  - See recent activities related to their groups.
- The dashboard centralizes group and profile management for a streamlined experience.

## 🛠️ Tech Stack

### Frontend
- **React** (v19.1) - UI Library
- **Vite** (v6.3.5) - Build Tool
- **Tailwind CSS** (v4.1.8) - Styling
- **React Router** (v7.6.1) - Navigation
- **Lottie** - Animations
- **React Icons** - Icon Library
- **Framer Motion** - Animations

### Backend & Infrastructure
- **Node.js/Express** - REST API server
- **MongoDB (MongoDB Atlas)** - Database
- **Firebase**:
  - Authentication
  - Hosting
  - Real-time Database

- **Vercel**:
  - Server deployment
  - Serverless functions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)
- Firebase account (for authentication)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Purab2001/hobbyhub-client.git
   cd hobbyhub-client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project
   - Update `src/firebase/firebase.init.js` with your credentials

4. Run the development server:
   ```sh
   npm run dev
   ```

5. Build for production:
   ```sh
   npm run build
   ```

## 📂 Project Structure

### Client

```
Client/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images & animations
│   ├── components/       # Reusable components
│   ├── context/          # Context providers
│   ├── firebase/         # Firebase config
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   ├── routes/           # Routing config
│   ├── ui/               # UI elements
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── .eslintrc.js          # ESLint config
├── tailwind.config.js    # Tailwind config
└── vite.config.js        # Vite config
```

### Server

```
Server/
├── index.js             # Express server & API routes
├── package.json         # Server dependencies
├── .gitignore
└── vercel.json          # Deployment config
```

## 🗄️ Backend API

The server (Node.js/Express, MongoDB) exposes the following endpoints:

- `GET /groups` — List all groups
- `GET /groups/:id` — Get a group by ID
- `POST /groups` — Create a new group
- `PUT /groups/:id` — Update a group
- `DELETE /groups/:id` — Delete a group

## 🛠️ Server Setup

1. Navigate to the `Server` directory:
   ```sh
   cd Server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file with your MongoDB credentials:
   ```
   DB_USER=yourMongoUser
   DB_PASS=yourMongoPassword
   PORT=3000
   ```

4. Start the server:
   ```sh
   node index.js
   ```

The server will run on `http://localhost:3000` by default.

## 🗺️ Project Architecture Diagram

```mermaid
graph TD
  A[Client (React)] -->|API Calls| B[Server (Express)]
  B -->|MongoDB Atlas| C[(Database)]
  A -->|Auth| D[Firebase]
  B -->|Deployment| E[Vercel]
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📬 Contact

Abir Shahadat Purab - [a.s.purab0@gmail.com](mailto:a.s.purab0@gmail.com)
