import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledMenu } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/FormFieldPanel/helpers';
import { handleChangedValue } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/helpers';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import TemporaryDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/TemporaryDrawer';
import EquationDrawer from 'services/course/pages/components/EquationDrawer';
import useFormFieldPanelHook from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/FormFieldPanel/hooks/useFormFieldPanelHook';
import LabelSelector from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/LabelSelector';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import DeleteIcon from '@material-ui/icons/Delete';
import Latex from 'react-latex'; 
import './style.css';

function FormFieldPanel({ props, children }) {
  let {
      previewMode,
      openDrawer,
      formFieldElement,
      addGroupedFormFields,
      onhandleSelected,
      setPoints,
      saveFormField,
      setInputValue,
      openEquationDrawer
  } = props;

  let {
    open,
    anchorEl,
    handleClick,
    handleClose,
    openModal,
    openMathModal,
    openLabelSelectorModal,
  } = useFormFieldPanelHook( props );

  const displayContextMenu = () => {
      return <div>
          <Button 
            className="customized-button"
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
          </Button>
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      { ( children ) && 
        <MenuItem onClick={openLabelSelectorModal} disableRipple>
          <FileCopyIcon />
            Set Label Value
        </MenuItem>
      }
      <MenuItem onClick={openModal} disableRipple>
        <EditIcon />
        Add / Remove
      </MenuItem>
      { ( children ) && 
        <MenuItem onClick={openMathModal} disableRipple>
          <FileCopyIcon />
            Math Science
        </MenuItem>
      }
      <Divider sx={{ my: 0.5 }} />
      {/* <MenuItem onClick={moveInput} disableRipple>
        <ArchiveIcon />
        { ( moveInputField ) ? 'Stop Move' : 'Move' } 
      </MenuItem> */}
      <MenuItem onClick={handleClose} disableRipple>
        <MoreHorizIcon />
        More
      </MenuItem>
    </StyledMenu>
    </div>;
  };

  const addPointsTest = () => {
    return  <div className="modal-content">
            {   
                <span className="">
                  <PlusOneIcon 
                    className="comment-round-button-2"
                    onClick={() => addGroupedFormFields( formFieldElement )}
                  />
                  <DeleteIcon 
                    className="comment-round-button-3"
                    onClick={() => onhandleSelected( formFieldElement )}
                  />
                  <input
                      className="points-input"
                      type="number" 
                      value={ !formFieldElement?.answerKey ? 0 : (formFieldElement?.points ? formFieldElement?.points : 0 ) }
                      onChange={ e => setPoints( e?.target?.value ) }  
                      min={0} 
                  />
                </span>  
            }
            { ( previewMode ) && 
                <div className="points-title">
                  <div>
                    <input
                      className="points-input"
                      type="number" 
                      value={ !formFieldElement?.answerKey ? 0 : (formFieldElement?.points ? formFieldElement?.points : 0 ) }
                      onChange={ e => setPoints( e?.target?.value ) }  
                      min={0} 
                    />
                  </div>
                </div> 
            }
            { (formFieldElement?.answerKey !== null) &&
                <div className="answer-title">
                  <label>{"answer:"}</label>
                    <label>
                    { formFieldElement?.answerKey } 
                    </label>
                </div>
            }
          </div>;
  };

  return (
    <div>
      {( openDrawer && formFieldElement.inputType !== inputType.DropDown ) && 
        displayContextMenu()
      }
      {
        <TemporaryDrawer 
          anchor='right'
          setToggleDrawer={openDrawer} 
        >
          {( formFieldElement.inputType !== inputType.DropDown ) &&
              <LabelSelector setLabelValue={labelValue => handleChangedValue( labelValue, setInputValue, { ...formFieldElement, inputValue: labelValue }, saveFormField )}/> 
          }
          { addPointsTest() } 
        </TemporaryDrawer>
      }
    </div>
  );
}

export default FormFieldPanel;