import twilio from "twilio";

// Environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const videosdkSipUsername = process.env.VIDEOSDK_SIP_USERNAME || "";
const videosdkSipPassword = process.env.VIDEOSDK_SIP_PASSWORD || "";

const client = twilio(accountSid, authToken);

export async function POST(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const meetingId = url.searchParams.get("meetingId");

    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say("Welcome to the Video sdk conference. Connecting you now.");
    twiml.dial().sip(
      {
        username: videosdkSipUsername,
        password: videosdkSipPassword,
      },
      `sip:${meetingId}@sip.videosdk.live`
    );

    return new Response(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Error processing Twilio webhook:", error);

    // Return TwiML error response
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say("Sorry, there was an error connecting your call.");

    return new Response(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }
}
