import {
elementMeta,
inputType } from 'services/course/pages/QuestionsPage/helpers';

import { 
role } from 'services/course/helpers/PageHelpers';

class Form {
    constructor( props ){

        if ( !props?.formStatus ) return;

        if ( !props?.element ) return;

        this.value = props?.value;
        this.formStatus = props?.formStatus;
        this.element = props?.element;
        this.addNewFormFieldAnswer = props?.addNewFormFieldAnswer;
        this.saveFormFieldAnswer = props?.saveFormFieldAnswer;
        this.saveFormField = props?.saveFormField;
        this.existingAnswer = props?.existingAnswer;
        this.selected = props?.selected;
        this.question = props?.question;
        this.currentUser = props?.currentUser;
        this.formUuId = props?.formUuId;
        this.eventId = props?.eventId;
        this.getFormFieldAnswers = props?.getFormFieldAnswers;
        this.prevPoints = props?.prevPoints;
        this.answer = props?.answer;
        this.answerKey = props.answerKey;

    }

    handleFormInputFieldInManageState() {

        try {

            if ( this.formStatus !== elementMeta.state.Manage ) return;

            if ( this.currentUser?.role !== role.Tutor ) return;
  
                this.saveFormField({ ...this.element, answerKey: this.value, inputValue: "" });  

            } catch (error) {

                console.log(`value: ${this.value} formStatus: ${this.formStatus}`);
        }
    }

    handleFormInputFieldInTakingState() {

        try {

            if ( this.formStatus !== elementMeta.state.Taking ) return;

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

                console.log(`value: ${this.value} formStatus: ${this.formStatus}`);
        }
    }

    handleFormSelectInputFieldInManageState() {
        
        try {


            if ( this.formStatus !== elementMeta.state.Manage ) return;

            if ( this.currentUser?.role !== role.Tutor ) return;

            if ( this.handleFormSelectedFormSelectInputFieldInManageState() ) return;

                this.handleInputSelectorFields();  

                this.handleToggleInputFieldSelector(); 

            } catch (error) {

                console.log(`value: ${this.value} formStatus: ${this.formStatus}`);

        }
    }

    handleFormSelectInputFieldInTakingState() {
        try {

            if ( this.formStatus !== elementMeta.state.Taking ) return;

            if ( this.handleFormSelectExistingAnswerInTakingState()  ) return;

                let answerProps = {
                    element: this.element, 
                    question: this.question, 
                    currentUser: this.currentUser, 
                    formUuId: this.formUuId, 
                    eventId: this.eventId  
                };
          
                // let formFieldAnswer = { ...this.getFormFieldAnswers( answerProps ), inputValue: this.value, answer: this.value, selected: this.selected, points: this.prevPoints  }; 

                let formFieldAnswer = { ...this.getFormFieldAnswers( answerProps ), inputValue: this.value, answer: this.answer, selected: this.selected, points: this.prevPoints  }; 
          
                this.addNewFormFieldAnswer( formFieldAnswer );

            } catch (error) {

                console.log(`value: ${this.value} formStatus: ${this.formStatus}`);
        }
    }

    handleFormSelectedFormSelectInputFieldInManageState() {

        if ( !this.selected ) return false;

            this.saveFormField({ ...this.element, points: this.prevPoints, answerKey: this.value, inputValue: this.value, selected: this.selected  });

        return true;
    }

    handleFormSelectExistingAnswerInTakingState() {

        if ( !this.existingAnswer ) return false;
        
        this.saveFormFieldAnswer( { ...this.existingAnswer, answerKey: this.answerKey, points: this.prevPoints, answer: this.answer, inputValue: this.value, selected: this.selected  } );
            // this.saveFormFieldAnswer( { ...this.existingAnswer, answerKey: this.answerKey, points: this.prevPoints, answer: this.value, inputValue: this.value, selected: this.selected  } );

        return true;
    }

    handleFormInputFieldExistingAnswerInTakingState() {

        if ( !this.existingAnswer ) return false;

        this.saveFormFieldAnswer( { ...this.existingAnswer, points: this.prevPoints, inputValue: this.value, answer: this.value } );  

        return true;

    }

    handleExistingAnswerInManageState() {

        if ( !this.existingAnswer ) return false;

            this.saveFormFieldAnswer( { ...this.existingAnswer, points: this.prevPoints, answer: this.value, inputValue: this.value, selected: this.selected  } );  

        return true;

    }

    handleInputSelectorFields(){

        if ( this.element?.inputType === inputType.Toggle ) return;

            this.saveFormField({ ...this.element, answerKey: null, inputValue: this.value, selected: false  });  

    }

    handleToggleInputFieldSelector(){

        if ( this.element?.inputType !== inputType.Toggle ) return;

            this.saveFormField({ ...this.element, answerKey: this.value, inputValue: this.value, selected: false  });  

    }

}

export default Form;