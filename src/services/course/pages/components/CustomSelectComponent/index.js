import { role } from 'services/course/helpers/PageHelpers';
import useCustomSelectHook from 'services/course/pages/components/CustomSelectComponent/hooks/useCustomSelectHook.js';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './style.css';

const CustomSelectComponent = ({ 
    formFieldElement,  
    currentUser,
    dropDownOptions,
    setInputValue,
    previewMode,
    formBuilderState,
    studentAnswer }) => {

    let {
        optionsList,
        isOptionsOpen, 
        selectedOption, 
        handleSelected,
        setSelectedOption,
        setIsOptionOpen,
        toggleOptions,
        setSelectedThenCloseDropdown,
        handleKeyDown,
        handleListKeyDown
    } = useCustomSelectHook( dropDownOptions, setInputValue, previewMode, formFieldElement, studentAnswer, formBuilderState );
   
return (
    <div className="wrapper">
      <div className="container">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? "expanded" : ""}
          onClick={toggleOptions}
          onKeyDown={handleListKeyDown}
        >
          {/* {optionsList[selectedOption]?.id} */}
          {
            <>
            <div className='row'> 
            <div className='col expand-icon'>
             {( isOptionsOpen ) 
                ? <ExpandMoreIcon style={{fontSize: 45,  "paddingLeft": "10px"}}/>
                : <ExpandLessIcon style={{fontSize: 45,  "paddingLeft": "10px"}}/>
             }
             {
                <>
                <div className="selected-editor"> 
                  <div className={( currentUser.role === role.Student ) ? "answer-content-overlay": ""}/>
                  <MyEditorTest2 
                    element={ formFieldElement } 
                    content={ handleSelected(selectedOption) }  
                    readOnly={ true }
                  />    
                </div>
              </>
             }
            </div>
           
            </div>
            </>
          }
        </button>
        <ul
          className={`options ${isOptionsOpen ? "show" : ""}`}
          role="listbox"
          aria-activedescendant={optionsList[selectedOption]?.id}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
        >
         {optionsList.map((option, index) => (
            <li
              id={option?.id}
              role="option"
              aria-selected={selectedOption == index}
              tabIndex={0}
              onKeyDown={handleKeyDown( index, option )}
              onClick={() => {
                setSelectedThenCloseDropdown( index, option  );
              }}
            >
              {
                <>
                <div className='select-editor'>
                <div className={( currentUser.role === role.Student ) ? "answer-content-overlay": ""}/>
                   <MyEditorTest2 
                    element={ formFieldElement } 
                    content={ option?.markDownContent } 
                    readOnly={ true }
                  />    
                </div>
                </>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  ); 
};

export default  CustomSelectComponent;
