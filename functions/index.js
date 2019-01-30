const functions = require('firebase-functions');
const _ = require('lodash')
const admin = require('firebase-admin');
const moment = require('moment')
const twilio_config = require('./twilio_config.js')

admin.initializeApp();
const client = require('twilio')(twilio_config.accountSid, twilio_config.authToken);


exports.hourly_job = functions.pubsub
    .topic('hourly-tick')
    .onPublish((message) => {
        console.log('hourly job run at: ' + moment().toString())

        admin.firestore().collection("events").get()
            .then(querySnapshot => {
                _.forEach(querySnapshot.docs, (doc) => {
                    let start = moment(doc.data().startTime)
                    let now = moment()
                    if (Math.abs(moment.duration(now.diff(start)).asHours()) < 6) {
                        sendBatchReminderToMemebers(doc.data())
                    }
                })
            })

        return true
    });

sendBatchReminderToMemebers = (event) => {
    admin.firestore().collection("users").get().then(
        querySnapshot => {
            let success = _.forEach(querySnapshot.docs, function (object) {
                return sendJob(_.values(_.pick(object.data(), ["phoneNumber"])),
                    "Reminder: " + event.title + " starts today, " + moment(event.startTime).format('MM/DD/YYYY') + " at " + moment(event.startTime).format('hh:mm A'))
            });

            return Promise.all(success)
                .then((promise_successes) => {
                    console.log('sendBatch success')
                    return true
                })
                .catch(err => {
                    console.log('sendBatch failure', err)
                    return false
                });

        }
    )
}

sendJob = (to_person, event_body) => {
    return client.messages
        .create({
            from: twilio_config.phoneNumber,
            to: to_person,
            body: event_body
        })
        .then(() => {
            console.log('sendJob success', to_person, event_body)
            return true
        })
        .catch(err => {
            console.log('sendJob failure', err)
            return false
        })
}