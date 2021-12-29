import {
LOAD_LOGINS_SUCCESS,
loadPagedLoginSessions } from 'services/course/actions/logins';

jest.mock('../../../../Api');

describe('Pagination', () =>  {  

   it('Page 1: should return a subset of pages based on a set limit', async () => {

    let userId = '5fab4846c2a96278c56381c9';
    let page = 1;
    let limit = 5;

    const mockDispatch = jest.fn();

    await loadPagedLoginSessions(userId, page, limit)(mockDispatch);
    console.log('get page set', mockDispatch.mock.calls[0][0].type)
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch.mock.calls[0][0].type).toEqual(LOAD_LOGINS_SUCCESS);
    expect(mockDispatch.mock.calls[0][0].payload?.results?.length).toEqual(5);

    // payload: {
    //   next: { page: 2, limit: 5 },
    //   total: 11,
    //   page: 1,
    //   pages: 3,
    //   resultTest: [
    //     [Object], [Object],
    //     [Object], [Object],
    //     [Object], [Object],
    //     [Object], [Object],
    //     [Object], [Object],
    //     [Object]
    //   ],
    //   results: [ [Object], [Object], [Object], [Object], [Object] ]
    // }
  });

  it('Page 2: should return a subset of pages based on a set limit', async () => {

    let userId = '5fab4846c2a96278c56381c9';
    let page = 2;
    let limit = 5;

    const mockDispatch = jest.fn();

    await loadPagedLoginSessions(userId, page, limit)(mockDispatch);
    expect(mockDispatch.mock.calls[0][0].payload?.results?.length).toEqual(5);
  });


  it('Page 3: should return a subset of pages based on a set limit', async () => {

    let userId = '5fab4846c2a96278c56381c9';
    let page = 3;
    let limit = 5;

    const mockDispatch = jest.fn();
    await loadPagedLoginSessions(userId, page, limit)(mockDispatch);
    expect(mockDispatch.mock.calls[0][0].payload?.results?.length).toEqual(1);
  });


 });




