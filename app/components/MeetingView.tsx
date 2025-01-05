"use client";
import { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import ParticipantGrid from "./ParticipantGrid";
import { Copy, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParticipants } from "@/hooks/useParticipants";

export default function MeetingView({
  meetingId,
  onMeetingEnd,
}: {
  meetingId: string;
  onMeetingEnd: () => void;
}) {
  const [joined, setJoined] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const tw_phone_number = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;

  const { join } = useMeeting({
    onMeetingJoined: () => setJoined("JOINED"),
  });

  const { hasSipParticipant } = useParticipants();

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const handleCopy = () => {
    setTimeout(() => setIsCopied(false), 3000);
    navigator.clipboard.writeText(meetingId);
    setIsCopied(true);
  };

  if (joined === "JOINING") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white text-lg">Joining meeting...</p>
        </div>
      </div>
    );
  }

  if (!joined) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="w-[95%] min-h-[90vh] p-6 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl">
          <div className="max-w-md mx-auto space-y-8 py-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">
                VideoSDK Meeting
              </h1>
              <p className="text-gray-400">Ready to join the conversation?</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 p-6 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Meeting ID</p>
                  <Button
                    onClick={handleCopy}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    size="sm"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-xl font-mono text-white">{meetingId}</p>
              </div>

              <Button
                onClick={joinMeeting}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
              >
                Start Meeting
              </Button>

              <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 p-6 rounded-lg text-center">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <p className="text-gray-300">Join via phone</p>
                </div>
                <p className="text-xl font-mono text-green-400">
                  {tw_phone_number}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-[80%] min-h-[90vh] p-6 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl">
        <div className="h-full space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Active Meeting</h1>
              <p className="text-gray-400 text-sm mt-1">ID: {meetingId}</p>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <Phone className="h-6 w-6 text-green-400 mb-1" />
                <p className="text-gray-400 text-xs">Dial to join</p>
              </div>
              <div>
                <p className="text-lg font-mono text-green-400">
                  {tw_phone_number}
                </p>
                <p className="text-xs text-gray-400">Meeting ID: {meetingId}</p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-full">
            <ParticipantGrid hasSipParticipant={hasSipParticipant} />
            <div className="fixed bottom-0 left-0 right-0 py-6 px-4 bg-gradient-to-t from-gray-900 to-transparent">
              <Controls onMeetingEnd={onMeetingEnd} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
