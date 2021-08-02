import { 
passwordFailedValidationMessages,
passwordValidator } from 'services/course/helpers/PageHelpers';

jest.mock('../../../Api');

describe('pageHelpers: password passed validation', () => {
   const password = "test";
  
   it('should return an object', async () => {
      let password = "test";

      let passwordReturnValue = passwordValidator( password )
      expect( (typeof passwordReturnValue) ).toEqual('object');
   });

   it('must contain at least one upper case character.', async () => {
      let password = "teAt";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.validPasswordTest?.
         find(psswrd => psswrd?.message === passwordFailedValidationMessages?.upperCase);
      expect( (requirement?.message) ).toEqual(passwordFailedValidationMessages?.upperCase);
   });

   it('must contain at least one lower case character.', async () => {
      let password = "AAb";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.validPasswordTest?.
         find(psswrd => psswrd?.message === passwordFailedValidationMessages?.lowerCase);
      expect( (requirement?.message) ).toEqual(passwordFailedValidationMessages?.lowerCase);
   });

   it('must have a minimum length of 8 characters.', async () => {
      let password = "AAbctyQq";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.validPasswordTest?.
         find(psswrd => psswrd?.message === passwordFailedValidationMessages?.length);
      expect( (requirement?.message) ).toEqual(passwordFailedValidationMessages?.length);
   });

   it('must have a length between 8 to 20 characters.', async () => {
      let password = "AAbctyQqQaa";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.validPasswordTest?.
         find(psswrd => psswrd?.message === passwordFailedValidationMessages?.length);
      expect( (requirement?.message) ).toEqual(passwordFailedValidationMessages?.length);
   });

   it('must contain at least one number.', async () => {
      let password = "AAbcty7QqQaa";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.validPasswordTest?.
         find(psswrd => psswrd?.message === passwordFailedValidationMessages?.number);
      expect( (requirement?.message) ).toEqual(passwordFailedValidationMessages?.number);
   });

   it('must contain at least one of the following symbols:- $@$!%*#?& .', async () => {
      let password = "AAbcty!7QqQaa";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.validPasswordTest?.
         find(psswrd => psswrd?.message === passwordFailedValidationMessages?.symbol);
      expect( (requirement?.message) ).toEqual(passwordFailedValidationMessages?.symbol);
   });

});


describe('pageHelpers: password failed validation', () => {
   const password = "test";
  
   it('fails if it does not contain at least one upper case character.', async () => {
      let password = "teaaaaaa7@";

      let passwordReturnValue = passwordValidator( password );
      let requirement = passwordReturnValue?.failedPasswordTest?.
         filter(psswrd => psswrd === passwordFailedValidationMessages?.upperCase);
      expect( (requirement[0]) ).toEqual(passwordFailedValidationMessages?.upperCase);
      expect( (requirement?.length ) ).toEqual(1);
   });

   it('fails if it does not contain at least one lower case character.', async () => {
      let password = "AAQQQ7777!!!";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.failedPasswordTest?.
      filter(psswrd => psswrd === passwordFailedValidationMessages?.lowerCase);
      expect( (requirement[0]) ).toEqual(passwordFailedValidationMessages?.lowerCase);
      expect( (requirement?.length ) ).toEqual(1);
   });

   it('fails if it does not have a minimum length of 8 characters.', async () => {
      let password = "AaQ777!";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.failedPasswordTest?.
      filter(psswrd => psswrd === passwordFailedValidationMessages?.length);
      expect( (requirement[0]) ).toEqual(passwordFailedValidationMessages?.length);
      expect( (requirement?.length ) ).toEqual(1);
   });

   it('fails if it has no numbers.', async () => {
      let password = "aaaaaAAAA@aaaaaAAAAA";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.failedPasswordTest?.
      filter(psswrd => psswrd === passwordFailedValidationMessages?.number);
      expect( (passwordReturnValue?.failedPasswordTest?.includes( passwordFailedValidationMessages?.number )) ).toBe(true);
      expect( (requirement?.length ) ).toEqual(1);
   });

   it('fails if it has none of these symbols:- $@$!%*#?&', async () => {
      let password = "aaaaaAAAAKAYaaaAAAAA";

      let passwordReturnValue = passwordValidator( password )
      let requirement = passwordReturnValue?.failedPasswordTest?.
      filter(psswrd => psswrd === passwordFailedValidationMessages?.symbol);
      expect( (passwordReturnValue?.failedPasswordTest?.includes( passwordFailedValidationMessages?.symbol )) ).toBe(true);
      expect( (requirement?.length ) ).toEqual(1);
   });
});

describe('pageHelpers: password strength', () => {
  
   it('fails if it does not contain at least one upper case character.', async () => {
      let password = "aaaplant7@aaaplant7";
      let passwordReturnValue = passwordValidator( password );
      let strength = passwordReturnValue?.passwordStrength;
      
      expect( ( strength ) ).toEqual(80);
   });

   it('fails if it does not contain at least one upper case character and one symbol.', async () => {
      let password = "aaaplant7aaaplant7";

      let passwordReturnValue = passwordValidator( password );
      let strength = passwordReturnValue?.passwordStrength;

      expect( ( strength ) ).toEqual(60);
   });

   it('puts password strength at 100 if matching all requirements.', async () => {
      let password = "aaaplant7@Aaplant7";

      let passwordReturnValue = passwordValidator( password );
  
      console.log(passwordReturnValue?.validPasswordTest)
      let strength = passwordReturnValue?.passwordStrength;
      
      expect( ( strength ) ).toEqual(100);
   });

});