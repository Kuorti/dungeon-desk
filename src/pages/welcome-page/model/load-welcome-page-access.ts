import { redirect } from "react-router";
import { routes } from "@src/shared/routes/routes.ts";
import { useSessionStore } from "@src/features/session/store/sessionStore.ts";

export async function loadWelcomePageAccess() {
  const sessionId = useSessionStore.getState().sessionId;

  if (sessionId) {
    throw redirect(`/${routes.main}`);
  }

  return null;
}
