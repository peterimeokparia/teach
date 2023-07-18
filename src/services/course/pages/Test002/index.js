import { useEffect } from 'react';
import { connect } from 'react-redux';
import Format from './helper';
import ContextMenu from 'services/course/pages/components/ContextMenu';

const Test002 = ({
    operatorBusinessName,
    operator,
    user,
    courses,
    lessons,
    loadCourses,
    coursesLoading,
    onCoursesError }) => {


    useEffect(() => {
        
    }, [])

    function latexCodeCallBack( updatedLatexCode ){
        alert('latex code updatedLatexCode')
        alert( updatedLatexCode );
    }


return <div>

    {
        <div> 
            <div>{'test'}</div>
            {
                <Format latexCode={'\\ce{CrO4^2-}'} latexCodeCallBack={latexCodeCallBack}/>
            }
            {
            // <div>{testR} </div>
            }
            {/* {
                <div>{testItalized} </div>
            }
            {
                <div>{testBold} </div>
            } */}
        </div>
    }
</div>

};

export default connect()( Test002 );