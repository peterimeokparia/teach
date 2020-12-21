import axios from 'axios';


export const sendMetaData = ( url, metaData ) => {
    updateContent( url, metaData );
 }
 
 
 export function getContent( url ){
   return axios.get( url );
 }
 
 
 export function updateContent( url, data = {}  ){
 
    console.log(' url url url', url )
 
    console.log(' data data data', data )
 
   return axios.put(url, data)
    .then(resp => {console.log(resp)})
     .catch(err => { console.log(err) })
 
 }