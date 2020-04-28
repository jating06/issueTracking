app.controller("ctrl3",($rootScope,$scope,testerfactory,$http,loginfactory,$window,Upload,$location,)=>{
  $rootScope.obj={
    "background-color" : "white",
}
  userid=localStorage.getItem('currentUser')


$scope.signout=()=>{
  $location.path('/');
  localStorage.removeItem('Token');
  localStorage.removeItem('currentUser')

};
window.onpopstate=function(){
        
  history.go(1);
};


 
  token=localStorage.getItem('Token');
  
 
  fetchStatus();
  
    $scope.change=()=>{
     $scope.flag=!$scope.flag
   
   }
   
    $scope.date = new Date();

    $http({
    url:'/fetchStatus',
    method:'GET',
    params:{
      userid:userid,
     
    },
  
  
  }).then(data=>{
  
    if(data.data.success==false){
      $location.path('#/')
    }
  })
  function fetchStatus(){
   let Status=testerfactory.fetchStatus();
     Status.then(data=>{
       employee=data.data['employee'];
       console.log(employee);
       k=0;
       var b=[]
     
       size=employee.length;
       employee.forEach(ele=>{

        ele.assignedBy.forEach(employee=>{
        if(employee.ReportTo==userid){
          b[k]={AllotedTo:ele.name,issue:employee.issue,TimeAlloted:employee.TimeAlloted,AllotedOn:employee.AllotedOn,Status:employee.Status}
          k++
        }
        })
       })
       $scope.list=b
      
     }) 
    }
   
      let promise = testerfactory.fetchEmployee();
          console.log('entering employee')
      promise.then(data=>{
         employee = data.data['employee'];
    
         length=employee.length;
         let a=[];
         let k=0
         for(i=0;i<length;i++){
             if(employee[i].role=='developer'){
                 
                 a[k]=employee[i].name;
                  k++
             }  
          }
          
          
         
          
           for(i=0;i<length;i++){
            if(userid==employee[i].name){
              console.log(employee[i].assigned)
              $scope.assigned=employee[i].assigned
            }
          }
               
         
          $scope.assignto=a;
        
      }) 
  
      
   
     
      
           $scope.addIssue=(file)=>{
        
         $scope.assigned=  $scope.assigned+1;
         for(i=0;i<length;i++){
           if(employee[i].name==$scope.assignTo)
           {
             emailId=employee[i].emailId
           }
         }
         Upload.upload({
          method:'POST',
          url:'/addissue',
          data:{
            issue:$scope.issue,
            Description:$scope.description,
            Assignto:$scope.assignTo,
            reportingofficer:userid,
            assigned:$scope.assigned,
            severity:$scope.severity,
            timeAlloted:$scope.timeAlloted,
            AllotedOn:$scope.date,
            file: file,
           emailId:emailId,
           
          
  
          },headers: {
            "Authorization": token
        }
       
  
  
      }).then(function (resp) {
        

       
          if(resp.data.success==false){
          
            $location.path('#/')
          }
     
          $scope.msg = resp['data']['msg'];
          console.log('Success ',resp);
          
         
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' );
      });
  
        $scope.issue='',
        $scope.description='';
        $scope.assignTo='';
         $scope.severity='';
         $scope.timeAlloted='';
         $scope.file=''
             
  
           }
           
     
  
       $scope.msg = '';
      $scope.uploadfile = function(fileObject) {
              console.log('File is ',fileObject);
            $scope.upload($scope.file);
          };
        
  
    
  
  
  })