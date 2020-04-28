const registerModel=require("../models/employeeOperations");

const bcrypt = require('bcryptjs');

employeeOperations={
    add(newUser,response){
          registerModel.insertMany(newUser,(err)=>{
            if(err){
                response.json({'message':'Error During Add'});
        }
        else{
            response.json({'message':'Add SuccessFully'
         });
        }
          });
          
    },
   login(userid,password,role,res,token){
     

     registerModel.find({name:userid}).then((docs)=>{
   if(docs){
     if(docs[0].name==userid&&bcrypt.compareSync(password,docs[0].password)&&role==docs[0].role)
     {
     res.json({success:true,token:token,role:role})
   }
   else{
    res.json({success:false})
   }
    
    
     }
      
     }).catch((err)=>{
       if(err){
         
         res.json({success:false})
       }
     })
      
    },

    fetch(response){
         registerModel.find({},(err,docs)=>{
          
            if(docs){
                response.status(200).json({'employee':docs});
                }
                else{
                    response.status(404).json({'employee':[]});
                }
         })
    }, 
    addIssue(obj){
        let myquery = { name:obj.assignedTo };
       
       let newvalues = { $push: {assignedBy:[{issue:obj.issue,ReportTo:obj.officer,Severity:obj.severity,TimeAlloted:obj.timeAlloted,AllotedOn:obj.AllotedOn,Description:obj.Description}]}};
          registerModel.updateOne(myquery,newvalues,(err,res)=>{
            if (err) throw err;
           
       })
     let myquery2={name:obj.officer}
     let newvalues2={$set:{assigned:obj.assigned}};
     registerModel.updateOne(myquery2,newvalues2,(err,res)=>{
         if(err) throw err;
         
     })
    },
    

 updateIssue(issueId,status,userid,res){
registerModel.findOneAndUpdate({'assignedBy._id':issueId,'name':userid},{$set:{'assignedBy.$.Status':status}},function(err,success){
  if(success){
    res.status(200)
  }
  else
  {
    console.log('server error')
  }
})
  

  } ,

fetchStatus(response,userid){
  regex = new RegExp(userid);

 registerModel.find({'assignedBy.ReportTo':regex},(err,result)=>{
if(result)
{
  response.status(200).json({'employee':result});
}
else
{
 throw err
}
 })

}}

module.exports=employeeOperations