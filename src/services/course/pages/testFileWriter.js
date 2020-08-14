import fs from 'fs';


export const testFileWriter = ({testFile, url}) => {

    fs.writeFile(testFile, url)
          .then( resp => { console.log(resp) })
            .catch(err => { console.log(err)});


}