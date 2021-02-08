
const vapidKeys = {
    publicVapidKey: 'BJvqz0UAiX-m62ElxLfR-g8kjkuUmos3-YJx9JwEoMxnJzkVYzQzOJcAdr3zkLa3D8Lbv7D3-y8RuqZuLFKAG9M',
    privateVapidKey: 'k5c3sss-1XauZuaDFvHaixOo2xWechDRQBP7LbQsX8U'
};



export function serviceWorkerSupported(){

    return 'serviceWorker' in navigator;
}



// Register SW, Register Push, Send Notification
export async function send( ) {
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('../worker.js', { scope: '/' } );
  console.log('Service worker registered...');



  // Register Push
  console.log('Registering Push...');
  const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true, 
      applicationServerKey: urlBase64ToUint8Array( vapidKeys.publicVapidKey )
  });
  console.log('Push Registered!!!');
  console.log(`Subscription details: ${ JSON.stringify(subscription) }`);

   // Send Push Notification
   console.log('Sending Push...');

   await fetch('http://localhost:3000/api/v1/notifications/subscribe', {
       headers: {'content-type' : 'application/json'},
       method: 'POST',
       body: JSON.stringify( subscription )
   });

   console.log('Push Sent...');

   return subscription;
};






function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
