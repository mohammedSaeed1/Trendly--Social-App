# Trendly — Social Media App

Trendly is a modern social media web application built with Next.js and TypeScript. It allows users to create posts, interact with others through likes and comments, manage their profiles, receive notifications, and explore trending video content.

## 🚀 Live Demo

> https://trendly-social-app.vercel.app/

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- Secure token-based authentication
- Protected routes

### 📝 Posts
- Create new posts
- Edit and delete your posts
- Upload images with posts
- Bookmark posts
- Share posts

### ❤️ Likes
- Like and unlike posts
- Like and unlike comments

### 💬 Comments & Replies
- Add comments to posts
- Edit and delete comments
- Reply to comments
- View nested replies

### 👤 Profile Management
- View user profiles
- Edit profile information
- Update profile picture and cover image

### 🔔 Notifications
- View notifications
- Mark notifications as read

### 🎥 Trending Videos
- Browse trending videos using the Pexels API

### 📱 Responsive Design
- Fully responsive across desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- HeroUI
- Font Awesome

### Forms & Validation
- React Hook Form
- Zod
- @hookform/resolvers

### Utilities
- jwt-decode

### Tooling
- ESLint
- React Compiler (Babel Plugin)

---

## 📦 Installation

```bash
git clone https://github.com/mohammedSaeed1/Trendly--Social-App.git
cd Trendly--Social-App
npm install
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```
---

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build the project for production
npm run start    # Run the production build
npm run lint     # Run ESLint
```

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── Context/
│   ├── components/
│   ├── types/
│   ├── utilities/
│   └── ...
├── public/
└── ...
```

---

## 🔐 Security

- Sensitive data stored in `.env.local`
- Server-side API calls handled through Server Actions
- Authentication-protected routes

---

## 👨‍💻 Author

**Mohamed Saeed**

- GitHub: https://github.com/mohammedSaeed1
- LinkedIn: https://www.linkedin.com/in/mohamed-saeed-030246272/

---

## ⭐ Support

If you found this project useful, please consider giving it a star on GitHub.

---

## 📄 License

This project is for educational and portfolio purposes.
