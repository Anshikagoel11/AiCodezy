
<div align="center">

# 🚀 AiCodezy

### AI-Powered Coding Practice Platform

**Practice. Code. Execute. Learn with AI.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://ai-codezy.vercel.app)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Judge0](https://img.shields.io/badge/Judge0-Code%20Execution-orange?style=for-the-badge)](https://judge0.com/)

</div>

---

## 📖 Overview

**AiCodezy** is a full-stack coding practice platform designed to help developers improve their Data Structures and Algorithms (DSA) skills through hands-on coding, real-time code execution, and AI-powered assistance.

It provides an interactive coding environment where users can solve problems, execute code against test cases, submit solutions, track their progress, and receive personalized guidance from an AI assistant.

The platform combines an interactive Monaco code editor, automated code evaluation using Judge0, and Google Gemini-powered AI assistance to create a complete coding practice experience.

---

## 📸 Screenshots

<div align="center">

### 🏠 Home Page

<img src="https://github.com/user-attachments/assets/aebfa82e-0f8a-48cb-bb7b-2951bffae9b5" width="100%" alt="AiCodezy Home Page"/>

<br/>

### 📚 Problems Dashboard

<img src="https://github.com/user-attachments/assets/8ce754a5-fff1-481a-8b2b-ca30dd727476" width="100%" alt="Problems Dashboard"/>

<br/>

### 💻 Coding Workspace

<img src="https://github.com/user-attachments/assets/254b4a42-5f1d-46c5-adef-2c9d41731000" width="100%" alt="Coding Workspace"/>

<br/>

### 🤖 AI Coding Assistant

<img src="https://github.com/user-attachments/assets/daee50e3-682d-4775-95d2-a0a818bfafc1" width="100%" alt="AI Coding Assistant"/>

<br/>

### ⚡ Code Execution & Test Results

<table>
<tr>
<td width="50%" align="center">
<strong>Execution Results</strong><br/><br/>
<img src="https://github.com/user-attachments/assets/f7aee17c-807a-488a-ba10-6a693fae951a" width="100%" alt="Code Execution Results"/>
</td>
<td width="50%" align="center">
<strong>Test Case Results</strong><br/><br/>
<img src="https://github.com/user-attachments/assets/98ba7adb-8c52-4b18-b189-9d81ca87b993" width="100%" alt="Test Case Results"/>
</td>
</tr>
</table>

<br/>

### 📊 Submission History

<img src="https://github.com/user-attachments/assets/a5880f9f-2d05-4f4f-b899-cc58276ab44b" width="100%" alt="Submission History"/>

</div>

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Secure signup and login functionality. |
| 📚 **Problem Library** | Browse and practice a collection of DSA problems. |
| 💻 **Monaco Code Editor** | Interactive code editor for writing and editing solutions. |
| 🌐 **Multi-Language Support** | Solve problems using multiple programming languages. |
| ⚡ **Code Execution** | Run code against visible test cases and get instant feedback. |
| 🎯 **Code Submission** | Evaluate solutions against visible and hidden test cases. |
| 📊 **Submission History** | Track previous submissions and their execution results. |
| 🏆 **Solved Problems Tracking** | Keep track of successfully solved problems. |
| 🤖 **AI Coding Assistant** | Get AI-powered hints, explanations, and debugging assistance. |
| 📅 **Daily Problems** | Practice regularly with daily coding challenges. |
| 📖 **Editorials & Solutions** | Access problem explanations and solution resources. |

---

## 🏗️ System Architecture

AiCodezy follows a client-server architecture where the React frontend communicates with the Express.js backend through APIs.

The backend handles authentication, problem management, code submissions, database operations, and AI requests. External services such as Judge0 and Google Gemini provide code execution and AI-powered assistance.

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
│   │   ├── store/
│   │   ├── Ui/
│   │   ├── utils/
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

---

## 🛠️ Tech Stack

<div align="center">

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Monaco](https://img.shields.io/badge/Monaco_Editor-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### AI & Code Execution

![Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)
![Judge0](https://img.shields.io/badge/Judge0-FF6B35?style=for-the-badge)

### Other Technologies

![Axios](https://img.shields.io/badge/Axios-671DDF?style=for-the-badge&logo=axios&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

</div>

---

<div align="center">

### 🌐 Explore AiCodezy

**[🚀 Visit Live Application](https://ai-codezy.vercel.app)**

</div>
