import {
useEffect } from 'react';

import { 
navigate } from '@reach/router';

import {
euphoricEffect } from 'services/course/pages/components/Euphoric';

import DropDown from '../DropDown';

const SiteEntryComponent = () => {   
    useEffect(() => {
        introStyleEffects();
    });

    let organizations = [
        {_id:'teach', id:'teach',   name:'teach'},
        {_id:'boomingllc',id:'boomingllc',   name:'boomingllc'}
    ];

    let characterSet = "RAVING FAN STUDENTS!";
    let splitCharacterSet = characterSet?.split(' ');

function applyEffect( splitCharacterSet ) {
    let collection =[];

    splitCharacterSet.map((element, index)  => {
        if ( element ){
            element = [ ...element, ' '];
            for(let i=0; i<element?.length; i++){
                if (splitCharacterSet[index]?.length === i){
                    collection = [ ...collection, euphoricEffect(element[i+1], `euphoric_space`, '.euphoric span' ) ];
                }
                else {
                    collection = [ ...collection, euphoricEffect(element[i], `euphoric_${i}`, '.euphoric span' ) ];
                }

                if( splitCharacterSet?.length-1 === index && i === splitCharacterSet[index]?.length ){
                    collection?.splice(19, 1, euphoricEffect(element[i-1], `euphoric_last`, '.euphoric span' ) );
                }
            }
        } 
    });
    return collection;
}
    
const introStyleEffects = () => {
    return (
        <span className="euphoric">
            {
                applyEffect( splitCharacterSet )
            }
        </span> 
    );
};

const handleSelected = ( selectedOrganization ) => {
    navigate(`/${selectedOrganization}/login`);
};

return (
    <>
    { introStyleEffects() }
    <div className='euphoric'> 
        <div className="orgSelector">
        <label>Organization</label>
        <span className="euphoric_dropdown">
            <DropDown 
                label={""}
                key={"_id"}
                value={"name"}
                optionCollection={organizations}
                setOptionSelectedValue={organization => handleSelected( organization )} 
            />
        </span>
        </div>
    </div>
</>
); };
    
export default SiteEntryComponent;