const express = require('express')
const tokenVerifyMiddleware = require("../middleware/tokenverify")
const adminmiddleware = require('../middleware/adminmiddleware')
const videoRouter = express.Router();
const {generateSignature,saveVideoMetadata,deleteVideo} = require('../controllers/videoSolutionCont')

videoRouter.get("/create/:problemId",tokenVerifyMiddleware,adminmiddleware,generateSignature);
videoRouter.post("/save",tokenVerifyMiddleware,adminmiddleware,saveVideoMetadata);
videoRouter.delete("/delete/:videoId", tokenVerifyMiddleware, adminmiddleware,deleteVideo);

module.exports = videoRouter;