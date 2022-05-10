import {
encodeData,
decodeData,
generateKeyPair,
encryptData,
decryptData } from '../../../../../backend/security/index.js';

describe('base64 Encodes data', () =>  {  

    it('should encode a buffer', () => {
        let rawData = 'rawData';
        let bufferedData = new Buffer.from( rawData );
        let isBase64Encoded = new Buffer.from( rawData ).toString('base64');
        expect( encodeData( bufferedData ) ===  isBase64Encoded ).toBe(true);
    });

    it('should encode a string', () => {
        let rawData = 'rawData';
        let isBase64Encoded = new Buffer.from( rawData ).toString('base64');
        expect( encodeData( rawData ) === isBase64Encoded ).toBe( true );
    });

    it('should encode an object', () => {
        let rawData = { rawData: 'rawData' };
        let jsonStringObject = JSON.stringify( rawData );
        let isBase64Encoded = new Buffer.from( jsonStringObject ).toString('base64');
        expect( encodeData( rawData ) === isBase64Encoded ).toBe( true );
    });
});

describe('Decodes from base64String representation', () =>  {  

    it('should decode back to a string from buffer', () => {
        let rawData = 'rawData';
        let bufferedData = new Buffer.from( rawData );
        expect( decodeData( encodeData( bufferedData )) === (rawData) ).toBe(true);
    });

    it('should decode back to a string', () => {
        let rawData = 'rawDataTest';
        expect( decodeData( encodeData( `${rawData}` ) ) ===  `${rawData}`).toBe(true);
    });

    it('should decode back to an object', () => {
        let rawDataObject = { data: 'rawData'};
        let result = decodeData( encodeData( rawDataObject ));
        expect( typeof result === 'object' ).toBe(true);
        expect( typeof rawDataObject === 'object' ).toBe(true);
        expect( result?.data === rawDataObject?.data ).toBe(true);
    });
});

describe('Encrypts and decrypts an object', () => { 
    
    let encrypted, decrypted;

    beforeAll(async () => {
        const rawData = {
            test: 'test'
        };
        const { publicKey, privateKey } = generateKeyPair();
        encrypted = encryptData(publicKey, JSON.stringify( rawData ) );
        decrypted = decryptData(privateKey, encrypted);
    });
   
    it('should encrypt the raw data', () => {
        expect( Buffer.isBuffer( encrypted )).toBe(true);
    });

    it('should decrypt the raw data', () => {
        expect( typeof decrypted === 'object' ).toBe(true);
    });
});
    
describe('Encrypts and decrypts a string', () => {  

    let encrypted, decrypted;

    beforeAll(async () => {
        const rawData = 'test';
        const { publicKey, privateKey } = generateKeyPair();
        encrypted = encryptData(publicKey,  rawData );
        decrypted = decryptData(privateKey, encrypted);
    });
   
    it('should encrypt the raw data', () => {
        expect( Buffer.isBuffer( encrypted )).toBe(true);
    });

    it('should decrypt the raw data', () => {
       expect( typeof decrypted === 'string' ).toBe(true);
    });
});
      
      
      
      