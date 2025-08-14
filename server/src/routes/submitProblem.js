const express = require('express')
const submitRouter = express.Router();
const tokenVerifyMiddleware = require("../middleware/tokenverify")
const {submitProblems ,runProblems ,getProblemSubmission} = require("../controllers/submitController")



submitRouter.post("/submit/:id" , tokenVerifyMiddleware , submitProblems);
submitRouter.post("/run/:id" , runProblems);
submitRouter.get("/ProblemSubmissonByUser/:id" , tokenVerifyMiddleware , getProblemSubmission)


module.exports=submitRouter;