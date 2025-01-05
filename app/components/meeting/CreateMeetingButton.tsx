"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { createMeeting } from "@/lib/videosdk";

interface CreateMeetingButtonProps {
  onMeetingCreated: (meetingId: string) => void;
  disabled?: boolean;
}

export default function CreateMeetingButton({
  onMeetingCreated,
  disabled,
}: CreateMeetingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMeeting = async () => {
    try {
      setIsLoading(true);
      const meetingId = await createMeeting();
      onMeetingCreated(meetingId);
    } catch (error) {
      console.error("Failed to create meeting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleCreateMeeting}
      disabled={disabled || isLoading}
      className="w-full"
    >
      <Video className="mr-2 h-4 w-4" />
      {isLoading ? "Creating..." : "Create Meeting"}
    </Button>
  );
}
