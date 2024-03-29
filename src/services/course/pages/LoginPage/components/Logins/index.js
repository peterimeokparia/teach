import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadPagedLoginSessions } from 'services/course/actions/logins';
import Pagination from 'services/course/pages/components/Pagination';
import './style.css';

const Logins = ({ 
    studentId, 
    logins,
    currentUser,
    loadPagedLoginSessions }) => {      
    let updateOnLoginChange = ( logins?.results?.length === 0 || logins?.results?.length === undefined );
    
    useEffect(() => {
        if ( studentId ) {
            loadPagedLoginSessions( studentId, logins?.page ? logins.page : 1, 10 );
        }
    }, [ updateOnLoginChange, loadPagedLoginSessions, studentId, logins?.page ] );
    
return (   
<div  className="logins" >
<div className="content" >
<div className="loginSessions">
<div className='header'> <span>{ 'Date' }</span> <span>{ 'Login' }</span> <span>{ 'Logout' }</span></div>
    <div>    
        { logins?.results?.map(( login ) => (
                <div> 
                    <span className="">
                        {
                            `${ new Date( login?.logInTime )?.toLocaleDateString('en-US') }`
                        }
                    </span>
                    <span className="loginTime">
                        {
                            `${ new Date( login?.logInTime )?.toLocaleTimeString('en-US') }`
                        }
                    </span>
                    <span className="logoutTime">
                        {
                            `${ new Date( login?.logOutTime )?.toLocaleTimeString('en-US') }`
                        }
                    </span>
                    <div><br></br></div>
                </div>
            ))
        }
        </div>
        { <Pagination page={logins} setButtonFilterCount={5} pagingLimit={10} loadPagedSessionData={loadPagedLoginSessions} filterBy={ currentUser?._id } />  }
     </div> 
    </div>
</div>
    );
};

const mapState = (state, ownProps)   => {
    return {
    currentUser: state.users.user,
    logins: state?.logins?.logins,
    lesson: state.lessons.lessons[ownProps.lessonId]
    };
};

export default connect(mapState, { loadPagedLoginSessions } )(Logins);