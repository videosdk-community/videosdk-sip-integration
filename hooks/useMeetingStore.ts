"use client";

import { create } from "zustand";

type MeetingStore = {
  meetingId: string | null;
  phoneNumber: string | null;
  setMeetingId: (id: string) => void;
  setPhoneNumber: (number: string) => void;
  reset: () => void;
};

export const useMeetingStore = create<MeetingStore>((set) => ({
  meetingId: null,
  phoneNumber: null,
  setMeetingId: (id) => set({ meetingId: id }),
  setPhoneNumber: (number) => set({ phoneNumber: number }),
  reset: () => set({ meetingId: null, phoneNumber: null }),
}));
