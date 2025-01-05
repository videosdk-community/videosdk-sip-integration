import twilio from "twilio";

// Environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || "";

const client = twilio(accountSid, authToken);

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  try {
    const { phoneNumber, meetingId } = await request.json();

    if (!phoneNumber) {
      throw new Error("phone number is required!");
    }

    // Make the outbound call
    const call = await client.calls.create({
      to: phoneNumber,
      from: twilioPhoneNumber,
      url: `${process.env.NEXT_APP_URL}/api/webhook/inbound?meetingId=${meetingId}`,
      method: "POST",
    });

    return new Response(JSON.stringify({ success: true, callSid: call.sid }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error making outbound call:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to initiate call",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
