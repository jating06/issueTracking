app.controller('ctrl2',($scope,$http,$rootScope,registerfactory)=>{
  $rootScope.obj={
   
    "background-image" : 'url(../resources/Blurred-Background-Sunset-3c-Free.jpg)',
    "background-size":"cover"
}
 $scope.register=()=>{
     $location.path('/register')
 }
    $scope.register=()=>{ 
      $http({
        url:'/register',
          method:'GET',
         params:{  name:$scope.name,
            password:$scope.password,
            phoneNo:$scope.phoneNo,
            role:$scope.role,
            emailId:$scope.emailId}

      })
     
 
    
}
})