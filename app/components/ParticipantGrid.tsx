import { useMeeting } from "@videosdk.live/react-sdk";
import Participant from "./Participant";

interface ParticipantGridProps {
  hasSipParticipant: boolean;
}

export default function ParticipantGrid({
  hasSipParticipant,
}: ParticipantGridProps) {
  const { participants } = useMeeting();

  return (
    <div
      className={`h-full grid ${
        hasSipParticipant ? "grid-cols-2" : "grid-cols-1"
      } gap-6 p-6`}
    >
      {[...participants.entries()].map(([participantId, participant]) => (
        <Participant
          key={participantId}
          participantId={participantId}
          displayName={participant.displayName}
          isLocal={participant.local}
          isSipUser={(participant.metaData as { sipUser?: boolean })?.sipUser}
          isFullScreen={!hasSipParticipant && participant.local}
        />
      ))}
    </div>
  );
}
