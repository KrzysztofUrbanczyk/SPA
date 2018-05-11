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
        return Promise.resolve()
            .then(() => {
                sendEmail(req.body.to, req.body.displayName, req.body.price);
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

function sendEmail(email, displayName, price) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };

    mailOptions.subject = `Naprawa została zrealizowana`;
    mailOptions.text = `Witaj, naprawa Twojego samochodu została zrealizowana. Całkowity koszt usługi wynosi: ${price}`;
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
    });
}

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const email = user.email;
    const displayName = user.displayName;

    return sendWelcomeEmail(email, displayName);
});

function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
    };

    mailOptions.subject = `Witaj w ${APP_NAME}!`;
    mailOptions.text = `Cześć ${displayName || ''}! Witaj w ${APP_NAME}. Mam nadzieje że spodoba Ci się nasz serwis.`;
    return mailTransport.sendMail(mailOptions).then(() => {
        return console.log('New welcome email sent to:', email);
    });
}

