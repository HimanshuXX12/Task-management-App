const mongoose= require("mongoose");

const schema= mongoose.Schema({
     email:{
         type:String,
         required:true,
     },
     password:{
         type:String,
         required:true,
     }
})


const User_Model= mongoose.model("user",schema);

module.exports=User_Model;