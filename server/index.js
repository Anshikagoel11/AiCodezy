const express = require('express')
const main = require("./src/config/db")
const authRouter = require("./src/routes/userAuth");
const problemRouter = require("./src/routes/problemRouter")
const Problem = require('./src/models/Problem')
const submitRouter = require("./src/routes/submitProblem")
const aiChatRouter = require('./src/routes/aiChatRouter')
const redisClient = require('./src/config/redis');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();
require('dotenv').config();

// inbuild middleware
app.use(cookieParser());
app.use(express.json());

// CORS config
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-codezy.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// explicitly handle preflight requests
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// connect DB + Redis and start server
async function connection() {
  try {
    await Promise.all([main(), redisClient.connect()])
    console.log('connected with db')
    app.listen(process.env.PORT, () => {
      console.log(`server is listening on port ${process.env.PORT}`)
    })
  } catch (err) {
    console.log('error occured: ', err)
  }
}
connection();

// routes
app.use("/user", authRouter);
app.use("/problem", problemRouter);
app.use("/submission", submitRouter);
app.use("/ai", aiChatRouter);
