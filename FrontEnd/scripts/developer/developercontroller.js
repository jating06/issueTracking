app.controller('ctrl4',function ($scope,$route,testerfactory,$rootScope,$http,$location,$window
    ){
        
        $scope.Color=(Status)=>{
           
            if(Status=="solved"){
               return{
                "background-color":"green",
                "text-align":"center"
               }
               
            }
            else
              { if(Status=="not resolved"){
                 return{
                "background-color":"red",
                "text-align":"center"
            }
        }
           else{
               if(Status=='TBD'){
                return{
                    "background-color":"yellow",
                    "text-align":"center"
                }

               }
               else{
               if(Status=='NAB'){
                return{
                
                    "text-align":"center"
                }

               }
           }
           }
           
            }
            
                      },
      
       
        $rootScope.obj={
            "background-color" : "white",
        }
        window.onpopstate=function(){
        
            history.go(1);
          };
          
$scope.signout=()=>{
    $location.path('/');
    localStorage.removeItem('Token');
    localStorage.removeItem('currentUser')
  }
      
      
        
   userid=localStorage.getItem('currentUser')

 $scope.func=function (developers){
    $scope.flag=!$scope.flag;
    $scope.issue=developers.issue;
    $scope.descr=developers.Description
   

}
$scope.func2=function (){
    $scope.flag=!$scope.flag
}
$scope.statusold=false
$scope.statusnew=false
token=localStorage.getItem('Token')


$scope.statusChange=function (developers,status){
    $scope.originalstatus=status
    $scope.statusold=true
    $scope.statusnew=true
    $http({
        method:'GET',
        url:'/developerUpdate',
        params:{
            Status:status,
            issueid:developers._id,
            Userid:userid,
            reload:true
           
        },
        headers: {
            "Authorization": token
        }
    }).then(data=>{
   
      

        if(data.data.success==false){
          $location.path('#/')
        }
      })
      
    } 
var a=0
           
    let promise = testerfactory.fetchEmployee();
     
   
    promise.then(function (data){
      
     userid=localStorage.getItem('currentUser')
        employee = data.data['employee'];
        length=employee.length;
        
        let b=[]
        let k=0
        let m=0;
        for(i=0;i<length;i++){
            if(employee[i].role=='developer'){
                if(employee[i].name==userid){
                a=employee[i].assignedBy
                 
                }
            }  
         }
          
         $scope.list=a    
    

       
             
    }) 
    
})




