
import {
modifyImageBlockWithNewFileUpload,
modifyImageBlockWitExistingFileUpload
} from 'services/course/middleware/editor/fileUploads';

describe('Editor File Upload', () => {  

  const blobUrl = "url=http://localhost:3000/files/blob00001";
  const fileName = "http://localhost:3000/files/27177.jpg";
  const markDownContentType = "markDownContent";
  let markDownContent=`<image-block url=${blobUrl} width="1200" height="630" loading="false" loading_progress="100" caption="caption!" direction="center" aspect_ratio="{&quot;width&quot;:1000,&quot;height&quot;:525,&quot;ratio&quot;:52.5}"></image-block>`;

   it('Adds an image-block with a src url to the markDownContent.', () => {

    let markDownContent=`<image-block width="1200" height="630" loading="false" loading_progress="100" caption="caption!" direction="center" aspect_ratio="{&quot;width&quot;:1000,&quot;height&quot;:525,&quot;ratio&quot;:52.5}"></image-block>`;

    let answerExplanationMarkDownContent="";

    let question = {
      questions:[],
      files:[],
      coursesCovered:null,
      lessonsCovered:null,
      lessonId: "LESSON5fab4846c2a96278c56381c9",
      studentId: "STUDENT5fab4846c2a96278c56381c9",
      operatorId: "OPERATOR5fab4846c2a96278c56381c9",
      examId: "EXAM5fab4846c2a96278c56381c9",
      assignmentId: "ASSIGNMENT5fab4846c2a96278c56381c9",
      markDownContent,
      answerExplanationMarkDownContent
    };

    let modifiedImageMarkDownContent = modifyImageBlockWithNewFileUpload(question, markDownContentType, fileName);

    console.log(modifiedImageMarkDownContent)
    expect(modifiedImageMarkDownContent?.includes(fileName)).toEqual(true);

  });

  it('Replaces a blob-url with a src url on the markDownContent.', () => {

    let markDownContent=`<image-block ${blobUrl} width="1200" height="630" loading="false" loading_progress="100" caption="caption!" direction="center" aspect_ratio="{&quot;width&quot;:1000,&quot;height&quot;:525,&quot;ratio&quot;:52.5}"></image-block>`;

    let answerExplanationMarkDownContent="";

    let question = {
      questions:[],
      files:[],
      coursesCovered:null,
      lessonsCovered:null,
      lessonId: "LESSON5fab4846c2a96278c56381c9",
      studentId: "STUDENT5fab4846c2a96278c56381c9",
      operatorId: "OPERATOR5fab4846c2a96278c56381c9",
      examId: "EXAM5fab4846c2a96278c56381c9",
      assignmentId: "ASSIGNMENT5fab4846c2a96278c56381c9",
      markDownContent,
      answerExplanationMarkDownContent
    };

    let modifiedImageMarkDownContent = modifyImageBlockWitExistingFileUpload(question, markDownContentType, fileName, blobUrl);
    console.log(modifiedImageMarkDownContent)
    expect(modifiedImageMarkDownContent?.includes(fileName)).toEqual(true);

  });
 
});

