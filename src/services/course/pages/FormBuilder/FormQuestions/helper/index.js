export const rePositionRecords = ( collection, sortRecords ) => {

    let tempArray = [];

    let sortedRecords = sortRecords( collection, 'position' );
        sortedRecords?.forEach((element, index) => {
            tempArray.push({...element, position: (index +1) });
        });
    return tempArray;
};