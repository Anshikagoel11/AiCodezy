const express = require('express')
const problemRouter = express.Router();
const tokenVerifyMiddleware = require("../middleware/tokenverify")
const {createProblem,updateProblem,deleteProblem,getProblembyId,getAllProblem,getDailyProblem} = require("../controllers/problemController")
const adminmiddleware = require('../middleware/adminmiddleware')


//these 3 need admin access
problemRouter.post("/create", tokenVerifyMiddleware ,adminmiddleware, createProblem)
problemRouter.put("/update/:id",tokenVerifyMiddleware,adminmiddleware,updateProblem)
problemRouter.delete("/delete/:id",tokenVerifyMiddleware,adminmiddleware,deleteProblem)


problemRouter.get("/problemById/:id",getProblembyId)
problemRouter.get("/getAllProblem",getAllProblem)
problemRouter.get("/dailyProblem" , getDailyProblem)


// problemRouter.post("/ProblemSolvedByUser",tokenVerifyMiddleware,solvedProblemByUser)




module.exports=problemRouter;

