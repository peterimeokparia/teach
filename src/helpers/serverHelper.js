
let authToken = null;

export const setToken = token => {
  authToken = token;
}

export function postData(url = ``, data = {}) {
    return fetchWithData( url, data, 'POST')
}


export function putData(url = ``, data = {}) {
    return fetchWithData( url, data, 'PUT');
}


export function deleteData(url = ``, data = {}) {
    return fetchWithData( url, data, 'DELETE');
}



function fetchWithData( url =``, data = {}, method = 'POST') {
    return fetch(url, {
        method,
        headers: {
                   'Content-Type': 'application/json',
                    Authorization: authToken ? `Bearer ${authToken}` : undefined
                 },
        body: JSON.stringify(data)
        // cache: "reload",
     } 
    ).then(response => response.json() )

}

