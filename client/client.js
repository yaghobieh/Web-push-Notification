let publicVapidKey = 'BPx0jEiWqgxGHXMIqp0LO_rZ8XOGZ9B7l_9DgqzAWp3dr_4AhQhSvLcJPcbCUzulO1UOd1QfRR2xaGpvCsjYUeY';

//Check for service worker
if('serviceWorker' in navigator) {
    send()
        .catch(err => console.error(err));
}

//Register the SW && Push API && Send The push
async function send() {
    console.log('Registering service worker...');
    let register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service worker registered...');

    //Register Push
    console.log('Registering Push...');
    let subscriptions = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered...');

    //Send push notifications
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscriptions),
        headers: {
            'content-type': 'application/json' 
        }
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}