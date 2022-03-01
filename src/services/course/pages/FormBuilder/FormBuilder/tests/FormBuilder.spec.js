import {
getSortedRecords } from 'services/course/selectors';

import {
rePositionRecords } from 'services/course/pages/FormBuilder/FormQuestions/helper';

describe('Form Builder', () =>  {  
  let formQuestions = [
    { _id: '005', position: 5 },
    { _id: '002', position: 2 },
    { _id: '003', position: 3 },
    { _id: '006', position: 6 },
    { _id: '001', position: 1 },
    { _id: '004', position: 4 },
    { _id: '008', position: 8 },
    { _id: '007', position: 7 }
  ];

 it('should return the same length.', async () => {
      
   let items = rePositionRecords( formQuestions, getSortedRecords );

    expect(items?.length).toBe(8);
 
  });

  it('should sort form questions.', async () => {
      
    let items = rePositionRecords( formQuestions, getSortedRecords);

     expect(formQuestions?.find( item => item?._id === '003' )?.position ).toBe( items[2]?.position );  
   });
 });




