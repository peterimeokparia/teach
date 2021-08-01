import Jwt from 'jsonwebtoken';

export const privateKey = "secret_nsa_key";

export const tokenGenerator = ( user, key ) => {
  const token = Jwt.sign({  user }, key);
   return token;
};

export const verifyToken = ( request, key ) => {
   Jwt.verify(request.token, key, (err, data ) => {
      if ( err ){
         console.log(err); 
         } else {
         console.log(data);
      }
   });    
};
  
export const ensureToken = (request, response, next) => {
const bearerHeader = request.headers["authorization"];
   if ( typeof bearerHeader !== 'undefined' ) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      request.token = bearerToken;
      next();
   } else {
      response.sendStatus(403);
   }
};
