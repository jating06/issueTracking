const jwt = require('jsonwebtoken');
const tokenOperations = {
    SECRETKEY:'UCANTSEEME',
    generateToken(userid){
    var token = jwt.sign({userid }, this.SECRETKEY,{ expiresIn: '1h' });
        return token;
    },
    verifyToken(clientTokenNumber,){
        
      return decoded=  jwt.verify(clientTokenNumber, this.SECRETKEY, function(err, decoded) {
            if(decoded){
                true
                }
                else{
                false
                }
                return decoded
          });
    
       
 

}}
module.exports = tokenOperations;