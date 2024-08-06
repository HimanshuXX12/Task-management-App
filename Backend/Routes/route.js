
const user_model= require('../Models/User_Model');
const task_model= require("../Models/Task_Model");
const bcrypt= require("bcrypt");
const mongoose= require("mongoose");
const cookieParser = require('cookie-parser');
const json = require('jsonwebtoken');
const path = require('path');
function route(app)
{

    // Middleware for checking login
    const fetcher_user = async (req, res, next) => {
        console.log("fetched user",req.body);
        const token = req.body.token;

        if (!token) {
            res.json({ error: "Login First", sucess: false });
        }
        else
         {
            const data = await json.verify(token, 'Himanshu_token');
            req.body.user = data;

            return next();

        }
    }

    const get_user= async (req,res,next)=>{
        const token= req.query.token;
        if (!token) {
            res.json({ error: "Login First", sucess: false });
        }
        else
         {
            const data = await json.verify(token, 'Himanshu_token');
            req.body.user = data;

            return next();

        }

    }


    // Authentication routes
    app.post("/signup",async (req,res)=>{
         const {email,password}=req.body;
         console.log("singup funcion",req.body);
         if(!email || !password)
         {
             res.json({error:"Both are required",sucess:false});
         }

         const user = await user_model.findOne({ email: email });

           if(user)
           {
              res.json({error:"Already existed User with this Mail id",sucess:false})
           }
           else{
             const hash= await bcrypt.hash(password,10);
              const data= new user_model({
                 email:email,
                 password:hash
              })

              data.save().then(()=>{
                    res.json({error:"Sucessfully Signed Up",sucess:true,saved_data:data});
              })

           }

    })

    // Login Route
    app.post("/login",async (req,res)=>{
         const {email,password}= req.body;
         if(!email || !password)
         {
             res.json({error:"Both are required Login",sucess:false});
         }

         const user= await user_model.findOne({email:email});
         if(!user)
         {
            res.json({error:"No User Exists with this mail Id",sucess:false});
         }
         else{
             bcrypt.compare(password,user.password,function(err,data)
            {
                  if(err)
                  {
                    res.json({error:err});
                  }
                  else if(data)
                  {
                      const token= json.sign({
                        email:user.email
                      },"Himanshu_token");
                      res.json({error:"Logined Sucessfully",token:token,sucess:true});

                  }
                  else{
                     res.json({error:"Password did not Matched"});
                  }
            })  
         }
    })

    app.get("/tasks",get_user,async (req,res)=>{
         
          const {user}= req.body;
          const data= await task_model.find({email:user.email});
          if(data.length==0)
          {
              res.json({error:"No Task Existed",sucess:false,task:[]});
          }
          else
          {
            res.json({task:data,sucess:true});
        }
    })

    app.get("/tasks/:id",async (req,res)=>{
         const id= req.params.id;
         const {user}= req.body;
         const search={
             email:user.email,
             _id:id
         }
          const data= await task_model.findOne(search);
          res.json({task:data, sucess:true});
  
    })

    app.post("/tasks",fetcher_user,async (req,res)=>{
        const data=req.body;
        const {user}=req.body;
        console.log(data);
        const create_data= new task_model({
            description:data.description,
            title:data.title,
            status:data.status,   
            due_date:data.due_date,
            email:user.email
        })
        create_data.save().then((data)=>{
            if(data)
            {
                res.json({error:"Created task",sucess:true,});
            }

        });
          
    })

    app.put("/tasks/:id",fetcher_user,async (req,res)=>{
        console.log("put request is called",req.body);
          const id= req.params.id;
          const {user}= req.body;
          console.log("put request id",id);
          console.log("user in put request",user);
          const {data}=req.body;   
          await task_model.findById(id);
          const deleteTask= await task_model.findByIdAndDelete(id);
          if(!deleteTask)   
          {
            console.log("hello");
             res.json({error:"Task  not Deleted"});

          }  
          else
          {
            const new_task= new task_model({
                _id:id,
                description:data.description,
                due_date:data.due_date,
                status:data.status,
                title:data.title,
                email:user.email
             });
             new_task.save().then((data)=>{
                if(data)
                {
                   res.json({error:"Updatted Sucessfully"});
                }
  
             })
          }    

         
    })

    app.put("/tasks/status/:id",fetcher_user,async (req,res)=>{
          const {status}= req.body;
          console.log("status",status);
          const id=req.params.id;
          const responce= await task_model.findByIdAndUpdate(id,{status:status})
          if(responce)
          {
              res.json({sucess:true,error:"Status Changed"});
          }
          else{
             res.json({sucess:false,error:"Failed to change Status"});
          }
    })

    app.delete("/tasks/:id",async (req,res)=>{
        const id= req.params.id;
        const data= await task_model.findByIdAndDelete(id);
        res.json({sucess:true,error:"Sucessfully deleted the task"});

    })
       
}  
   

module.exports= route;