import { 
useEffect } from 'react';

import {
useState
} from 'react';

import { 
connect } from 'react-redux';

import { 
    saveCourse, 
    deleteCourse, 
    loadCourses, 
    unSubscribeFromCourse } from 'services/course/actions/courses';

import { 
getCoursesByOperatorId,
getOperatorFromOperatorBusinessName } from 'services/course/selectors';
    
import CourseListComponent from 'services/course/pages/Courses/components/CourseListComponent';
import ListItem from 'services/course/pages/components/ListItem';
import ResizePanel from "react-resize-panel";
import style from './style.css';
import classNames from 'classnames/bind';

const Test003 = ({
    operatorBusinessName,
    operator,
    user,
    courses,
    lessons,
    loadCourses,
    coursesLoading,
    onCoursesError }) => {

    const [ toggle, setToggle ] = useState( false );
    const [ divContent, setDivContent ] = useState( false );

    useEffect(() => {
        
        //loadCourses();
        if ( courses.length > 0 ){

            //alert(JSON.stringify())
        }

        if ( lessons.length > 0 ){

            //alert(JSON.stringify())
        }
    }, [])

    useEffect(() => {}, [divContent])

    const handleToggle = () => {
        changeText();
        setToggle( !toggle );
    };

    const changeText = () => {

       let testHandle = setTimeout(() => {
            setDivContent( !divContent );
            clearTimeout( testHandle );
          }, 2200)
    }

    const changeListItems = ( divContent ) => {
        return <ul>
                 {( divContent ) 
                        ?   courses.map(item => { return ( <li onClick={handleToggle}>{item?.name}</li>   ) })
                        :   lessons.map(item => { return ( <li onClick={handleToggle}>{item?.title}</li>  ) })
                    }
                </ul>
            // <div>
            //     <ListItem
            //         collection={lessons}
            //         onMatchListItem={onMatchListItem}
            //         path={"lessons"}
            //     ></ListItem>
            // </div>




    //     return <div onClick={handleToggle}>
    //     {  ( divContent )
    //         ? ['A', 'B', 'C'].map(item => { return (<div onClick={handleToggle}>{item}</div> ) })
    //         : ['A', 'B', 'C'].reverse().map(item => { return (<div onClick={handleToggle}>{item}</div> ) })

    //     }
    // </div>
        // return <div>
        //     { ( divContent ) 
        //         ?  ['A', 'B', 'C'].map(item => { return (<div>{item}</div> ) })
        //         : listItemsTest(['C', 'B', 'A'])

        //     }
        // </div>
    }
 

    const onMatchListItem = ( match, listItem ) => {
        if( match ){
            alert('mathed')
            alert(JSON.stringify(listItem))
        }
    }

    function listItemsTest( listItems ){
        <ul>
            { listItems.map( items => (
                  <div>{ items }</div>
            ))
            }
        </ul>
    }

 

    return <div className={(toggle) ? "square" :"squareswitch"}>
        {
            
            // ( divContent ) ? "TEXTDIV" : "DIVTEXT"
            changeListItems( divContent )
          
        }
    </div>
   
return <div className={'outerContainer'}>

<div class="container containerA">
    <div class="square squareA">A</div>
    <div class="lineSquare"></div>
    <div class="rotationAxis A"></div>
</div>
  <span>Original position</span>
  <span>Rotation axis</span>

</div>
};

const mapState = (state, ownProps) => ({
    // courses: getCoursesByOperatorId(state, ownProps),
    courses: Object.values( state.courses.courses ), 
    lessons: Object.values( state.lessons.lessons ), 
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    user: state?.users?.user,
    coursesLoading: state?.courses?.coursesLoading,
    onCoursesError: state?.courses?.onCoursesError
});

export default connect( mapState, {loadCourses} )(Test003);