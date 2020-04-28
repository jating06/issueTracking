app.factory('registerfactory',($q,TOKEN,$http)=>{
return{
    giveToken(){
        let defer = $q.defer();
          

$http.get("http://localhost:1234/getToken").then((data)=>{
        
            defer.resolve(data);
        },(error)=>{
            defer.reject(error);
        });
       
        return defer.promise;
}
}
})