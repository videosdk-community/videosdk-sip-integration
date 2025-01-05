const API_BASE_URL = "https://api.videosdk.live/v2";
export const AUTH_TOKEN: string | undefined =
  process.env.NEXT_PUBLIC_VIDEOSDK_TOKEN;

export async function createMeeting() {
  const response = await fetch(`${API_BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_TOKEN as string,
    },
    body: JSON.stringify({
      geoFence: "us002",
    }),
  });

  const data = await response.json();
  return data.roomId;
}
