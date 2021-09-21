export const permission = ( group, operatorBusinessName, pageObject ) => {
    return group?.find(grp => grp?.operatorBusinessName === operatorBusinessName)?.pageObject
                    .find( pageObj => pageObj?.name === pageObject )?.value;
};

export const SiteFunctionalityGroup = ({
group,     
children }) => {
    return (      
        group  &&  children      
    );
};

