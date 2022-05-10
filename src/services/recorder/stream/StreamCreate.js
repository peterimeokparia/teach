import { Fragment, useEffect, useState, useRef } from 'services/recorder/stream/node_modules/react';
import { connect } from 'services/recorder/stream/node_modules/react-redux';
import { addNewStream } from '../actions';
import './StreamCreate.css';
import StreamHeader from './StreamHeader';




const StreamCreate = ({
        saveInProgress,
        onSaveError,
        dispatch }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const inputRef = useRef();



    useEffect (() =>{
        inputRef.current.focus();
    }, []); 



    const handleSubmit = e => {
        e.preventDefault(); 
        dispatch(addNewStream(title, description));
    }


    if ( saveInProgress ) {

        return <div>...loading</div>
    } 

    if ( onSaveError ) {

        return <div> { onSaveError.message } </div> ;
    }      
    
 

    return (

        <div className="NewCourse">
            <StreamHeader/>
           <form 
                onSubmit={handleSubmit}
            > 
      
                <label> 
                    Enter Title
                    <input
                      disabled={saveInProgress} 
                      onChange={ (e) => setTitle(e.target.value)}
                      value={title}
                      ref={inputRef} 
                    />
                </label>
                <label> 
                    Enter Description   
                    <input
                       disabled={saveInProgress} 
                       onChange={ (e) => setDescription(e.target.value)}
                       value={description}  
                    />
                 </label>
                

                    { onSaveError && (
                        <div className="saveError-message">
                            Error: { onSaveError.message }
                        </div>
                    )}

           <button type="submit" disabled={saveInProgress} >Start Stream</button>
            </form>
           </div>
        );
}








// class StreamCreate extends React.Component {

//     // renderError(meta){
//     //     if (meta.touched && meta.error){
//     //     return <div className="err_msg"> { meta.error }</div>
//     //     }
//     // }

//     renderInputBox({input, label, meta}) {
//         return (
//         <Fragment>
//             <label>{label}</label>
//             <input {...input} />
//             <div>{meta.error}</div>
//         </Fragment>
//         )
//     }

//     onSubmitForm(formValues) {
//         console.log(formValues);
//     }

//     render() {
//         return (
//          <div>
//           <StreamHeader/>
//           <form className="ui__form" onSubmit={ this.props.handleSubmit(this.onSubmitForm) }>
//             <Field name="title" label="Enter Title" component={this.renderInputBox} />
//             <Field name="description" label="Enter Description" component={this.renderInputBox} />
//             <button>Submit</button>
//            </form>

//          </div>    
        
//         )
//     }
    
// }


// const validate = (formValues) => {
//     const errors = {};

//     if(!formValues.title) {
//         errors.title = "You must enter a title";
//     }
//     if(!formValues.description) {
//         errors.description = "You must enter a description";
//     }

//     return errors;
     
// }


const mapState = state => ({
    saveInProgress: state.streams.saveInProgress,
    onSaveError: state.streams.onSaveError
});

export default connect(mapState)(StreamCreate);