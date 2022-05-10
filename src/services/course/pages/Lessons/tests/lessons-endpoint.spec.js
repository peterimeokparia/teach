import {
get, 
add,
update } from 'services/course/api';

const PREFIX = "http://localhost:3000/api/v1";

jest.mock('../../../Api');

let lesson = {
  courseId: "COURSE7fab4846c2a96278c56381c9",
  lessonId: "LESSON7fab4846c2a96278c56381c9",
  lessonDate: '05/20/2021',
  userId: "PERSON5fab4846c2a96278c56381c9",
  title: "New Planets"
};

let lessonToUpdate = {
    courseId: "COURSE7fab4846c2a96278c56381c9",
    lessonId: "LESSON7fab4846c2a96278c56381c9",
    lessonDate: '05/10/2021',
    userId: "PERSON5fab4846c2a96278c56381c9",
    title: "The Birth Of A Planet",
    _id: "5fab4846c2a96278c56381c8"
};

describe('LESSON ENDPOINTS', () => {

    it('Adds A New Lesson.', async () => {
        const res = await add(lesson, '/lessons', PREFIX); 
        expect(res?.courseId).toEqual( lesson?.courseId );
        expect(res?.userId).toEqual( lesson?.userId );
    });

    it('Gets All lessons.', async () => {
        const res = await get('/lessons', PREFIX);
        expect(res[res.length - 1]?.courseId).toEqual( lesson?.courseId );
        expect(res.length).toEqual( 3 );
    });

    it('Updates The Selected lesson.', async () => {
        const res = await update(lessonToUpdate, '/lessons/', PREFIX);
        expect(res.data['/lessons'][res.data['/lessons'].length - 1 ]?.courseId).toEqual( lesson?.courseId );
        expect(res.data['/lessons']?.find( _lesson => _lesson?._id === lessonToUpdate?._id).title).toEqual( lessonToUpdate?.title );
        expect(res.data['/lessons'].length).toEqual( 3 );
    });
});