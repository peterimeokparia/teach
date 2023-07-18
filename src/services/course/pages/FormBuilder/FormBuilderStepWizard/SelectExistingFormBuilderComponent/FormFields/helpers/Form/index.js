import { elementMeta, inputType } from 'services/course/pages/QuestionsPage/helpers';
import { role } from 'services/course/helpers/PageHelpers';

class Form {
    
    constructor( props ){
        if ( !props?.formState ) return;
        if ( !props?.formStatus ) return;
        if ( !props?.element ) return;
        this.value = props?.value; this.formState = props?.formState; this.formStatus = props?.formStatus; this.element = props?.element;
        this.addNewFormFieldAnswer = props?.addNewFormFieldAnswer; this.saveFormFieldAnswer = props?.saveFormFieldAnswer; this.saveFormField = props?.saveFormField;
        this.existingAnswer = props?.existingAnswer; this.selected = props?.selected; this.question = props?.question; this.currentUser = props?.currentUser;
        this.formUuId = props?.formUuId; this.eventId = props?.eventId; this.getFormFieldAnswers = props?.getFormFieldAnswers; this.prevPoints = props?.prevPoints;
        this.answer = props?.answer; this.answerKey = props.answerKey; this.markDownContent = props?.markDownContent; this.handleEditor = props?.handleEditor; 
        this.editorState = props?.editorState;  this.formFieldElement = props?.formFieldElement; this.selectedFormFieldElement = props?.selectedFormFieldElement;
        this.saveContentInterVal = props?.saveContentInterVal; this.setElementContentFromEditorState = props?.setElementContentFromEditorState; this.position = props?.position;
        this.saveDraggableFormFieldAnswer = props?.saveDraggableFormFieldAnswer; this.answerKeyPoints = props?.answerKeyPoints;
    }

    handleDraggableFormFieldInManageState() { 
        try {
            if ( this.formState !== elementMeta.state.Manage ) return;

            if ( this.currentUser?.role !== role.Tutor ) return;
                this.saveFormField({ ...this.element, position: 0, answerKey: this.position?.toString(), inputValue: "" });  
            } catch (error) {
                console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleDraggableFormFieldInTakingState() {
        try {
            if ( this.formState !== elementMeta.state.Taking ) return;
            if ( this.handleFormFieldExistingAnswerInTakingState() ) return; 
            } catch (error) {
                console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleFormMarkDownEditorFieldInManageState() {
        try {
            if ( this.formState !== elementMeta.state.Manage ) return;
            if ( this.currentUser?.role !== role.Tutor ) return;
                this.saveFormField({ ...this.element, markDownContent: this.markDownContent, answerKey: this.prevPoints?.toString(), inputValue: "" });  
            } catch (error) {
            console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleFormMarkDownEditorAnswerFieldInManageState() {
        try {
            if ( this.formState !== elementMeta.state.Manage ) return;
            if ( this.currentUser?.role !== role.Tutor ) return;
            if ( this.formStatus !== elementMeta.status.Reviewing ) return;
            if ( !this.existingAnswer ) return;
                this.saveFormFieldAnswer( { ...this.existingAnswer, points: this.prevPoints, answer: this.prevPoints?.toString(), answerKey: this.answerKeyPoints?.toString() } );  
            } catch (error) {
                console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleFormMarkDownEditorFieldInTakingState() {
        try {
            if ( this.formState !== elementMeta.state.Taking ) return;
            if ( this.handleFormMarkDownEditorFieldExistingAnswerInTakingState() ) return; 
            
            let answerProps = {
                element: this.element, 
                question: this.question, 
                currentUser: this.currentUser, 
                formUuId: this.formUuId, 
                eventId: this.eventId  
              };
          
              let formFieldAnswer = { ...this.getFormFieldAnswers( answerProps ), markDownContent: this.markDownContent, inputValue: this.value, answer: null, points: 0 }; 
          
              this.addNewFormFieldAnswer( formFieldAnswer );
            } catch (error) {
                console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleFormInputFieldInManageState() {
        try {
            if ( this.formState !== elementMeta.state.Manage ) return;
            if ( this.currentUser?.role !== role.Tutor ) return;
                this.saveFormField({ ...this.element, answerKey: this.value, inputValue: "" });  
            } catch (error) {
                console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleFormInputFieldInTakingState() {
        try {
            if ( this.formState !== elementMeta.state.Taking ) return;
            if ( this.handleFormInputFieldExistingAnswerInTakingState() ) return;
            let answerProps = {
                element: this.element, 
                question: this.question, 
                currentUser: this.currentUser, 
                formUuId: this.formUuId, 
                eventId: this.eventId  
              };
          
              let formFieldAnswer = { ...this.getFormFieldAnswers( answerProps ), inputValue: this.value, answer: this.value, points: this.prevPoints }; 
          
              this.addNewFormFieldAnswer( formFieldAnswer );
            } catch (error) {
                console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleFormSelectInputFieldInManageState() {
        try {
            if ( this.formState !== elementMeta.state.Manage ) return;
            if ( this.currentUser?.role !== role.Tutor ) return;
            if ( this.handleFormSelectedFormSelectInputFieldInManageState() ) return;
                this.handleInputSelectorFields();  
                this.handleToggleInputFieldSelector(); 
            } catch (error) {
                console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleFormSelectInputFieldInTakingState() {
        try {
            if ( this.formState !== elementMeta.state.Taking ) return;
            if ( this.handleFormSelectExistingAnswerInTakingState()  ) return;
                let answerProps = {
                    element: this.element, 
                    question: this.question, 
                    currentUser: this.currentUser, 
                    formUuId: this.formUuId, 
                    eventId: this.eventId  
                };
          
                let formFieldAnswer = { ...this.getFormFieldAnswers( answerProps ), inputValue: this.value, answer: this.answer, selected: this.selected, points: this.prevPoints  }; 
   
                this.addNewFormFieldAnswer( formFieldAnswer );
            } catch (error) {
                console.log(`value: ${this.value} formState: ${this.formState}`);
        }
    }

    handleFormSelectedFormSelectInputFieldInManageState() {
        if ( !this.selected ) return false;
            this.saveFormField({ ...this.element, points: this.prevPoints, answerKey: this.value, inputValue: this.value, selected: this.selected  });

        return true;
    }

    handleFormSelectExistingAnswerInTakingState() {
        if ( !this.existingAnswer ) return false; 
            this.saveFormFieldAnswer( { ...this.existingAnswer, formUuId: this.formUuId, answerKey: this.answerKey, points: this.prevPoints, answer: this.answer, inputValue: this.value, selected: this.selected  } );
        
        return true;
    }

    handleFormInputFieldExistingAnswerInTakingState() {
        if ( !this.existingAnswer ) return false;
            this.saveFormFieldAnswer( { ...this.existingAnswer, formUuId: this.formUuId, points: this.prevPoints, inputValue: this.value, answer: this.value } );  

        return true;
    }
    
    handleFormFieldExistingAnswerInTakingState() {
        if ( !this.existingAnswer ) return false;
        
        this.saveDraggableFormFieldAnswer( { ...this.element, formUuId: this.formUuId, position: this.position, points: this.prevPoints,  answer: this.position?.toString() } );
        return true;
    }

    handleFormMarkDownEditorFieldExistingAnswerInTakingState() {
        if ( !this.existingAnswer ) return false;
        this.handleEditor( { ...this.existingAnswer, formUuId: this.formUuId, points: this.prevPoints, markDownContent: this.markDownContent }, this.markDownContent );

        return true;
    }

    handleExistingAnswerInManageState() {
        if ( !this.existingAnswer ) return false;
            this.saveFormFieldAnswer( { ...this.existingAnswer, points: this.prevPoints, answer: this.value, inputValue: this.value, selected: this.selected  } );  

        return true;
    }

    handleInputSelectorFields(){
        if ( this.element?.inputType === inputType.Toggle ) return;
            this.saveFormField({ ...this.element, formUuId: this.formUuId, answerKey: null, inputValue: this.value, selected: false  });  
    }

    handleToggleInputFieldSelector(){
        if ( this.element?.inputType !== inputType.Toggle ) return;
            this.saveFormField({ ...this.element, formUuId: this.formUuId, answerKey: this.value, inputValue: this.value, selected: false  });  
    }
    
}

export default Form;