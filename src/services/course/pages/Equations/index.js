import { connect } from 'react-redux';
import { getCoursesByOperatorId, getOperatorFromOperatorBusinessName } from 'services/course/selectors';
import { setSelectedEquation } from 'services/course/actions/equations';
import ScienceIcon from '@mui/icons-material/Science';
import MyEditorTest3 from 'services/course/editor/MyEditorTest3';
import FormatEquation from 'services/course/pages/Equations/components/FormatEquation';
import './style.css';
    
const Equations = ({
    equation, 
    equations,
    insertInto,
    setSelectedEquation 
}) => {

    function setSelectedEquationCallBack(equation){
        setSelectedEquation(equation);
    }

    function submit( selectedEquation ){
        if ( equation ) {
            insertInto( equation );
            return;
        }
        insertInto(selectedEquation?.equation)
    }

return (
    <div className="equations">
    {
        [ ...new Set(Object.values( equations ).map( objKey => { return objKey['heading']; } )) ].map( heading => (
            <div> 
                <div className="row">
                    <div className="col">
                    <ScienceIcon/> <h5> { heading } </h5>
                    </div>
                </div>
                <div  className="">
                { Object.values( equations ).filter( e => e.heading === heading ).map( equation => ( 
                    <div className="row"> 
                    {
                        <> 
                        {/* <div className="col" onClick={() => setSelectedEquation( equation?.equation )}> */}
                        <div className="col">
                        {/* <FormatEquation latexCode={equation?.equation} latexCodeCallBack={setSelectedEquation}/> */}
                        <FormatEquation latexCode={equation?.equation} latexCodeCallBack={setSelectedEquationCallBack}/>
                           <div onClick={() => submit( equation )}>
                                <MyEditorTest3  
                                    element={ equation } 
                                    content={ equation?.markDownContent } 
                                    readOnly={ true } 
                                    showMenuButtons={ false } 
                                /> 
                           </div>
                            
                        </div>
                        </>
                    }
                    </div>
                    ))
                }
                </div>
            </div>
            )
        )
    }
</div>
); 
};
    
const mapState = (state, ownProps) => ({
    courses: getCoursesByOperatorId(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    user: state?.users?.user,
    equation: state?.equations?.equation,
    equations: state?.equations?.equations
});

export default connect(mapState, { setSelectedEquation })( Equations );