app.controller('ctrl1',($rootScope,$scope,$location,$http,$window)=>{
    $rootScope.userid=$scope.userid
    
    $rootScope.obj={
   
    "background-image" : 'url(../resources/Blurred-Background-Sunset-3c-Free.jpg)',
    "background-size":"cover"
}
 $scope.register=()=>{
     $location.path('/register')
 }
 
    $scope.flag=true
    $scope.sumbit=(valid)=>{
        if(valid){
            
            $scope.flag= false;
        }
        else{
           $scope.flag=true
        }
    
    }
    
    $scope.sumbit=()=>{
       
        localStorage.setItem('currentUser',$scope.userid)
      
   
      $http({
          url:'/login',
          method:'GET',
         params:{
             userid:$scope.userid,
             password:$scope.password,
             role:$scope.role,
            
         }
          
      }).then(function(data){
         
     login=data.data;
     if(data.data.success==true){
        localStorage.setItem('Token',login.token);
        $location.path('/'+login.role);
     }
        else if(data.data.success==false)
        {alert('you are not a registered user')
        $location.path('/register');
        }
     
    },function(err){
        console.log(err )
    })                                                 
          
    }
   


})

