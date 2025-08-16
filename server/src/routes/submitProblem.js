const express = require('express')
const submitRouter = express.Router();
const tokenVerifyMiddleware = require("../middleware/tokenverify")
const {submitProblems ,runProblems ,getProblemSubmission , getSolvedProblems} = require("../controllers/submitController")



submitRouter.post("/submit/:id" , tokenVerifyMiddleware , submitProblems);
submitRouter.post("/run/:id" , runProblems);
submitRouter.get("/ProblemSubmissonByUser/:id" , tokenVerifyMiddleware , getProblemSubmission)
submitRouter.get("/ProblemsSolvedByUser" , tokenVerifyMiddleware , getSolvedProblems)


module.exports=submitRouter;