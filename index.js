require("dotenv").config()
const https = require("https")

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID
const targetPhoneNumber = process.env.TARGET_PHONE_NUMBER

const httpsOptions = {
  host: "notify.twilio.com",
  auth: `${accountSid}:${authToken}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*'
  }
}

const createUserBinding = (identifier, bindingType, targetAddress) => {

  Object.assign(httpsOptions, {
    path: `/v1/Services/${notifyServiceSid}/Bindings`,
    method: 'POST'
  })

  const requestData = {
    Identity: identifier,
    BindingType: bindingType,
    Address: targetAddress
  }

  let request = https.request(httpsOptions, (res) => {
    console.log(res.statusCode, res.statusMessage);
    res.resume();
  });

  request.write(new URLSearchParams(requestData).toString());

  request.end();

  request.on('error', (err) => {
    console.error(`Encoutered an error: ${err.message}`);
  });
}

const sendNotification = (targetIdentifier, message) => {
  Object.assign(httpsOptions, {
    path: `/v1/Services/${notifyServiceSid}/Notifications`,
    method: 'POST'
  });

  // Do some other stuff
}

createUserBinding("blacka-01", "sms", targetPhoneNumber);