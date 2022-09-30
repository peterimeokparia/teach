import { useState } from 'react';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';

const useCustomSelectHook = ( optionsList, setInputValue, previewMode, formFieldElement, studentAnswer, formBuilderState ) => {

    const [ isOptionsOpen, setIsOptionOpen ] = useState( false );
    const [ selectedOption, setSelectedOption ] = useState(0);

    const toggleOptions = () => {
        setIsOptionOpen( !isOptionsOpen );
    };

    const setSelectedThenCloseDropdown = ( index, option ) => {
        setSelectedOption( index );
        setIsOptionOpen( false );
        setInputValue( option );
    };

    const handleKeyDown = ( index, option  ) => ( e ) => {
        switch (e.key) {
            case " ":
            case "SpaceBar": 
            case "Enter":
                e.preventDefault();
                setSelectedThenCloseDropdown( index, option ); 
                break;
            default:
                break;
        }
    };

    const handleListKeyDown = ( e ) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setIsOptionOpen( false ); 
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedOption(
                    selectedOption - 1 >= 0 ? selectedOption - 1 : optionsList.length - 1
                ); 
                break;
            case "ArrowDown":
                e.preventDefault();
                setSelectedOption(
                    selectedOption === optionsList.length - 1 ? 0 : selectedOption + 1 
                ); 
                break;
            default:
                break;
        }
    };

    const handleSelected = ( selectedIndex ) => {
        return ( formBuilderState === elementMeta.state.Manage )
                ? handleSelectedInManageState( selectedIndex )
                : handleSelectedInTakingState( selectedIndex )
    }

    function handleSelectedInManageState( selectedIndex ){
        let selectedId = formFieldElement?.answerKey;
        let selectedContent = formFieldElement.dropDownOptions.find(item => item?.id === selectedId )?.markDownContent;
        return previewMode ? optionsList[selectedIndex]?.markDownContent : selectedContent;
    }

    function handleSelectedInTakingState( selectedIndex ){
        let selectedId = studentAnswer?.answer;
        let selectedContent = formFieldElement.dropDownOptions.find(item => item?.id === selectedId )?.markDownContent;
        return (!selectedId) ? optionsList[selectedIndex]?.markDownContent : selectedContent;
    }

    return {
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
    }
}

export default useCustomSelectHook;