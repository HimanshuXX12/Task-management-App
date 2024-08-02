const express= require("express");
const app= express();
const cors= require("cors");
const env= require("dotenv").config();
const port=process.env.PORT ||700; 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const route= require("./Routes/route");
route(app);

app.listen(port,()=>{
     console.log("Server is running at port ",port);
})