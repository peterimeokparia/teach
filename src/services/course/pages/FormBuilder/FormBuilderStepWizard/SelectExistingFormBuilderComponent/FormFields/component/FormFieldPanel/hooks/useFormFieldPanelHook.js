import * as React from 'react';

const useFormFieldPanelHook = (props ) => {
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ menuVisible, setMenuVisibility ] = React.useState(false);
    const [ mathMenuVisible, setMathMenuVisibility ] = React.useState(false);
    const [ labelSelectorMenuVisible, setLabelSelectorMenuVisible ] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    let {
        formFieldElement,
        handleTogglingModal,
        setMathModalOpen,
        saveFormField,
        loadFormFields,
    } = props;
    

    const handleClose = () => {
      setAnchorEl(null);
    };

    const closeModal = () => {
      setMenuVisibility( !menuVisible );
      handleTogglingModal();
    };

    const openModal = () => {
        setMenuVisibility( true );
        handleClose();
    };

    const openMathModal = () => {
      setMathMenuVisibility( true );
      setMathModalOpen( true );
      handleClose();
    };

    const closeMathModal = () => {
      setMathMenuVisibility( !mathMenuVisible );
      setMathModalOpen( false );
      handleTogglingModal();
    };
   
    const openLabelSelectorModal = () => {
      setLabelSelectorMenuVisible( true );
      setMathModalOpen( true );
      handleClose();
    };

    const closeLabelSelectorModal = () => {
      setLabelSelectorMenuVisible( !labelSelectorMenuVisible );
      handleTogglingModal();
      saveFormField( formFieldElement );
      loadFormFields();
    };

    return {
        open,
        handleClick,
        anchorEl,
        menuVisible,
        mathMenuVisible,
        labelSelectorMenuVisible,
        handleClose,
        closeModal,
        openModal,
        openMathModal,
        closeMathModal,
        openLabelSelectorModal,
        closeLabelSelectorModal
    };
};

export default useFormFieldPanelHook;