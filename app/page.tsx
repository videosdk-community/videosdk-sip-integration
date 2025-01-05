"use client";

import { useState, useEffect } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import JoinScreen from "./components/JoinScreen";
import MeetingView from "./components/MeetingView";
import { useMeetingStore } from "@/hooks/useMeetingStore";
import { AUTH_TOKEN } from "@/lib/videosdk";

export default function Home() {
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const setStoredMeetingId = useMeetingStore((state) => state.setMeetingId);
  const reset = useMeetingStore((state) => state.reset);

  const handleJoin = (id: string) => {
    setMeetingId(id);
    setStoredMeetingId(id);
  };

  const handleEnd = () => {
    setMeetingId(null);
  };

  // Reset store on component mount (page refresh)
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <main>
      {!meetingId ? (
        <JoinScreen onJoin={handleJoin} />
      ) : (
        <MeetingProvider
          token={AUTH_TOKEN as string}
          config={{
            name: "user",
            meetingId: meetingId,
            autoConsume: true,
            webcamEnabled: true,
            micEnabled: true,
            debugMode: true,
          }}
        >
          <MeetingView meetingId={meetingId} onMeetingEnd={handleEnd} />
        </MeetingProvider>
      )}
    </main>
  );
}
