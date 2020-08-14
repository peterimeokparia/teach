import { storage } from './index'

export const GetDataUrlFromFireBase = (type, data) => {

      return storage
        .ref(type)
         .child(data?.name)
          .getDownloadURL()
           .then(url => {
               return url;
           });
}