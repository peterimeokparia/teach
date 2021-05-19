import Jwt from 'jsonwebtoken';

export const privateKey = "secret_nsa_key";

export const tokenGenerator = ( user, key ) => {
  const token = Jwt.sign({  user }, key);
   return token;
}

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
}
 


      
 

 // verify token
// ...
// Jwt.verify(request.token, privateKey, (err, data) => {
//     if ( err ){
//        resizeBy.sendStatus(403);
//     }else{
//        response.json({ text: "", data: data})
//     }
// });


// //middleware
// const ensureToken = (request, response, next) => {
//    const bearerHeader = request.headers["authorization"];
//    if ( typeof bearerHeader !== 'undefined' ){
//       const bearer = bearerHeader.split(" ");
//       const bearerToken = bearer[1];
//       request.token = bearerToken;
//       next();
//    } else {
//       response.sendStatus(403);
//    }
// }

//https://blog.logrocket.com/mern-app-jwt-authentication-part-1/
//https://www.npmjs.com/package/jsrsasign
// import JSRSASign from 'jsrsasign';
// //import Jwt from 'jsonwebtoken';
// const claims = {
//   Username: "peter",
//   Age: 42,
//   FUllname: "Peter Imeokparia"
// }
// const key = "$JWTTokenTest@!";
// const header = {
//   alg: "HS512",
//   typ: "JWT"
// }

// var sHeader = JSON.stringify(header);
// var sPayload = JSON.stringify(claims);
// export const sJWT = JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, key);
// console.log(sJWT);
// console.log(sJWT);

//JsonWebToken Example
//https://www.youtube.com/watch?v=xBYr9DxDqyU
// import Jwt from 'jsonwebtoken';
// const user = { id: 3};
// const token = jwt.sign( { user }, 'secret_nsa_key' )
// const token = Jwt.sign({  user }, privateKey);
//...response.jsn({ token: token })
