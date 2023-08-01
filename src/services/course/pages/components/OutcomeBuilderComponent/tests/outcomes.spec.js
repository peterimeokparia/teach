
import { addNewOutcome  } from "services/course/actions/outcomes";
import { ADD_NEW_OUTCOME_BEGIN  } from "services/course/actions/outcomes";

jest.mock('../../../../api');

describe('outcomeBuilderComponent', () => {
   let outcomeProps = {
      title: 'Create', 
      type: 'Course',
      userId: '007',
      courseId: 'Universe',
      outcomeCreationDate: '12:00:00',
      color: 'blue',
      outcomeVerbListId: '001'
}

it('should add a new course outcome', async () => {
      const mockDispatch = jest.fn();

      await addNewOutcome(outcomeProps)(mockDispatch);
   
      expect(mockDispatch.mock.calls.length).toBe(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({type: ADD_NEW_OUTCOME_BEGIN});
      expect(mockDispatch.mock.calls[1][0]).toEqual({
         type:"ADD NEW OUTCOME SUCCESS",
         payload:{
            title:"Create",
            type:"Course",
            userId:"007",
            courseId:"Universe",
            outcomeCreationDate:'12:00:00',
            color:"blue",
            outcomeVerbListId:"001"
         }});
   });

});
