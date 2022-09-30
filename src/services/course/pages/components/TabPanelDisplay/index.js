import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { role } from 'services/course/helpers/PageHelpers';
import Roles from 'services/course/pages/components/Roles'; 
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import useTabPanelDisplayHook from 'services/course/pages/components/TabPanelDisplay/hooks/useTabPanelDisplayHook';
import HeaderPanelCreate from 'services/course/pages/components/TabPanelDisplay/helper/panels/HeaderPanelCreate';
import HeaderPanelTake from 'services/course/pages/components/TabPanelDisplay/helper/panels/HeaderPanelTake'; 
import HeaderPanelReview from 'services/course/pages/components/TabPanelDisplay/helper/panels/HeaderPanelReview'; 
import HeaderPanelTable  from 'services/course/pages/components/TabPanelDisplay/helper/panels/HeaderPanelTable'; 
import useSetFormBuilderHook from 'services/course/pages/FormBuilder/hooks/useSetFormBuilderHook';
import './style.css';

export default function TabPanelDisplay({ props }) {  
  const theme = useTheme();
  
  const { currentUser, formBuilders, formType, formName, lessonId, loadFormBuilders, loadTestTimers } = props;

  let { 
    pendingFormsInBuildState, publishedFormsInBuildState, inProgressFormsInTakingState,
    userSubmittedFormsForCreatorReviewInTakingState, allUserSubmittedFormsForCreatorReviewInTakingState, formsInBuildState
  } = useSetFormBuilderHook( formType, currentUser, loadFormBuilders, loadTestTimers, formBuilders );

  let {
    headerPanelProps
  } = useTabPanelDisplayHook({ ...props, pendingFormsInBuildState, publishedFormsInBuildState, inProgressFormsInTakingState,
    userSubmittedFormsForCreatorReviewInTakingState,allUserSubmittedFormsForCreatorReviewInTakingState, formsInBuildState
  });

  const { fabs, toggleHeaderTabs, headerValue, transitionDuration, handleChangeIndex } = headerPanelProps;

return (
    <>
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 1700,
        position: 'relative',
        minHeight: 200,
        marginLeft: -50
      }}
      className="formbuilder"
    >
      <AppBar position="static" color="default" >
          {toggleHeaderTabs( headerValue, `Create ${ formType }`, `Take ${ formType }`, `Review User Submitted ${ formType }`, "Tables")
        } 
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={headerValue}
        onChangeIndex={handleChangeIndex}
      >
        { <Roles role={ currentUser?.role === role.Tutor}>
            <HeaderPanelCreate
              props={ headerPanelProps }  
              formName={ formName }
              lessonId={ lessonId }
              formType={ formType }
            />
          </Roles>
        }

        {
          <HeaderPanelTake
            props={ headerPanelProps }  
            formName={ formName }
            lessonId={ lessonId }
            formType={ formType }
          />
        }

        { <Roles role={ currentUser?.role === role.Tutor}>
          <HeaderPanelReview
            props={ headerPanelProps }  
            formName={ formName }
            lessonId={ lessonId }
            formType={ formType }
          />
          </Roles>
        } 

        {<Roles role={ currentUser?.role === role.Tutor}>
          <HeaderPanelTable
            props={ headerPanelProps }  
            formName={ formName }
            lessonId={ lessonId }
            formType={ formType }
          />
          </Roles>
        }

      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          // key={fab.color}
          in={headerValue === index }
          timeout={transitionDuration}
          style={{
            "top": "-45px",
            "left": "48%",
            color:"greenyellow",
            transitionDelay: `${(headerValue === index) ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
    </>
  );
}

