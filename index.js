const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

let publicVapidKey = 'BPx0jEiWqgxGHXMIqp0LO_rZ8XOGZ9B7l_9DgqzAWp3dr_4AhQhSvLcJPcbCUzulO1UOd1QfRR2xaGpvCsjYUeY';
let privateVapidKey = 'rrwjiNFPX84tRzyv-QgrujX46VcwyrT9T8l_AlyOMzE';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//Subscribe route
app.post('/subscribe', (req, res)=> {
    //Get pushSubscription object
    let subscription = req.body;

    //Send 201 status
    res.status(201).json({});

    //Create payload
    const payload = JSON.stringify({title: 'Push test'});

    //Push notification into sendNotification
    webPush.sendNotification(subscription, payload)
        .catch(err => console.error(err));
});

app.listen(port, () => console.log(`Server is running ${port}`));