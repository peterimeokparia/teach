// const { 
// generateKeyPairSync,
// publicEncrypt,
// privateDecrypt,
// constants } from 'crypto';

// const encodeBuffer = buffer => buffer.toString('base64');
// const encodeString = string => encodeBuffer( Buffer.from( string ) );
// const encodeObject = object => encodeString( JSON.stringify( object ) );

// export function encodeData( data ){
//     if ( Buffer.isBuffer( data ) ) return encodeBuffer( data );
//     if ( typeof data === 'string' ) return encodeString( data );
//     return encodeObject( data );
// };

// export function decodeData( data ){
//     let decoded = Buffer.from(data, 'base64').toString();
//     try {
//         return JSON.parse( decoded );
//     } catch (error) {
//         return decoded;
//     }
// };

// export function encryptData(publicKey, rawData){
//     if ( !rawData || !publicKey ) throw Error(`Kindly provide input args`);

//    let dataToEncrypt = ( typeof rawData === 'object' ) ? JSON.stringify( rawData ) : rawData;

//     let encrypted = publicEncrypt({
//         key: publicKey,
//         padding: constants.RSA_PKCS1_OAEP_PADDING,
//         oaepHash: "sha256",
//     },
//         Buffer.from( dataToEncrypt )
//     );
//     return encrypted;
// };

// export function decryptData(privateKey, encryptedData){
//     if ( !encryptedData || !privateKey ) throw Error(`Kindly provide input args`);
//     try {
//         return JSON.parse( privateDecryptData(privateKey, encryptedData) );
//     } catch (error) {
//         console.log( error );
//         return privateDecryptData(privateKey, encryptedData).toString();
//     }
// };

// function privateDecryptData( privateKey, encryptedData ){
//     return privateDecrypt({
//         key: privateKey,
//         padding: constants.RSA_PKCS1_OAEP_PADDING,
//         oaepHash: "sha256"
//     },
//         encryptedData
//     );
// };

// export function generateKeyPair(){
//     const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//         modulusLength: 2048
//     });
//     return { publicKey, privateKey };
// };