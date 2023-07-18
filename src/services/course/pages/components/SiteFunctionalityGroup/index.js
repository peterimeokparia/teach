export const permission = ( group, operatorBusinessName, pageObject ) => {
    return group?.find(grp => grp?.operatorBusinessName.includes( operatorBusinessName ))?.pageObject
                    .find( pageObj => pageObj?.name === pageObject )?.allowed.includes( operatorBusinessName );
};

export const SiteFunctionalityGroup = ({
group,     
children }) => {
    return (      
        group  &&  children      
    );
};

export const organization = {
    Teach: 'teach',
    Boomingllc: 'boomingllc'
};

