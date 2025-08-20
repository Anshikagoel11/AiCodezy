const express = require('express')
const aiChatRouter = express.Router();
const tokenVerifyMiddleware = require("../middleware/tokenverify")
const aiChatResponse = require('../controllers/aiChatController')

aiChatRouter.post('/chat', tokenVerifyMiddleware ,aiChatResponse)

module.exports = aiChatRouter