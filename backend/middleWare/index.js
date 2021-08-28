import Jwt from 'jsonwebtoken';
//export const privateKey = "secret_nsa_key"; 

export function verifyRoute( req, res, next ){
    if( req.headers['authorization'] ) {
        try {
            let authorizationHeader = req.headers['authorization'].split(" ");
            if ( authorizationHeader[0] !== "Bearer" ) {
                return res.status(401).json({ error: 'Bearer not set in header'});
            } else {
                let result = verifyToken( authorizationHeader[1], process.env.NSAKEY );
                return next();
            }
        } catch (error) {
            return res.status(403).json({ error });
        }
    } else {
        return res.status(401).json({ error: 'Authorization header not set'});
    }
};

export async function verifyToken( token, key ){
  let verificationResult = await Jwt.verify(token, key, (err, data ) => {
      if ( err ){
         console.log(err); 
         } else {
         console.log(data);
      }
   });   
   return verificationResult
};

export function logRouteInfo( req, res, next ){
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    console.log('Request Method:', req?.method);
    console.log('Request Route:',req?.originalUrl);
    console.log('Request Body:',req?.body);
    console.log('Full Request:',req);
    next();
};