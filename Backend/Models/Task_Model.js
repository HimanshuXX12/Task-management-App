const mongoose= require("mongoose");

const schema= mongoose.Schema({
     description:{
        type:true,
        required:true
     },
     title:{
         type:String,
         required:true
     },
     due_date:{
        type:Date,
        required:true,
     },
     status:{
         type:String,
         required:true
     }
})


const Task_Model= mongoose.model("task",schema);

module.exports=Task_Model_Model;

