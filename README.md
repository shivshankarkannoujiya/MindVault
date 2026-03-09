# 🧠 MindVault

**Your Digital Second Brain** – Save, organize, and retrieve your knowledge effortlessly.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)

---

## 📖 Overview

MindVault is a modern knowledge management platform that helps you collect, organize, and retrieve information from across the web. Stop losing important links, tweets, and ideas – build your personal knowledge base with an intuitive and elegant interface.

### ✨ Key Features

- **🔖 Content Management** – Save and organize links, tweets, and YouTube videos in one place
- **🏷️ Smart Organization** – Tag-based system for effortless categorization
- **🔍 Quick Search** – Find your saved content instantly with powerful search
- **🎥 YouTube Support** – Bookmark YouTube videos for later viewing
- **🐦 Tweet Preservation** – Archive tweets and threads before they disappear
- **🔗 Brain Sharing** – Share your curated collections via secure, shareable links
- **🔐 Secure Authentication** – JWT-based auth with bcrypt password encryption
- **📱 Responsive Design** – Beautiful, modern UI built with TailwindCSS
- **⚡ Fast & Lightweight** – Built with performance in mind

---

## 🛠️ Tech Stack

### Frontend

- **React 19** – Modern UI library with hooks
- **TypeScript** – Type-safe development
- **Vite** – Lightning-fast build tool
- **TailwindCSS 4** – Utility-first styling
- **React Router** – Client-side routing
- **Axios** – HTTP client for API calls

### Backend

- **Node.js + Express** – RESTful API server
- **TypeScript** – End-to-end type safety
- **MongoDB + Mongoose** – NoSQL database with ODM
- **JWT** – JSON Web Tokens for authentication
- **bcryptjs** – Password hashing
- **Zod** – Schema validation

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/shivshankarkannoujiya/mindvault.git
cd mindvault
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/mindvault

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRY=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

```bash
# Build and start the server
npm run dev
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd Frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your frontend `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

```bash
# Start development server
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

---

## 📁 Project Structure

```
MindVault/
├── Backend/
│   ├── src/
│   │   ├── config/          # Environment and configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middlewares/     # Auth and validation middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic (YouTube)
│   │   ├── utils/           # Helper functions
│   │   └── validators/      # Input validation schemas
│   ├── app.ts              # Express app configuration
│   └── index.ts            # Server entry point
│
├── Frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── icons/          # SVG icon components
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Application entry point
│   └── vite.config.ts      # Vite configuration
│
└── README.md
```

---

## 🔑 API Endpoints

### Authentication

- `POST /api/v1/signup` – Register new user
- `POST /api/v1/signin` – Login user
- `POST /api/v1/signout` – Logout user

### Content Management

- `GET /api/v1/content` – Get all user's content
- `POST /api/v1/content` – Create new content
- `DELETE /api/v1/content/:id` – Delete content

### Brain Sharing

- `POST /api/v1/brain/share` – Generate shareable link
- `GET /api/v1/brain/:shareId` – Access shared brain

---

## 💡 Usage Examples

### Saving Content

1. Navigate to your dashboard
2. Click the "+" button to add content
3. Enter a title and paste your URL (YouTube or Twitter)
4. Select the content type
5. Add tags for organization

### Organizing Your Collection

- Use the search bar to find specific content
- Filter by content type (All, YouTube, Twitter)
- Delete content you no longer need
- Tag content for better organization

### Sharing Your Brain

1. Go to your dashboard
2. Click the "Share" button
3. Generate a unique shareable link
4. Share with colleagues, friends, or make it public
5. Disable sharing anytime to make your brain private again

---

## 🧪 Development

### Backend Development

```bash
cd Backend
npm run dev          # Start with auto-reload
npm run build        # Compile TypeScript
```

### Frontend Development

```bash
cd Frontend
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🔒 Security Features

- **Password Hashing** – bcryptjs with salt rounds
- **JWT Authentication** – Secure token-based auth
- **HTTP-only Cookies** – XSS protection
- **CORS Configuration** – Controlled cross-origin requests
- **Input Validation** – Zod schema validation
- **MongoDB Injection Protection** – Mongoose sanitization

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations provided
- Write meaningful commit messages
- Add tests for new features

---

## 📝 Environment Variables

### Backend Required Variables

| Variable       | Description                       | Example                               |
| -------------- | --------------------------------- | ------------------------------------- |
| `PORT`         | Server port                       | `3000`                                |
| `NODE_ENV`     | Environment mode                  | `development` or `production`         |
| `MONGO_URI`    | MongoDB connection string         | `mongodb://localhost:27017/mindvault` |
| `JWT_SECRET`   | JWT signing secret (min 32 chars) | `your-secret-key`                     |
| `JWT_EXPIRY`   | Token expiration time             | `7d`                                  |
| `FRONTEND_URL` | Frontend URL for CORS             | `http://localhost:5173`               |

### Frontend Required Variables

| Variable       | Description          | Example                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Shivshankar**

- GitHub: [@shivshankarkannoujiya](https://github.com/shivshankarkannoujiya)

---

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) for the database
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) communities
- [TailwindCSS](https://tailwindcss.com/) for the styling framework
- All open-source contributors

---

## 📮 Support

If you have any questions or need help, please:

- Open an issue on GitHub

---

<div align="center">
  <sub>Built with ❤️ by Shivshankar</sub>
</div>
