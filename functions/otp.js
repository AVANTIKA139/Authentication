const TWILIO_SERVICE_ID = "VAebd3e277641bdd8b2e34e8f3c473f5f5"; //from the services->verify page
const TWILIO_ACCOUNT_ID = "ACab4565c7953a0ff9acda93e218587526"; // account settings
const TWILIO_AUTH_TOKEN = "1dd7f73e1b056f50ff54aa47efef28cf"; // account settings below

const client = require("twilio")(TWILIO_ACCOUNT_ID, TWILIO_AUTH_TOKEN);

const sendLoginOtp = (userphone) => {
  if (!userphone)
    return {
      succes: false,
      error: "Phone Number Missing",
    };

  client.verify
    .services(TWILIO_SERVICE_ID)
    .verifications.create({
      to: userphone,
      channel: "sms",
    })
    .then((verification) => {
      return {
        success: true,
        status: verification.status,
      };
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 60200)
        return {
          success: false,
          error: "Invalid Parameter",
        };
      else if (err.code === 60203)
        return {
          success: false,
          error: "Max Send attempts reached",
        };
      else if (err.code === 60212)
        return {
          success: false,
          error: "Too many concurrent requests for phone number",
        };
      else
        return {
          success: false,
          error: "Server Issue, Try Again Later!",
        };
    });
};

const verifyOtp = async (phonenum, code) => {
  try {
    const verification_check = await client.verify
      .services(TWILIO_SERVICE_ID)
      .verificationChecks.create({
        to: phonenum,
        code: code,
      });
    console.log(verification_check.status);
    if (verification_check.status === "approved") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { sendLoginOtp };
