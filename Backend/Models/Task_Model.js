const mongoose= require("mongoose");

const schema= mongoose.Schema({
     description:{
        type:String,
        required:true
     },
     title:{
         type:String,
         required:true
     },
     due_date:{
        type:String,
        required:true,
     },
     status:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true
     }
})


const Task_Model= mongoose.model("task",schema);

module.exports=Task_Model;

