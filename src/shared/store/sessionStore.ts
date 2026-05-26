import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { Session } from "@src/shared/types/session.ts";
import { SessionActions } from "@src/shared/types/session-actions.ts";

type SessionState = Session & SessionActions;

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: null,
      setSessionId: (id) => set({ sessionId: id }),
    }),
    {
      name: "session-storage",
    },
  ),
);
