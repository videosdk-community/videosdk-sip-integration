"use client";

import { useState } from "react";
import { useMeetingStore } from "./useMeetingStore";

export function useOutboundCall() {
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { meetingId, phoneNumber } = useMeetingStore();

  const makeCall = async () => {
    if (!meetingId || !phoneNumber) {
      throw new Error("Meeting ID and phone number are required");
    }

    try {
      setIsCallInProgress(true);
      setError(null);

      const response = await fetch("/api/webhook/outbound", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meetingId, phoneNumber }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to make call");
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to make call");
      throw err;
    } finally {
      setIsCallInProgress(false);
    }
  };

  return {
    makeCall,
    isCallInProgress,
    error,
    canMakeCall: Boolean(meetingId && phoneNumber),
  };
}
