'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

const APP_NAME = 'MonsterGarage';


exports.httpEmail = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        const email = req.body.to;
        const displayName = 'User';

        return Promise.resolve()
            .then(() => {
                sendEmail(email, displayName);
            })
            .then(() => {
                res.end();
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
            });
    })
});

function sendEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };

    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
    });
}