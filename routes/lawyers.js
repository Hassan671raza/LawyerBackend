const express = require("express");
const { lawyerSignUp, lawyerLogin, lawyerGetInfo, editLawyer } = require("../controllers/lawyers");
const router = express.Router();
const lawyer = require("../models/lawyer");

router.post("/signup", lawyerSignUp);

router.post("/login", lawyerLogin);

router.post("/", lawyerGetInfo);

router.post('/edit', editLawyer);

router.get('/lawyers', async (req, res) => {
    const lawyers = await lawyer.find({});         
    res.status(200).json(lawyers);
})

module.exports = router;
