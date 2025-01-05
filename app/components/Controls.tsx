"use client";

import { Button } from "@/components/ui/button";
import { Phone, PhoneOff } from "lucide-react";
import { useOutboundCall } from "@/hooks/useOutboundCall";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from "./PhoneInput";

export default function Controls({
  onMeetingEnd,
}: {
  onMeetingEnd: () => void;
}) {
  const { makeCall, isCallInProgress, canMakeCall } = useOutboundCall();
  const { toast } = useToast();

  const handleOutboundCall = async () => {
    try {
      await makeCall();
      toast({
        title: "Call initiated",
        description: "Outbound call has been started successfully",
      });
    } catch (error) {
      toast({
        title: "Call failed",
        description: "Failed to initiate outbound call",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg">
        <PhoneInput />
      </div>
      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={handleOutboundCall}
          disabled={isCallInProgress || !canMakeCall}
          className="bg-green-500 hover:bg-green-600"
        >
          <Phone className="h-4 w-4 mr-2" />
          {isCallInProgress ? "Calling..." : "Make Call"}
        </Button>

        <Button onClick={onMeetingEnd} variant="destructive">
          <PhoneOff className="h-4 w-4 mr-2" />
          End Meeting
        </Button>
      </div>
    </div>
  );
}
