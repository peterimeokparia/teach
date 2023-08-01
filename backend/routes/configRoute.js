const express = require('express');

const configModel = require('../model/configModel.js');

const {
getPostData,    
saveUpdatedData } = require('../helpers/storageHelper.js');

const { 
generateKeyPairSync } = require('crypto');

const bcrypt = require('bcrypt');
const { appendFile, readdir, readFile } = require('fs');

const configRoute = express.Router();

// configRoute.get('/', (req, res) => {
//     configModel.find({})
//     .then(data => {
//         console.log('configRoute', data);
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         console.log(error);
//         return res.status(400).json({ error })
//     });
//  });

//  configRoute.get('/config', (req, res) => {
//     let id = { _id: req.query.id };
//     configModel.findById( id )   
//     .then(data => {
//       return res.status(200).json(data);
//     })
//     .catch( error => {
//       console.log( error );
//       handleBackEndLogs(configRoute, error );
//       return res.status(400).json({ error });
//     });
//   });

//   configRoute.get('/decrypt', async (req, res) => {
//     let id = { _id: req.query.id };
//     configModel.findById( id )   
//     .then(async data => {

//       // console.log('data data');

//       // console.log(data );

//       // console.log(data?.privateKey );

//       // let parsedPrivateKey =  data.privateKey;

//         //readFile('../public/files/testKeys.txt', "utf8", async ( err, filedata ) => { 

//               // console.log('file file')
//               // console.log(filedata);
//               // console.log(JSON.parse(filedata)?.id);
//               // console.log(id);
//               // console.log('parsedkey');
//               // console.log( parsedPrivateKey );

//               // let parsedFileData = JSON.parse(filedata);

//               //  if ( parsedFileData?.id === id?._id ){

//                 // console.log('id');

//                 // console.log(parsedFileData?.id);

//                // let isMatch = await bcrypt.compare( JSON.stringify( parsedFileData?.privateKey ), parsedPrivateKey );

//                 //if ( isMatch ) {

//                 //   console.log('is a match');

//                 //   console.log(parsedFileData?.privateKey);

//                 //   console.log(data?.publicKey);

//                 //  console.log( JSON.parse( data?.publicKey ) )

//                   // const { encrypt,  decrypt } = joseEncryptDecrypt(parsedFileData?.privateKey, JSON.parse( data?.publicKey ));

//                   const { encrypt,  decrypt } = joseEncryptDecrypt(JSON.parse( data?.privateKey ), JSON.parse( data?.publicKey ));
          
//                   let decrypted = await decrypt( data?.encryptedData );
            
//                   if ( decrypted ) {
//                     console.log('decrypted')
//                     console.log( decrypted )
//                     return res.status(200).json(decrypted);
//                   }
//                // }
//               // };
//       //});  
//     })
//     .catch( error => {
//       console.log( error );
//       handleBackEndLogs(configRoute, error );
//       return res.status(400).json({ error });
//     });
//   });

//   configRoute.post('/encrypt', async (req, res) => {

//     console.log( Object.values( req.body ) )
   
//     let configData = getPostData( req );

//     let { jwPublicKey, jwPrivateKey  } = await makeSigningKeyPair();

//     if ( jwPublicKey && jwPrivateKey ){

//         const { encrypt } = joseEncryptDecrypt(jwPrivateKey, jwPublicKey);

//         encrypt( configData?.data )
//         .then( async response => {

//             console.log('encrypted data');
//             console.log( response );

//             const salt = await bcrypt.genSalt();

//             //if ( salt ) {
//               // let harshedPrivateKey = await bcrypt.hash( JSON.stringify( jwPrivateKey ), salt );

//                //if ( harshedPrivateKey ){

//                     // let encrypted = {
//                     //     privateKey: harshedPrivateKey,
//                     //     unharshedPrivateKey:JSON.stringify( jwPrivateKey ),
//                     //     publicKey: JSON.stringify( jwPublicKey ),
//                     //     encryptedData: response
//                     // };

//                     let encrypted = {
//                       privateKey: JSON.stringify( jwPrivateKey ),
//                       unharshedPrivateKey:JSON.stringify( jwPrivateKey ),
//                       publicKey: JSON.stringify( jwPublicKey ),
//                       encryptedData: response
//                   };
                    
//                     let config = new configModel(encrypted);
        
//                     let data = await config.save();
        
//                     if( data ) {
//                         console.log('saved', data);

//                         let fileData = JSON.stringify( {id: data?._id,  key: jwPrivateKey, privateKey: jwPrivateKey, publicKey: jwPublicKey });

//                         appendFile("../public/files/testKeys.txt", `${fileData}\n` , ( err ) => {
//                           console.log(err );
//                          });
//                         return res.status(200).json(data);
//                     }
//                 //}
//            //}
//         })
//         .catch( error => {
//             console.log(error);
//             return res.status(400).json({ error });
//         });
//     } else {
//         return res.status(400).json({ error: `problem with generating keyset` });
//     }
    
// });

//  configRoute.post('/', (req, res) => {
//      console.log( Object.values( req.body ) )
//     let configData = getPostData( req );
//     let config = new configModel(configData);
//     console.log(config);
//     config.save()
//     .then(data => {
//         console.log('saved', data);
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         console.log(error);
//         return res.status(400).json({ error });
//     });
// });

// configRoute.put('/:configId', (req, res) => {
//     saveUpdatedData(req, configModel, req.params.configId)
//     .then( data => {
//         console.log(data);
//         return res.status(200).json(data);
//     })
//     .catch( error => {
//         console.log(error);
//         return res.status(400).json({ error });
//     });
// });

// configRoute.delete('/:configId', (req, res) => {
//     configModel.findByIdAndDelete(req.params.configId)
//       .then(data => {
//         return res.status(200).json(data);
//       })
//       .catch( error => {
//         console.log( error );
//         handleBackEndLogs(USERROUTE, error );
//         return res.status(400).json({ error })
//       }); 
// });

// async function makeSigningKeyPair(){
//     const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//         modulusLength: 4096,  // the length of your key in bits
//         publicKeyEncoding: {
//           type: 'spki',       // recommended to be 'spki' by the Node.js docs
//           format: 'pem'
//         },
//         privateKeyEncoding: {
//           type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
//           format: 'pem'
//         //   cipher: 'aes-256-cbc',   // *optional*
//         //   passphrase: 'top secret' // *optional*
//         }
//     });
//     const jwPrivateKey = await jose?.JWK.asKey(privateKey, "pem");
//     const jwPublicKey = await jose?.JWK.asKey(publicKey, "pem");

//     return { jwPublicKey, jwPrivateKey  };
// };

module.exports = configRoute;