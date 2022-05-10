import { 
connect } from 'react-redux';

import { 
deleteSession } from 'services/course/actions/sessions';

import useSessionHook from 'services/course/pages/SessionPage/hooks/useSessionHook';
import './style.css';

const EditSessionComponent = ({
    session,
    error,
    className,
    onSubmit,
    deleteSession, 
    children }) => {
    let sessionProps = { session, onSubmit };

    let {
        inputRef,
        editing,
        numberOfSessions,
        totalNumberOfSessions,
        beginEditing, 
        performDelete,
        cancelEdit,
        commitEdit,
        setNumberOfSessions,
        setTotalNumberOfSessions
    } = useSessionHook( sessionProps );

return editing ? (
            <>
            <form
                className= {`${className || ''} editing ${error ? 'error' : ''}`}
                onSubmit={commitEdit}           
            >
                <label>
                    <b> Number of Sessions </b>
                <input 
                    name="lessondate"
                    ref={ inputRef }
                    value={ numberOfSessions }
                    type="number"
                    onChange={ e => setNumberOfSessions( e.target.value) }
                />
                </label>  
                <label>
                    <b>  Total Number of Sessions </b>
                <input 
                    ref={ inputRef }
                    value={ totalNumberOfSessions }
                    type="number"
                    onChange={ e => setTotalNumberOfSessions( e.target.value) }
                
                />
                </label>
                <input
                    ref={ inputRef }
                    name="submit"
                    type="submit"
                    value={'Submit'}
                    onChange={ commitEdit }
                >
                </input> 
            </form>
            <form
                className= {`${className || ''} editing ${error ? 'error' : ''}`} 
            >
                <input
                    ref={ inputRef }
                    name="reset"
                    type="submit"
                    value={'Reset'}
                    onChange={ cancelEdit }
                >
                </input> 
            </form>
                {error && <div>{error.message}</div>}
            </>
            ) : ( 
                children(beginEditing, performDelete)
        );                         
};

export default connect(null, { deleteSession} )(EditSessionComponent);