import {
useEffect } from 'react';

import { 
Redirect,
navigate} from '@reach/router';

import {
euphoricEffect } from 'services/course/pages/components/Euphoric';

import NavLinks from 'services/course/pages/components/NavLinks';
import DropDown from '../DropDown';

const SiteEntryComponent = ({
    operatorBusinessName } ) => {   

    // if ( operatorBusinessName === 'main' ) {
    //     return <Redirect to={`/teach`} noThrow />;
    // }

    // let organizations = [
    //     {_id:'teach', id:'teach',   name:'teach'},
    //     {_id:'boomingllc',id:'boomingllc',   name:'boomingllc'},
    //     {_id:'main', id:'main',   name:'main'},
    // ];

    // let business = organizations?.find( org => org?.name === operatorBusinessName );

    // if ( !business ) {
    //     return <div>{`${operatorBusinessName} was not found.`}</div>;
    // }

    let organizations = [
        {_id:'teach', id:'teach',   name:'teach'},
        {_id:'boomingllc',id:'boomingllc',   name:'boomingllc'}
    ];

    useEffect(() => {
        introStyleEffects();
    });

    let characterSet = (operatorBusinessName === "boomingllc") ? "BOOMING LLC!" : "RAVING FAN STUDENTS!";
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
                    collection?.splice((characterSet?.length-1), 1, euphoricEffect(element[i-1], `euphoric_last`, '.euphoric span' ) );
                }
            }
        } 
        return collection;
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
        {/* <NavLinks to={`/${operatorBusinessName}/login`}> 
             <label className="navLink">{business?.name}</label>
        </NavLinks>  */}
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