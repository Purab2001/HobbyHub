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

## 🛠️ Tech Stack

### Frontend
- **React** (v18.2.0) - UI Library
- **Vite** (v4.4.5) - Build Tool
- **Tailwind CSS** (v3.3.3) - Styling
- **React Router** (v6.4) - Navigation
- **Lottie** - Animations
- **React Icons** - Icon Library
- **Framer Motion** - Animations

### Backend & Infrastructure
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

```
hobbyhub-client/
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

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📬 Contact

Abir Shahadat Purab - [a.s.purab0@gmail.com](mailto:a.s.purab0@gmail.com)
