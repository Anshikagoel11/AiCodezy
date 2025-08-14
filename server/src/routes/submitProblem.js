const express = require('express')
const submitRouter = express.Router();
const tokenVerifyMiddleware = require("../middleware/tokenverify")
const {submitProblems ,runProblems} = require("../controllers/submitController")



submitRouter.post("/submit/:id" , tokenVerifyMiddleware , submitProblems);
submitRouter.post("/run/:id" , runProblems);



module.exports=submitRouter;