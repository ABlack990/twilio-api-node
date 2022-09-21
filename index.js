require("dotenv").config()
const https = require("https")

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID
const targetPhoneNumber = process.env.TARGET_PHONE_NUMBER

const createUserBinding = (identifier, bindingType, targetAddress) => {
  const requestData = {
    Identity: identifier,
    BindingType: bindingType,
    Address: targetAddress
  }

  const httpsOptions = {
    host: "notify.twilio.com",
    path: `/v1/Services/${notifyServiceSid}/Bindings`,
    method: 'POST',
    auth: `${accountSid}:${authToken}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    }
    
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

createUserBinding("blacka-01", "sms", targetPhoneNumber);