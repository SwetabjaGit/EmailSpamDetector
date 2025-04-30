const express = require("express");
const { getEmailDetails } = require("../controllers/emailController");


const router = express.Router();


router.post("/email/getdetails", getEmailDetails);



module.exports = router;
