import { 
Component } from 'react';

import { 
connect } from 'react-redux';

import {
selectCourseFromLessonPlanCourseDropDown } from 'services/course/actions/courses';

import{
selectLessonFromLessonPlanDropDown } from 'services/course/actions/lessons';

import{
toggleClassRoomSideBarDropDownDisplay } from 'services/course/actions/classrooms';

import { 
userNavigationHistory } from 'services/course/actions/users';

import { 
navigateToStudentDetailPage } from  'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';

import './style.css';

class CourseDetailCheckBoxComponent extends Component {

    constructor(props){
        super(props);
        this.currentGrades = this.currentGrades.bind(this);
        this.currentSession = this.currentSession.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    checkedCollection = [];

    submitForm(e){
        e.preventDefault();
    } 

    componentDidMount(){       
    };

    componentDidUpdate(){   
    };

    currentGrades(){
        return this.props.grades?.filter(grd => grd?.courseId === this.props.selectedCourseFromLessonPlanCourseDropDown?._id); 
    };

    currentSession(){
        return this.props.allSessions?.filter( usersession => usersession?.courseId === this.props.selectedCourseFromLessonPlanCourseDropDown?._id );  
    };

    handleChange(event){
        let isChecked = event.target.checked;
        let hasValue = event.target.value;

        if ( isChecked && hasValue ){ 
            this.checkedCollection.push(this.props.collection?.find(item => item?._id === event?.target?.value));
            this.props.setCollection( this.checkedCollection );
            this.props.toggleClassRoomSideBarDropDownDisplay();
        }
        if ( !isChecked && hasValue ) {
            this.checkedCollection = this.checkedCollection?.filter(item => item?._id !== event?.target?.value); 
            this.props.setCollection( this.checkedCollection ); 
            this.props.toggleClassRoomSideBarDropDownDisplay();
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
                        <div className={"component-list-items"}>
                        <label>
                            <input
                                type="checkbox"
                                value={item?._id}
                                onChange={this.handleChange}
                                disabled={(this.currentSession()?.find(session => session.userId ===  item?._id)?.typeOfSession === "Package") &&  
                                            (this.currentSession()?.find(session => session.userId ===  item?._id)?.numberOfSessions === this.currentSession()?.find(session => session.userId ===  item?._id)?.totalNumberOfSessions) }
                            /> 
                            <a href onClick={() => navigateToStudentDetailPage(`/${this.props.operatorBusinessName}/student/${item?._id}/course/${this.props.selectedCourseFromLessonPlanCourseDropDown?._id}/lessons/${this.props.selectedLessonFromLessonPlanDropDown?._id}`, this.props.userNavigationHistory)}> 
                            <span className="checkBoxViewGradesLink"> 
                                {item[this.props.description]} 
                            </span> 
                            </a>               
                            <span className="tooltiptext">
                                Type: {this.currentSession()?.find(session => session.userId ===  item?._id)?.typeOfSession}<br/> 
                                Sessions: {this.currentSession()?.find(session => session.userId ===  item?._id)?.numberOfSessions} <br/> 
                                Total:  {this.currentSession()?.find(session => session.userId ===  item?._id)?.totalNumberOfSessions} <br/> 
                                LastGrade:  {this.currentGrades()?.find(grade => grade?.courseId === this.props.selectedCourseFromLessonPlanCourseDropDown?._id && grade?.studentId === item?._id)?.score} <br/> 
                                %Change:  {this.currentGrades()?.find(grade => grade?.courseId === this.props.selectedCourseFromLessonPlanCourseDropDown?._id && grade?.studentId === item?._id)?.percentChange + "%"} <br/> 
                                Symbol: {this.currentGrades()?.find(grade => grade?.courseId === this.props.selectedCourseFromLessonPlanCourseDropDown?._id && grade?.studentId === item?._id)?.symbol} <br/> 
                            </span>

                        </label>
                        </div>   
                    </li>
                    ))}
                    <br/>              
                </form>
                </ul>
        </div>
    ); }; 
    
}

const mapDispatch = {
    userNavigationHistory, 
    toggleClassRoomSideBarDropDownDisplay,
    selectCourseFromLessonPlanCourseDropDown,
    selectLessonFromLessonPlanDropDown
};

const mapState = (state, ownProps) => {
    return {
        allSessions: Object.values(state?.sessions?.sessions),
        selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown
    };
};

export default connect( mapState, mapDispatch )( CourseDetailCheckBoxComponent );