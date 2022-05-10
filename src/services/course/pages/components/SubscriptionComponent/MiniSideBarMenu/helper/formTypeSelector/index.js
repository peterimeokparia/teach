import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import Quizz from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector/Quizz';
import Basic from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector/Basic';

const formTypeSelector = ( props ) => {

let { 
    question,
    field,
    formType
    } = props;

    
    switch ( formType ) {

        case formTypes?.basic:
            return <Basic question={question}/>;

        case formTypes?.quizzwithpoints:
            return <Quizz field={field}/>;
        // default:
        //     return <Basic question={question}/>
            
    }
};

export default formTypeSelector;