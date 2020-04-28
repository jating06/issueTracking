const express=require('express');
const Route=express.Router();
const nodemailer=require("nodemailer")
const employeeCrud=require("../db/helpers/employeeCrud")
const fs=require('fs')
const bcrypt = require('bcryptjs');
const jwt=require("../jwt")
const credentials=require('../utils')

Route.get('/login',(req,res)=>{
if(req.query.userid){
  token=jwt.generateToken(req.query.userid);
}
  
 employeeCrud.login(req.query.userid,req.query.password,req.query.role,res,token)
 
 
  



})
Route.get('/register',(req,res)=>{

  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:process.env.emailId,
          pass: process.env.password
        }
      });
    
      var mailOptions = {
        from: 'admin',
        to: req.query.emailId,
        subject: 'Account Created Successfully',
        text: `EmployeeId:-${req.query.name}\n password:-${req.query.password}`

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
    
     password= bcrypt.hashSync(req.query.password)
      
      
    newUser= {name:req.query.name,password:password,phoneNo:req.query.phoneNo,role:req.query.role,emailId:req.query.emailId}
  
   employeeCrud.add(newUser,res)
   
})
Route.get('/employee',(req,res)=>{
  
  employeeCrud.fetch(res);
})
Route.post('/addissue',(req,res)=>{

if(jwt.verifyToken(req.headers.authorization)){
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.emailId,
      pass:  process.env.password
    }
  });
  
  var mailOptions = {
    from: 'admin',
    to: req.body.emailId,
    subject: 'NEW ISSUE DETECTED',
    text: `New Bug assigned by ${req.body.reportingofficer}\n 
          severity:${req.body.severity}\n
           timeAlloted:${req.body.timeAlloted}`,
    attachments:[{
      filename:req.body.file,
      path:req.
      file.path,
      contents:'img'
    }]
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
     
obj={issue:req.body.issue,officer:req.body.reportingofficer,assignedTo:req.body.Assignto,assigned:req.body.assigned,severity:req.body.severity,timeAlloted:req.body.timeAlloted,AllotedOn:req.body.AllotedOn,Description:req.body.Description}
 employeeCrud.addIssue(obj)
}
else
{
  res.json({success:false})
}
})


Route.get('/developerUpdate',(req,res)=>{
 

  if(jwt.verifyToken(req.headers.authorization)){
  status=req.query.Status
 issueid=req.query.issueid
 userid=req.query.Userid
 employeeCrud.updateIssue(issueid,status,userid,res)
  }
  else
  res.json({success:false})
})
Route.get('/fetchStatus',(req,res)=>{
 
  userid=req.query.userid

  employeeCrud.fetchStatus(res,userid)


})

module.exports=Route;