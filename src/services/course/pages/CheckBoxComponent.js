import React from 'react';
import { Validations } from  '../../../helpers/validations';
import './CoursesComponent.css';




//delete
//https://stackoverflow.com/questions/53215285/how-can-i-force-component-to-re-render-with-hooks-in-react
//https://www.npmjs.com/package/mongoose-reload
//https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react#:~:text=If%20set%20to%20true%2C%20the,cached%20version%20of%20the%20page.&text=import%20React%20from%20'react'%3B,refreshPage%7D%3EClick%20to%20reload!
//https://www.itsolutionstuff.com/post/react-multi-select-dropdown-example-example.html


class CheckBoxComponent extends React.PureComponent {

    constructor(props){

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    } 

    checkedCollection = [];

    submitForm(e){
        e.preventDefault();

        // this.props.setCollection( this.props.collection.filter(item => this.state.listItems?.includes(item?.id) ) );
    } 


    handleChange(event){

        let isChecked = event.target.checked;
        let hasValue = event.target.value;

        if ( isChecked && Validations.itemNotSelected( this.props.lessonTitle,  "Click on the lesson title before selecting a user to invite." ) ) {
      
            hasValue = "";

            event.target.checked = false;

            return;
          }

        if ( isChecked && hasValue ){ 

            this.checkedCollection.push(this.props.collection?.find(item => item?._id === event?.target?.value));

            this.props.setCollection( this.checkedCollection );
        }

        if ( !isChecked && hasValue ) {

            this.checkedCollection = this.checkedCollection?.filter(item => item?._id !== event?.target?.value); 
          
            this.props.setCollection( this.checkedCollection );
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
                                /> 
                                <span> {item[this.props.description]} </span>
                                </label>

                                </div>   
                            </li>
                            ))}

                            <br/> 
                                            
                            {/* <input className="delete-lesson-btn" type="submit" value="invite" /> */}
                       </form>
                  </ul>
        </div>
    )  
  }   
}


export default CheckBoxComponent;