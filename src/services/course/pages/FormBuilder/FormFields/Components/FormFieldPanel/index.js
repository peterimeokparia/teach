import {
inputType } from 'services/course/pages/QuestionsPage/helpers';


import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import PlusOneIcon from '@material-ui/icons/PlusOne';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from 'services/course/pages/components/SubscriptionComponent/MiniSideBarButton';
import Modal from 'react-modal';
import Latex from "react-latex";
import './style.css';

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  
  export default function FormFieldPanel({ props, children }) {
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ menuVisible, setMenuVisibility ] = React.useState(false);
    const [ mathMenuVisible, setMathMenuVisibility ] = React.useState(false);
    const [ mathScience, setMathScience ] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };


    let {
        previewMode,
        formFieldElement,
        handleTogglingModal,
        currentUser,
        addGroupedFormFields,
        onhandleSelected,
        addFieldPoints,
        formType,
        moveInputField,
        setMoveInputField,
        setMathModalOpen,
    } = props;


    const handleClose = () => {
      setAnchorEl(null);
    };

    const closeModal = () => {
        setMenuVisibility( !menuVisible );
        handleTogglingModal();
    }

    const openModal = () => {
        setMenuVisibility( true );
        handleClose();
    }

    const closeMathModal = () => {
        setMathMenuVisibility( !mathMenuVisible );
        setMathScience( !mathScience );
        setMathModalOpen( false );
        handleTogglingModal();
    }

    const openMathModal = () => {
        setMathMenuVisibility(true );
        setMathScience( !mathScience );
        setMathModalOpen( true );
        handleClose();
    }

    const moveInput = () => {
        setMoveInputField( !moveInputField );
        handleClose();
    }

    const displayContextMenu = () => {
        return <div><Button 
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
        <MenuItem onClick={openModal} disableRipple>
          <EditIcon />
          Add
        </MenuItem>
        { ( children ) && <MenuItem onClick={openMathModal} disableRipple>
                        <FileCopyIcon />
                            Math Science
                        </MenuItem>
        }
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={moveInput} disableRipple>
          <ArchiveIcon />
         { ( moveInputField ) ? 'Stop Move' : 'Move' } 
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>
      </div>
    }

  const addPointsTest = () => {
 
   return  <Modal isOpen={menuVisible} onRequestClose={closeModal}
           style={{
               overlay: {
               backgroundColor: 'skyblue',
               opacity: 0.95
               },
               content: {
               width: '25%',
               height: '25%',
               "marginTop": "20%",
               "marginLeft": "37%",
               }
             }}
           > 
           {  <div className="modal-content">
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
                   </span>  
               }
               { ( previewMode ) && 
                   <div className="points-title">
                       <div>
                           <input
                               className="points-input"
                               type="number" 
                               value={ !formFieldElement?.answerKey ? 0 : (formFieldElement?.points ? formFieldElement?.points : 0 ) }
                               onChange={ e => addFieldPoints( e?.target?.value ) }
                               min={0} 
                           />
                       </div>
                   </div> 
               }
               { (formFieldElement?.answerKey !== null) &&
                   <div className="answer-title">
                       <label>{"Answer:"}</label>
                       <label>
                       { <Latex>{`$${formFieldElement?.answerKey}$`}</Latex> } 
                       </label>
                   </div>
               }
                   </div>
           }
         </Modal>  
    }

    const displayMathScienceField = () => { 
        return  <Modal isOpen={mathMenuVisible} onRequestClose={closeMathModal}
                style={{
                    overlay: {
                    backgroundColor: 'skyblue',
                    opacity: 0.95
                    },
                    content: {
                    width: '35%',
                    height: '35%',
                    "marginTop": "7%",
                    "marginLeft": "30%",
                    }
                  }}
                > 
                { <div className="modal-content">
                    
                  {
                      ( mathScience && children ) && children 
                  }
                 
                  </div>
                }
              </Modal>  
         }

    return (
      <div onBlur={() => handleClose}>

         { displayContextMenu() }

         { menuVisible && addPointsTest() }

         { ( mathScience && children ) && displayMathScienceField() }

         { ( ( formFieldElement?.inputType === "latexfield" && previewMode && children ))}
      </div>  
    );
  }
