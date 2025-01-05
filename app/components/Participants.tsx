"use client";

import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";
import { useEffect, useRef } from "react";
import { Phone, Mic, MicOff, Video, VideoOff } from "lucide-react";

export default function Participants() {
  const { participants } = useMeeting();

  return (
    <div className="h-full grid grid-cols-2 gap-6 p-6">
      {[...participants.entries()].map(([participantId, participant]) => (
        <Participant
          key={participantId}
          participantId={participantId}
          displayName={participant.displayName}
          isLocal={participant.local}
          isSipUser={(participant.metaData as { sipUser?: boolean })?.sipUser}
        />
      ))}
    </div>
  );
}

interface ParticipantProps {
  participantId: string;
  displayName: string;
  isLocal: boolean;
  isSipUser?: boolean;
}

function Participant({
  participantId,
  displayName,
  isLocal,
  isSipUser,
}: ParticipantProps) {
  const { webcamStream, micStream, webcamOn, micOn } =
    useParticipant(participantId);

  const micRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (webcamOn && webcamStream && videoRef.current) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      videoRef.current.srcObject = mediaStream;
      videoRef.current
        .play()
        .catch((error) =>
          console.error("videoRef.current.play() failed", error)
        );
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("micRef.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg">
      <audio ref={micRef} autoPlay muted={isLocal} />

      {isSipUser ? (
        <div className="w-full h-[300px] flex flex-col items-center justify-center bg-gray-900/50">
          <Phone className="w-12 h-12 text-green-400 mb-3" />
          <p className="text-gray-100 font-medium text-lg">{displayName}</p>
          <p className="text-gray-400 text-sm mt-2">Phone Participant</p>
        </div>
      ) : webcamOn ? (
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-[300px] object-cover"
          playsInline
        />
      ) : (
        <div className="w-full h-[300px] flex flex-col items-center justify-center bg-gray-900/50">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-3">
            <span className="text-2xl text-gray-300">
              {displayName?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-400">Camera Off</p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <p className="text-white font-medium">
            {displayName} {isLocal && "(You)"}
          </p>
          <div className="flex gap-2">
            {micOn ? (
              <Mic className="w-4 h-4 text-green-400" />
            ) : (
              <MicOff className="w-4 h-4 text-red-400" />
            )}
            {webcamOn ? (
              <Video className="w-4 h-4 text-green-400" />
            ) : (
              <VideoOff className="w-4 h-4 text-red-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
