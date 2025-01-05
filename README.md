# SIP Integration with VideoSDK

VideoSDK provides a powerful platform for integrating modern communication protocols like **SIP (Session Initiation Protocol)** to bridge traditional telephony systems with VideoSDK-powered video conferencing. This Next.js application demonstrates how to manage **inbound** and **outbound SIP calls**, enabling seamless interactions between VOIP, PSTN, and VideoSDK meetings.

## Why Use VideoSDK for SIP Integration?

VideoSDK’s SIP capabilities allow developers to:

- **Unify Communications**: Bridge traditional telephony systems (PSTN) with VideoSDK-powered video meetings.
- **Enable Flexible Integration**: Connect to SIP endpoints or devices effortlessly, supporting a variety of use cases.
- **Simplify Development**: Leverage VideoSDK's developer-friendly tools and APIs for rapid integration.

With VideoSDK, building a robust, SIP-enabled communication solution has never been easier.

## Key Features

1. **Inbound Call Handling**:
   - Receive calls from traditional phone systems or SIP endpoints.
   - Dynamically connect these calls to VideoSDK meetings.
2. **Outbound Call Handling**:

   - Dial external phone numbers or SIP endpoints programmatically.
   - Seamlessly link outbound calls to VideoSDK meetings.

3. **Developer-Centric Tools**:
   - Built on Next.js with modern API routes.
   - Easily configurable via environment variables.

### Project Setup

1. Clone the Repository

```bash
git clone https://github.com/videosdk-community/videosdk-sip-integration.git
cd videosdk-sip-integration
```

2. Install Dependencies

```bash
npm install
```

3.  Configure Environment Variables

1.  **VideoSDK** ([app.videosdk.live](https://app.videosdk.live)):

    - Navigate to the **API Keys** section.
    - Enable the **SIP option** for your API key.
    - Obtain your **SIP Username** and **SIP Password**.

1.  **Twilio** ([console.twilio.com](https://console.twilio.com)):
    - **Account SID**
    - **Auth Token**
    - Twilio **Phone Number** (required for outbound calls)

Create a `.env.local` file in the root directory and add the following values:

```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
VIDEOSDK_SIP_USERNAME=your-videosdk-sip-username
VIDEOSDK_SIP_PASSWORD=your-videosdk-sip-password
TWILIO_PHONE_NUMBER=your-twilio-phone-number
NEXT_APP_URL=http://localhost:3000 # Replace with your production URL
```

### Run the Application

Start the development server:

```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000).

## How It Works

### Inbound Calls

1. **Webhook**: When a call is made to your Twilio number, Twilio sends a webhook to `/api/webhook/inbound`.
2. **SIP Connection**: The webhook logic connects the call to a VideoSDK meeting using the SIP address:
   ```
   sip:<meetingId>@sip.videosdk.live
   ```

### Outbound Calls

1. **API Endpoint**: Send a POST request to `/api/webhook/outbound` with the phone number and meeting ID.
2. **Programmatic Dialing**: The app initiates the call and connects it to a VideoSDK meeting.

## Example Code

### Inbound Call Handler (`/api/webhook/inbound`)

```ts
import twilio from "twilio";

export async function POST(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const meetingId = url.searchParams.get("meetingId");

  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say("Welcome to the VideoSDK conference. Connecting you now.");
  twiml.dial().sip(
    {
      username: process.env.VIDEOSDK_SIP_USERNAME,
      password: process.env.VIDEOSDK_SIP_PASSWORD,
    },
    `sip:${meetingId}@sip.videosdk.live`
  );

  return new Response(twiml.toString(), {
    headers: { "Content-Type": "text/xml" },
  });
}
```

### Outbound Call Handler (`/api/webhook/outbound`)

```ts
import twilio from "twilio";

export async function POST(request: Request): Promise<Response> {
  const { phoneNumber, meetingId } = await request.json();

  const call = await twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  ).calls.create({
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER,
    url: `${process.env.NEXT_APP_URL}/api/webhook/inbound?meetingId=${meetingId}`,
    method: "POST",
  });

  return new Response(JSON.stringify({ success: true, callSid: call.sid }), {
    headers: { "Content-Type": "application/json" },
  });
}
```
