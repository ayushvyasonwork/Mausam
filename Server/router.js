const express=require('express');
const router = express.Router();

const {getData}=require("./weatherAPI");
router.post("/getweather",getData);
module.exports=router;