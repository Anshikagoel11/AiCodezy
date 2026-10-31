#  AiCodezy – AI-Powered Coding Practice Platform

AiCodezy is a full-stack coding practice platform designed to help developers improve their Data Structures and Algorithms (DSA) skills through hands-on coding, real-time code execution, and AI-powered assistance.

It provides an interactive coding environment where users can solve problems, run code against test cases, submit solutions, track their progress, and get personalized guidance from an AI assistant.

🔗 **Live Demo:** https://ai-codezy.vercel.app

---

## 📸 Screenshots

### 1. Home Page
<!-- Replace with your home page screenshot -->
<img width="1868" height="847" alt="Screenshot 2026-10-31 135536" src="https://github.com/user-attachments/assets/aebfa82e-0f8a-48cb-bb7b-2951bffae9b5" />



### 2. Problems Dashboard
<!-- Replace with your problems page screenshot -->
<img width="1745" height="827" alt="Screenshot 2026-10-31 135606" src="https://github.com/user-attachments/assets/8ce754a5-fff1-481a-8b2b-ca30dd727476" />

### 3. Coding Workspace
<!-- Replace with your coding workspace screenshot -->
<img width="1873" height="881" alt="Screenshot 2026-10-31 135644" src="https://github.com/user-attachments/assets/254b4a42-5f1d-46c5-adef-2c9d41731000" />


### 4. AI Coding Assistant
<!-- Replace with your AI assistant screenshot -->
<img width="1598" height="792" alt="image" src="https://github.com/user-attachments/assets/daee50e3-682d-4775-95d2-a0a818bfafc1" />


### 5. Submission Results
<!-- Replace with your submission results screenshot -->
<img width="1882" height="835" alt="Screenshot 2026-10-31 140224" src="https://github.com/user-attachments/assets/f7aee17c-807a-488a-ba10-6a693fae951a" />

<img width="922" height="722" alt="image" src="https://github.com/user-attachments/assets/98ba7adb-8c52-4b18-b189-9d81ca87b993" />


### 5. Submission History
<!-- Replace with your submission results screenshot -->
<img width="935" height="851" alt="Screenshot 2026-10-31 140324" src="https://github.com/user-attachments/assets/428df132-d4b7-4eba-abf8-a61131997b79" />



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
