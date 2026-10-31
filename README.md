
# 🚀 AiCodezy – AI-Powered Coding Practice Platform

AiCodezy is a full-stack coding practice platform designed to help developers improve their Data Structures and Algorithms (DSA) skills through hands-on coding, real-time code execution, and AI-powered assistance.

It provides an interactive coding environment where users can solve problems, run code against test cases, submit solutions, track their progress, and get personalized guidance from an AI assistant.

🔗 **Live Demo:** [https://ai-codezy.vercel.app](https://ai-codezy.vercel.app)

---

## 📸 Screenshots

### 1. Home Page

<img width="100%" alt="AiCodezy Home Page" src="https://github.com/user-attachments/assets/aebfa82e-0f8a-48cb-bb7b-2951bffae9b5" />

### 2. Problems Dashboard

<img width="100%" alt="AiCodezy Problems Dashboard" src="https://github.com/user-attachments/assets/8ce754a5-fff1-481a-8b2b-ca30dd727476" />

### 3. Coding Workspace

<img width="100%" alt="AiCodezy Coding Workspace" src="https://github.com/user-attachments/assets/254b4a42-5f1d-46c5-adef-2c9d41731000" />

### 4. AI Coding Assistant

<img width="100%" alt="AiCodezy AI Coding Assistant" src="https://github.com/user-attachments/assets/daee50e3-682d-4775-95d2-a0a818bfafc1" />

### 5. Code Execution Results

<img width="100%" alt="AiCodezy Code Execution Results" src="https://github.com/user-attachments/assets/f7aee17c-807a-488a-ba10-6a693fae951a" />

<img width="100%" alt="AiCodezy Test Case Results" src="https://github.com/user-attachments/assets/98ba7adb-8c52-4b18-b189-9d81ca87b993" />

### 6. Submission History

<img width="100%" alt="AiCodezy Submission History" src="https://github.com/user-attachments/assets/a5880f9f-2d05-4f4f-b899-cc58276ab44b" />

---

## ✨ Features

- **User Authentication:** Secure signup and login functionality.
- **Problem Library:** Browse and practice a collection of DSA problems.
- **Monaco Code Editor:** Write and edit code in an interactive coding environment.
- **Multi-Language Support:** Solve problems using multiple programming languages.
- **Code Execution:** Run code against visible test cases and get instant feedback.
- **Code Submission:** Submit solutions against visible and hidden test cases.
- **Submission History:** Track previous submissions and their results.
- **Solved Problems Tracking:** Keep track of successfully solved problems.
- **AI Coding Assistant:** Get AI-powered hints, explanations, debugging help, and problem-specific guidance.
- **Daily Problems:** Practice regularly with daily coding challenges.
- **Editorials and Solutions:** Access problem explanations and solution resources.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    A[User] --> B[React Frontend]
    B --> C[Express.js Backend]

    C --> D[Authentication]
    C --> E[Problem Management]
    C --> F[Submission Management]
    C --> G[AI Assistant]

    D --> H[(MongoDB)]
    E --> H
    F --> H

    F --> I[Judge0 API]
    I --> J[Execution Results]
    J --> B

    G --> K[Google Gemini API]
    K --> L[AI Response Streaming]
    L --> B

    C --> M[(Redis)]
```

---


---

## 📂 Project Structure

```text
AiCodezy/
│
├── Frontened/
│   ├── public/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── authPage.jsx
│   │   │   ├── signIn.jsx
│   │   │   └── signUp.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── answer.jsx
│   │   │   ├── askAI.jsx
│   │   │   ├── codeEditor.jsx
│   │   │   ├── dailyProblem.jsx
│   │   │   ├── description.jsx
│   │   │   ├── dsaVisualize.jsx
│   │   │   ├── editorial.jsx
│   │   │   ├── features.jsx
│   │   │   ├── footer.jsx
│   │   │   ├── hero.jsx
│   │   │   ├── solutions.jsx
│   │   │   ├── submissions.jsx
│   │   │   ├── testCaseResults.jsx
│   │   │   └── testCases.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── allProblems.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── navbar.jsx
│   │   │   └── problemPage.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── aiChatslicer.js
│   │   │   ├── authSlicer.js
│   │   │   ├── dailyproblemSlicer.js
│   │   │   ├── problemSlicer.js
│   │   │   ├── problemSolvedslicer.js
│   │   │   ├── runsSlicer.js
│   │   │   └── submitSlicer.js
│   │   │
│   │   ├── shimmers/
│   │   │   ├── dailyProblemShimmer.jsx
│   │   │   ├── ProblemPageShimmer.jsx
│   │   │   ├── problemsshimmer.jsx
│   │   │   └── submissionShimmer.jsx
│   │   │
│   │   ├── store/
│   │   │   └── store.js
│   │   │
│   │   ├── Ui/
│   │   │   ├── celebrateAnimation.jsx
│   │   │   ├── cursor.jsx
│   │   │   ├── floatingBg.jsx
│   │   │   ├── loadingdots.jsx
│   │   │   ├── logo.jsx
│   │   │   └── particleBurst.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── axiosClient.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── redis.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── aiChatController.js
│   │   │   ├── auth.js
│   │   │   ├── problemController.js
│   │   │   ├── submitController.js
│   │   │   └── videoSolutionCont.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── adminmiddleware.js
│   │   │   └── tokenverify.js
│   │   │
│   │   ├── models/
│   │   │   ├── Problem.js
│   │   │   ├── submission.js
│   │   │   ├── user.js
│   │   │   └── videoSoltuion.js
│   │   │
│   │   ├── routes/
│   │   │   ├── aiChatRouter.js
│   │   │   ├── problemRouter.js
│   │   │   ├── submitProblem.js
│   │   │   ├── userAuth.js
│   │   │   └── videoRouter.js
│   │   │
│   │   └── utils/
│   │       ├── ProblemUtlis.js
│   │       └── validator.js
│   │
│   ├── index.js
│   └── package.json
│
├── package.json
├── package-lock.json
└── README.md
```


## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Monaco Editor
- Framer Motion
- Axios
- React Hook Form
- Zod

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT Authentication
- bcrypt
- Cookie Parser

### AI Integration
- Google Gemini API
- Context-aware AI responses
- Server-Sent Events (SSE) for streaming responses

### Code Execution
- Judge0 API
- Multi-language code execution
- Batch test-case evaluation

---
