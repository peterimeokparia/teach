import { inputType } from 'services/course/pages/QuestionsPage/helpers';

const handleDraggable = ( props ) => {
    let { answer } = props;

    if ( answer?.inputType !== inputType.DraggableListItem ){
      return;
    }
};

export default handleDraggable;