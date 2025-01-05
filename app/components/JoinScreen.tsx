"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Phone, Video, Copy } from "lucide-react";
import CreateMeetingButton from "./meeting/CreateMeetingButton";
import SipInfo from "./meeting/SipInfo";

interface JoinScreenProps {
  onJoin: (meetingId: string) => void;
}

export default function JoinScreen({ onJoin }: JoinScreenProps) {
  const [meetingId, setMeetingId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!meetingId) return;
    navigator.clipboard.writeText(meetingId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl shadow-xl">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-6">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Video className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">
              Join VideoSDK Meeting
            </h1>
            <p className="text-gray-400">
              Connect via video or dial in by phone
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter meeting ID"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="bg-gray-800/60 border-gray-700 text-white h-12 pl-4 pr-12"
                />
                {meetingId && (
                  <button
                    onClick={handleCopy}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CreateMeetingButton onMeetingCreated={setMeetingId} />
                <Button
                  onClick={() => onJoin(meetingId)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-12"
                  disabled={!meetingId}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Join Meeting
                </Button>
              </div>
            </div>

            {meetingId && <SipInfo meetingId={meetingId} />}

            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 p-6 rounded-lg space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <p className="text-gray-300">Join via phone</p>
              </div>
              <p className="text-xl font-mono text-green-400 text-center">
                +12317511639
              </p>
              {meetingId && (
                <p className="text-xs text-gray-400 text-center">
                  Meeting ID: {meetingId}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
