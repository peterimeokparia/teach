import React from 'react';
import { Validations } from  '../../../helpers/validations';
import './CoursesComponent.css';


class MultiSelectCheckBoxSelectAllComponent extends React.PureComponent {

    constructor(props){

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    } 

    checkedCollection = [];


    submitForm(e){
        e.preventDefault();
    } 


    handleChange2(event){

        if ( event.target.name === "all" && event.target.checked) {

            this.checkedCollection = this.props.collection;

            this.props.setCollection( this.checkedCollection );
        }

    }


    handleChange(event){

        let isChecked = event.target.checked;
        let hasValue = event.target.value;
        let inputName = event.target.name;
       
        this.props.setCheckAll(false);
     

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

                       <label>
                            All
                            <input
                                name="all"
                                type="checkbox"
                                // value={item?._id}
                                onChange={this.props.setCheckAll}
                                checked={this.props.checkAll}
                            /> 
 
                      </label>

                       {this.props.collection?.map( item => ( 
                         
                        <li key={item?._id}>
                            <div className={ "component-list-items"}>
                            <label>

                             {
                              (this.props.checkAll) ? <input
                                                    name="individual"
                                                    type="checkbox"
                                                    value={item?._id}
                                                    onChange={this.handleChange}
                                                    checked
                                                    
                                                /> 

                                                : <input
                                                        name="individual"
                                                        type="checkbox"
                                                        value={item?._id}
                                                        onChange={this.handleChange}
                                                    /> 
                             } 
                                    <span> {item?._id} </span>
                                  <span> {item[this.props.description]} </span>
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


export default MultiSelectCheckBoxSelectAllComponent;