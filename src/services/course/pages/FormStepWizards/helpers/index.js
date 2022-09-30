import { navigate } from '@reach/router';

export const handleNavigation = ( stepId ) => {
    navigate(`/teach/formquestionsstep${stepId}`);
};