import React from 'react';

import { 
connect } from 'react-redux';

import { 
toast } from 'react-toastify';

import { 
sendEmails } from './../actions';

import Swal from 'sweetalert2'

import './CoursesComponent.css';



class EmailSenderComponent extends React.PureComponent {

    constructor(props){

        super(props);
   
        this.state = { 
              inputValue: "",
              messageSent: false 
            }

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    } 

  

    submitForm(e){
      this.props.onEmailFormSubmitEvent( true );
      e.preventDefault();
      e.target.reset();
      

      // if ( ! this.state.inputValue ) {

      //   toast.error('Enter your friends email address.')

      //   return;  
      // }

      
      if ( this.state.inputValue && ! this.props.lesson?.title ) {

        toast.error('Click on the lesson title before sending the invite.')

        return;  
      }
       
      let lessonTitle = this.props?.lesson?.title?.replace(/\s+/g, "%20");
      let invitationUrl = `http://localhost:3000/LessonPlan/invite/userverification/${this.props.courseId}/${this.props.lesson._id}/${lessonTitle}`;
   

      this.messageOptions = {
          from: "teachpadsconnect247@gmail.com",
          // to: `${this.state.inputValue}`,
          to: `${this.props.emailAddressList}`,
          subject: "Hey! Join my lesson!",
          messageBody: invitationUrl,
          userId: this.props.userId
      }


      this.props.sendEmails(
        this.messageOptions?.from,
        this.messageOptions?.to,
        this.messageOptions?.subject,
        this.messageOptions?.messageBody,
        this.messageOptions?.userId
      );

      if ( this.state.inputValue && window.location.href ) {

          Swal.fire(
            { title: 'Message sent',  
              confirmButtonColor: '#673ab7'   
            }).then( this.setState({ inputValue: "" }));
      }
    } 


    handleChange(event){

      this.setState({ inputValue: event.target.value });      
    }


   
  render() {  

     return (
       
        <div className="ComponentCourseList">
                    <form
                           onSubmit={this.submitForm.bind(this)}
                       >
                        <div className={"component-list-items"}>

                            {
                              this.props.children  

                              // this.handleChange, this.state.messageSent ? "" : this.state.inputValue, "Invite a friend!"
                          
                            }

                            {/* <label>
                                <input
                                    type="email"
                                    value={this.state.messageSent ? "" : this.state.inputValue}
                                    onChange={this.handleChange}
                                    placeholder="Invite a friend!"
                                /> 
                            </label> */}

                        </div>   
                         
                           {/* <span>
                           <button 
                               className="add-substract-btns" 
                               onClick={this.props.addNewEmailInputField} 
                            >
                               +
                            </button>

                            <button 
                               className="add-substract-btns" 
                               onClick={this.props.removeEmailInputField} 
                            >
                               -
                            </button>

                            <input className="invite-btn" type="submit" value="invite" />
                          </span>   */}
                

                   </form>
        </div>
    )  
  }   
}


export default connect( null, { sendEmails })(EmailSenderComponent);
