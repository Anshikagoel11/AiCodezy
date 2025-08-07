const express = require('express')
const authRouter = express.Router();
const {register,login,logout,profile,adminRegister,checkAuth} = require("../controllers/auth")
const tokenVerifyMiddleware = require("../middleware/tokenverify")
const adminmiddleware = require("../middleware/adminmiddleware")



authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',tokenVerifyMiddleware,logout);
// authRouter.post('/forgetPassword',tokenVerifyMiddleware,forgetPassword)
authRouter.get('/profile',tokenVerifyMiddleware,profile);
authRouter.get('/checkAuth',tokenVerifyMiddleware,checkAuth);
authRouter.post('/admin/create',tokenVerifyMiddleware,adminmiddleware,adminRegister)

module.exports = authRouter;