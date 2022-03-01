import { 
useEffect, 
useRef, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
navigate } from '@reach/router';

import { 
loadFormBuilders,
saveFormBuilder,
deleteFormBuilder } from 'services/course/actions/formbuilders';

import { 
getUsersByOperatorId } from 'services/course/selectors';

import { 
forceReload } from 'services/course/helpers/ServerHelper';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
role,
roleTypeCollection } from 'services/course/helpers/PageHelpers';

import Roles from 'services/course/pages/components/Roles';
import Loading from 'services/course/pages/components/Loading';
import NavLinks from 'services/course/pages/components/NavLinks';
import Swal from 'sweetalert2';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Select from 'react-select';
import './style.css';

const FormsComponent = ({
    operatorBusinessName,
    selectedTutorId,
    user,
    users, 
    forms,
    formBuildersLoading,
    onFormBuildersLoadingError,
    loadFormBuilders,
    saveFormBuilder, 
    deleteFormBuilder,
    unSubscribeFromCourse,
    setSelectedForm }) => {
    const inputRef = useRef();
    const [ editing, setEditing ] = useState(false);
    const [ currentForm, setForm ] = useState('');
    const [ formUserRole, setFormUserRole ] = useState('');
    const [ deleting, setDelete ] = useState(false);

    useEffect(() => {

        loadFormBuilders();

        if ( editing ) {
            inputRef.current.focus();
        }

        if ( deleting ) {
            setDelete(false);
        }

    }, [ editing, deleting  ]);

    const beginEditing = ( selectedForm ) => {
        setForm( selectedForm );
        setEditing(true);
    };

    const submitForm = (e) => {
        e.preventDefault();
        saveFormBuilder({
            ...currentForm, 
            role: formUserRole?.value
        })
        .then(reset)
        .catch( error => {
            setEditing(false);
            setEditing(true);
        });
    };

    const reset = () => {
        setEditing(false);
        forceReload();
    };

    const roleTypeOption = ( roleTypes ) => roleTypes?.map( item => ( { value: item,  label: item } ) );

    const performDelete = ( form ) => {
        
        performValidation('Delete ?', 'warning', "You are about to delete:", form?.formDisplayName )
        .then( (response) => {
            if ( response?.value ) {
                if ( user?.role === role.Tutor ) {
                    deleteFormBuilder(form);
                }
                setDelete(true);
                return;
            } else {
                return;
            }
        })
        .catch( error => { console.log( error ); });
    };

function performValidation( title, icon, htmlTitle, itemName ) {
    return Swal.fire({
        title,
        icon,
        html: `<div>${htmlTitle} ${itemName}</div>`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#673ab7',
        cancelButtonText: 'No'
    });
}

function navigateToSelectedForm(selectValue){
    
   if ( !setSelectedForm && selectValue?.createdBy === user?._id ) {
        navigate(`/${operatorBusinessName}/formEventBuilder/${selectValue?.formType}/${selectValue?.formName}/${selectValue?.formUuId}/${selectValue?.userId}/${elementMeta.state.Manage}/000`)
        return;
   }

    setSelectedForm( selectValue );
}

return  editing 
    ? ( <div>
            <form
                onSubmit={submitForm}
            >
            <label>
             Select who can view forms:  
            <Select
                ref={inputRef}
                placeholder={`Select role type`}
                value={formUserRole}
                onChange={setFormUserRole}
                options={roleTypeOption( Object.values( roleTypeCollection ) )} 
            />    
            </label>
            </form>
        </div>) 
    : ( <div className='MyCourses'> 
        <div className="ComponentCourseListItem">
            <ul>
            {forms?.map(form => (     
                <li 
                    key={form?._id}
                    className={"component-seconday-list-body"}
                    onClick={()=> navigateToSelectedForm(form)}
                >             
                <div className={"user-list-items"}>
                <div className="row">
                    <div className="col-1"> 
                    </div>
                    <div className="col-10">
                       <h3> <span className="multicolortext"> {form?.formDisplayName}</span></h3>
                        {<span>
                        {user?._id ===  form?.createdBy && (
                        <span>
                        <Roles role={user?.role === role.Tutor && form?.createdBy === user?._id }>
                        <EditIcon 
                            id="EditIcon"
                            data-cy={`${(form?.createdBy)?.toLowerCase()}EditIcon`}
                            className="round-button-1"
                            onClick={() => beginEditing(form)}
                        />
                        </Roles>
                        <Roles role={user?.role === role.Tutor && form?.createdBy === user?._id }>
                        <DeleteIcon 
                            id="DeleteIcon"
                            data-cy={`${(form?.createdBy)?.toLowerCase()}DeleteIcon`}
                            className="round-button-3"
                            onClick={() => performDelete(form)}
                        />
                        </Roles>
                        </span>
                        )}       
                        </span>     
                        }
                    </div>
                    </div> 
                    </div>
                </li>
                ))}
            </ul>
    </div>
    </div>
); };

const mapState = ( state, ownProps) => ({
    user: state?.users?.user,
    users: getUsersByOperatorId(state, ownProps),
    onSaveError: null,
    formBuildersLoading: state?.formBuilders?.formBuilders,
    onFormBuildersLoadingError: state?.formBuilders?.onFormBuildersLoadingError
});

export default connect(mapState, { loadFormBuilders, saveFormBuilder, deleteFormBuilder } )(FormsComponent);