console.log('Service worker loaded');

self.addEventListener('push', e => {
    let data = e.data.json();
    console.log('Push received...');
    self.registration.showNotification(data.title, {
        body: 'Notified by John Yaghobieh',
        icon: 'https://commondatastorage.googleapis.com/easy/images/StaticLogo/10013848_1.jpg'
    });
});