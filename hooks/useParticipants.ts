import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";

export function useParticipants() {
  const { participants } = useMeeting();
  const [hasSipParticipant, setHasSipParticipant] = useState(false);
  const [hostId, setHostId] = useState<string | null>(null);
  const [sipUserId, setSipUserId] = useState<string | null>(null);

  useEffect(() => {
    const participantArray = Array.from(participants.values());
    const hostParticipant = participantArray.find((p: any) => p.local);
    const sipParticipant = participantArray.find(
      (p: any) => p.metaData?.sipUser
    );

    setHostId(hostParticipant?.id || null);
    setSipUserId(sipParticipant?.id || null);
    setHasSipParticipant(!!sipParticipant);
  }, [participants]);

  return {
    hasSipParticipant,
    hostId,
    sipUserId,
    participants,
  };
}
