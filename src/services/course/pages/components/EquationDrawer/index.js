import TemporaryDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/TemporaryDrawer';
import Equations from 'services/course/pages/Equations';
import './style.css';

const EquationDrawer = ({ toggleDrawer, anchorPosition,  insertIntoFunc,  equationSet, children }) => {
return <TemporaryDrawer  
            anchor={anchorPosition}
            setToggleDrawer={toggleDrawer} 
        >
            <div>
            {
                children && children
            }
            {   
                <Equations insertInto={insertIntoFunc} equations={equationSet} />
            }
            </div>
        </TemporaryDrawer>
};

export default  EquationDrawer;
