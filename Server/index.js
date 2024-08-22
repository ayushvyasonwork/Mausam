const express=require('express');
const app=express();
const cors = require('cors');
require('dotenv').config();
const PORT=process.env.PORT || 4000;
app.use(cors());
// weather api middleware 
app.use(express.json());
// import route 
const weatherRoute=require('./router');
app.use('/api/v1',weatherRoute);
// start server 
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})
app.get('/',(req,res)=>{
    res.send(`<h1> server is live </h1>`);
})