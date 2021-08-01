import { 
    connect } from 'react-redux';
    
    import { 
    loadUsers } from 'services/course/actions/users';
    
    import useSessionHook from 'services/course/pages/SessionPage/hooks/useSessionHook';
    import './style.css';
    
    const SessionInvitationPage = ({
        user, 
        users }) => {
    
        let { 
            password,
            handleSubmit,
            handleOnChange,
         } = useSessionHook({ user, users });
       
    if ( users.filter( authenticateUser => authenticateUser?._id === user?._id)?.length === 1 ) {
        return ( <div>
                <form onSubmit={handleSubmit}>
                <label>
                    Password
                    <input 
                        required
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter password to join video session"    
                    />
                </label>
                    <input type="submit" />
                </form>
        </div>)
    
        } else {
    
        return ( <div> <link to="/loginPage"> Login </link> and then join the session. </div>)
    }}
    
    const mapState = (state)   => {
        return {
            users: Object.values(state.users.users), 
            error: state.users.error,
            loading: state.users.loading  
        };
    }
    
    export default connect(mapState, {  loadUsers  })(SessionInvitationPage);