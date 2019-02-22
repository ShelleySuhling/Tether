
# Student Organization Event Application
“Student event organization as a service” -- platform to facilitate distribution of organization event details to members.

## Project Scripts
### `npm start`

Runs the app in the development mode on port defined in .env file.<br>
Open localhost:PORT to view project in browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test-coverage`

Launches the test runner and show's test coverage report.

## Firebase Functions
Followed this tutorial `https://firebase.googleblog.com/2017/03/how-to-schedule-cron-jobs-with-cloud.html`

### scripts for deploying

To deploy cloud functions only: `firebase deploy --only functions --project community-service-application`

To update cron job: `gcloud app deploy functions/cron.yaml`

### scripts for logging/debugging

Manual pubsub (run-now): `gcloud pubsub topics publish hourly-tick --message="Hello"`

For logging, go to firebase console -> functions -> logs

## References

redux-form validation: https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124

## Logo Credit
Logo was made by my friend [Ashley Bernard](https://www.linkedin.com/in/abb64/)

