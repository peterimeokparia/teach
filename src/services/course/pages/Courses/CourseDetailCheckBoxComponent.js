import React from 'react';

import { 
navigateToStudentDetailPage } from  '../ClassRoom/classRoomPageHelpers';

import NavLinks from '../Components/NavLinks';

import './CoursesComponent.css';


class CourseDetailCheckBoxComponent extends React.Component {

    constructor(props){

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    } 

    checkedCollection = [];

    submitForm(e){
        e.preventDefault();
    } 

    componentDidUpdate(){ 
        
        console.log("TEST")
    };

    handleChange(event){

        let isChecked = event.target.checked;
        let hasValue = event.target.value;


        if ( isChecked && hasValue ){ 

            this.checkedCollection.push(this.props.collection?.find(item => item?._id === event?.target?.value));

            this.props.setCollection( this.checkedCollection );

            this.props.toggleClassRoomCourseGradeForm();

        }

        if ( !isChecked && hasValue ) {

            this.checkedCollection = this.checkedCollection?.filter(item => item?._id !== event?.target?.value); 
          
            this.props.setCollection( this.checkedCollection ); 

            this.props.toggleClassRoomCourseGradeForm();
        }
            
    }
    

  render() {  
    return (
       
        <div className="ComponentCourseList">
              <ul className={"component-list-body"}>
                       <form
                           onSubmit={this.submitForm}
                       >
                       {this.props.collection?.length === 0 && <span className="component-text-items">No subscribers</span>}   
                       {this.props.collection?.map( item => ( 

                        <li key={item?._id}>
                            <div className={ "component-list-items"}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={item?._id}
                                    onChange={this.handleChange}
                                    disabled={ (this.props.sessions?.find(session => session.userId ===  item?._id)?.typeOfSession === "Package") &&  
                                               (this.props.sessions?.find(session => session.userId ===  item?._id)?.numberOfSessions === this.props.sessions?.find(session => session.userId ===  item?._id)?.totalNumberOfSessions) }
                                /> 

                                <a onClick={() => navigateToStudentDetailPage(`/${this.props.operatorBusinessName}/student/${item?._id}/course/${this.props.courseId}/lessons/${this.props.lessonId}`, this.props.userNavigationHistory)}> <span className="checkBoxViewGradesLink"> {item[this.props.description]} </span> </a> 
                                
                                  <span class="tooltiptext">
                                        Type: {this.props.sessions?.find(session => session.userId ===  item?._id)?.typeOfSession}<br/> 
                                        Sessions: {this.props.sessions?.find(session => session.userId ===  item?._id)?.numberOfSessions} <br/> 
                                        Total:  {this.props.sessions?.find(session => session.userId ===  item?._id)?.totalNumberOfSessions} <br/> 
                                        LastGrade:  {this.props.grades?.find(grade => grade?.courseId === this.props.courseId && grade?.studentId === item?._id)?.score} <br/> 
                                        %Change:  {this.props.grades?.find(grade => grade?.courseId === this.props.courseId && grade?.studentId === item?._id)?.percentChange + "%"} <br/> 
                                        Symbol: {this.props.grades?.find(grade => grade?.courseId === this.props.courseId && grade?.studentId === item?._id)?.symbol} <br/> 
                                  </span>
  
                                </label>
                                </div>   
                            </li>
                            ))}

                            <br/> 
                                            
                       </form>
                  </ul>
        </div>
    )  
  }   
}


export default CourseDetailCheckBoxComponent;