import { connect } from 'react-redux';
import { navContent } from 'services/course/pages/components/NavigationHelper';
import { getOperatorFromOperatorBusinessName } from 'services/course/selectors';
import MainMenu from 'services/course/pages/components/MainMenu';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';

const Header = ({ 
    operator, 
    currentUser,
    children,
    operatorBusinessName 
}) => {
 return <header>
    <div className='row'>          
        <div className='col align-self-start'> 
            <MainMenu navContent={navContent( currentUser, operatorBusinessName, currentUser?.role, "Student" ).users} />
        </div>
        {
            children
        }
        <div className='col align-self-end'> 
            <LoginLogout
                operatorBusinessName={operatorBusinessName}
                user={currentUser} 
                operator={operator}
            />
        </div>
    </div>
</header>
}

export const mapState = ( state, ownProps ) => {
    return {
      operator: getOperatorFromOperatorBusinessName(state, ownProps),
      currentUser: state.users.user
    };
  };

export default connect( mapState, null )(Header);