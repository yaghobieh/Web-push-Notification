const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

###for generate this two keys: ./node_modules/.bin/web-push generate-vapid-keys 

let publicVapidKey = '****';
let privateVapidKey = '****';

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
