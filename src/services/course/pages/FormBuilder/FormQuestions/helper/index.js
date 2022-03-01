export const rePositionRecords = ( collection, sortRecords ) => {

    let tempArray = [];

    let sortedRecords = sortRecords( collection, 'position' );

    alert('sortedRecords')

    alert( JSON.stringify( sortedRecords ) )

        sortedRecords?.forEach((element, index) => {

            alert( JSON.stringify( element?.markDownContent ))
                   
            tempArray.push({...element, position: (index +1) });

        });

        alert('temp')

        alert( JSON.stringify( tempArray) )

    return tempArray;
};