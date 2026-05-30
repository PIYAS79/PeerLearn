<div align="center">

<img src="https://img.shields.io/badge/PeerLearn-Peer%20to%20Peer%20Learning-6366f1?style=for-the-badge&logo=graduation-cap&logoColor=white" />

# 🎓 PeerLearn

### A Peer-to-Peer Learning Platform powered by AI

Connect with fellow students, request tutoring sessions, upload study materials, and get AI-generated quizzes — all in one place.

<br/>

[![Live Frontend](https://img.shields.io/badge/🌐%20Live%20Frontend-Visit%20Site-6366f1?style=for-the-badge)](https://peerlearn-mu.vercel.app)
[![Live Backend](https://img.shields.io/badge/⚙️%20Live%20Backend-Visit%20Server-6366f1?style=for-the-badge)](https://peer-learn-blush.vercel.app)
[![Live Signaling Server](https://img.shields.io/badge/⚙️%20Live%20Signaling%20Server-Visit%20Server-6366f1?style=for-the-badge)](https://peerlearn-socket-server.onrender.com)

</div>

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| Home Page | ![Home Page](./screenshots/home.png) |
| Timeline Page | ![Home Page](./screenshots/timeline.png) |
| Tutors Page | ![Home Page](./screenshots/tutor.png) |
| Profile Page | ![Profile Page](./screenshots/profile.png) |
| Dashboard Page | ![Dashboard Page](./screenshots/dashboard.png) |
| Setting Page | ![Dashboard Page](./screenshots/setting.png) |
| Video Call Page | ![Dashboard Page](./screenshots/vcall.png) |
| About Page | ![About Page](./screenshots/about.png) |
| Login Page | ![Login Page](./screenshots/login.png) |
| Register Page | ![Register Page](./screenshots/register.png) |

---

### 🛠️ Test The Website
| User Type | Email | Password |
|---|---|---|
| Basic User | piyasmahmudealif@gmail.com|222156479 |
| Admin | admin@gmail.com|222156479 |

## ✨ Features

### 🌐 Public (No Login Required)
- **Home Page** — Hero section, platform features, community stats, subject showcase, testimonials
- **About Page** — Platform mission and team info

### 🔐 Authenticated Users
- **Timeline** — Browse and post peer tutoring requests
- **Tutor Directory** — Discover and connect with top-rated tutors
- **Request System** — Send, accept, and manage tutoring session requests
- **1-on-1 Video Meetings** — Real-time peer video sessions via WebRTC *(requires local socket server — see below)*
- **Material Upload** — Upload PDFs, Word docs, and PowerPoints for a session
- **AI Question Generation** — Auto-generate MCQ quizzes from uploaded materials using Google Gemini AI *(paid API required)*
- **AI-Powered Evaluation** — Session evaluation with AI rating after quiz completion
- **Reviews** — Leave detailed reviews for tutors after sessions
- **Profile Management** — Update personal info, academic background, and expertise areas
- **Settings** — Account preferences and security

### 🛡️ Admin
- **Admin Dashboard** — User management and platform oversight

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 16 + React 19 | UI Framework |
| TypeScript | Type Safety |
| Tailwind CSS v4 + DaisyUI | Styling |
| Redux Toolkit + Redux Persist | State Management |
| Axios | HTTP Client |
| Socket.io Client | Real-time Video Signaling |
| Framer Motion | Animations |
| Ant Design | UI Components |
| Lucide React | Icons |
| Sonner | Toast Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js 22 + Express 5 | Server Framework |
| TypeScript | Type Safety |
| Prisma ORM v7 | Database ORM |
| PostgreSQL (Neon) | Database |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Zod | Request Validation |
| Nodemailer | Email (Forgot Password) |
| Multer | File Uploads |
| Google Gemini AI | AI Question Generation |
| OpenAI | AI Evaluation |
| Tesseract.js | OCR (Image Text Extraction) |
| PDF.js + Mammoth | Document Parsing |
| Socket.io | Real-time Video Signaling |

---

## ⚠️ Features That Require Local Setup

Some features are **limited or unavailable** on the deployed version due to paid APIs and infrastructure constraints. For the **best experience**, run the project locally.

| Feature | Online Status | Why | Fix |
|---|---|---|---|
| 🤖 AI Question Generation | ⚠️ May not work | Requires Gemini API key (paid) | Add your own `GEMINI_API_KEY` |
| 🤖 AI Evaluation / Rating | ⚠️ May not work | Requires OpenAI API key (paid) | Add your own `OPENAI_API_KEY` |
| 📹 Video Meeting | ⚠️ Limited | Socket server on free Render tier (sleeps) | Run socket server locally |
| 📁 File Uploads | ⚠️ Temporary | Vercel has no persistent filesystem | Use Cloudinary in production |
| 📧 Forgot Password Email | ✅ Works | Nodemailer with Gmail App Password | — |
| 🔐 Auth / Login / Register | ✅ Works | JWT-based, no paid dependency | — |
| 📋 Timeline / Requests | ✅ Works | DB-only feature | — |
| 👥 Tutor Directory | ✅ Works | DB-only feature | — |
| ⭐ Reviews | ✅ Works | DB-only feature | — |

---

## 🚀 Running Locally (Full Features)

### Prerequisites

Make sure you have the following installed:
- [Node.js v22+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- PostgreSQL database (or a free [Neon](https://neon.tech) account)

---

### 1. Clone the Repository

```bash
git clone https://github.com/PIYAS79/PeerLearn.git
cd PeerLearn
```

---

### 2. Backend Setup

```bash
cd peerlearn_backend
npm install
```

Create a `.env` file in `peerlearn_backend/`:

```env
# Server
PORT=5000

# Database (PostgreSQL — use Neon or local Postgres)
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require"

# Password Hashing
HASH_PASS_SALT_ROUNDS=10

# JWT Secrets (use any long random strings)
ACCESS_T_SECRET=your_access_token_secret_here
ACCESS_T_EXP=7d
REFRESH_T_SECRET=your_refresh_token_secret_here
REFRESH_T_EXP=30d
FORGOT_TOKEN_SECRET=your_forgot_token_secret_here
FORGOT_TOKEN_EXP=15m

# Nodemailer (Gmail — needs an App Password)
BASE_EMAIL=your.email@gmail.com
APP_PASS=your_gmail_app_password

# Frontend URL (for email links)
FRONT_END_URL=http://localhost:3000

# AI APIs (required for AI features)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...
```

> **How to get a Gmail App Password:**
> Google Account → Security → 2-Step Verification → App Passwords → Generate

Run database migrations and start the dev server:

```bash
npx prisma migrate deploy
npm run dev
```

The backend will be running at **http://localhost:5000**

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd peerlearn_frontend
npm install
```

Create a `.env.local` file in `peerlearn_frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will be running at **http://localhost:3000**

---

### 4. (Optional) Socket Server — For Video Meetings

The video meeting feature requires a Socket.io signaling server. If you want fully working 1-on-1 video, clone and run the socket server locally:

```bash
# In a separate terminal
git clone https://github.com/PIYAS79/peerlearn-socket-server.git
cd peerlearn-socket-server
npm install
npm run dev
```

Then update the socket URL in `peerlearn_frontend/src/app/(With_Dashboard_Layout)/dashboard/meeting/page.tsx`:

```typescript
// Change this line
const socket = io('https://peerlearn-socket-server.onrender.com', {

// To this
const socket = io('http://localhost:4000', {
```

---

## 🌐 Deployment (Vercel)

Both frontend and backend are deployed on Vercel with Neon PostgreSQL.

| Service | URL |
|---|---|
| 🖥️ Frontend | [https://peerlearn-mu.vercel.app](https://peerlearn-mu.vercel.app) |
| ⚙️ Backend API | [https://peer-learn-blush.vercel.app](https://peer-learn-blush.vercel.app) |
| 🗄️ Database | [Neon PostgreSQL](https://neon.com) |

---

## 📁 Project Structure

```
PeerLearn/
├── peerlearn_frontend/          # Next.js Frontend
│   └── src/
│       ├── app/
│       │   ├── (With_Common_Layout)/   # Public + auth pages (Home, About, Timeline, Tutors)
│       │   ├── (With_Dashboard_Layout)/# Protected dashboard pages
│       │   ├── login/
│       │   └── register/
│       ├── components/
│       │   ├── Shared/          # Navbar, AuthButton, ProtectedRoute
│       │   ├── Dashboard/
│       │   └── UI/
│       ├── redux/               # RTK Query + store
│       ├── services/            # Auth helpers
│       └── hooks/
│
└── peerlearn_backend/           # Express + Prisma Backend
    ├── src/
    │   ├── app/
    │   │   ├── module/          # AUTH, PERSON, REQUEST, QUESTION, REVIEW, USER, etc.
    │   │   ├── routes/
    │   │   ├── middlewares/
    │   │   └── errors/
    │   └── config/
    ├── prisma/
    │   └── schema.prisma
    └── api/
        └── index.ts             # Vercel serverless entry point
```

---

## 🔑 API Endpoints

| Module | Endpoint Prefix | Description |
|---|---|---|
| Auth | `/app/v1/auth` | Register, Login, Refresh Token, Forgot Password |
| User | `/app/v1/user` | User management |
| Person | `/app/v1/person` | Profile CRUD |
| Academic | `/app/v1/academic` | Academic info |
| Expertise | `/app/v1/expertise` | Subject expertise |
| Request | `/app/v1/request` | Tutoring session requests |
| Question | `/app/v1/question` | AI-generated quizzes |
| Review | `/app/v1/review` | Session reviews |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**S M Piyas Mahamude Alif**
- GitHub: [@PIYAS79](https://github.com/PIYAS79)
- Email: [piyasmahmudealif@gmail.com](piyasmahmudealif@gmail.com)
- LinkedIn: [https://www.linkedin.com/in/piyasmahamudealif](https://www.linkedin.com/in/piyasmahamudealif)

---

<div align="center">

Made with ❤️ for peer learners everywhere

</div>
