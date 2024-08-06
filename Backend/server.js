const express= require("express");
const app= express();
const cors= require("cors");
const env= require("dotenv").config();
const port=process.env.PORT ||700; 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const route= require("./Routes/route");
const { default: mongoose } = require("mongoose");
const cookieParser=require('cookie-parser');
app.use(cookieParser());
route(app);

const db_link=process.env.URL;
mongoose.connect(db_link).then(()=>{
       console.log("Database is connected");
})

app.listen(port,()=>{
     console.log("Server is running at port ",port);
})