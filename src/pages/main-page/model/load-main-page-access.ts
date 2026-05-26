import { redirect } from "react-router";
import { routes } from "@src/shared/routes/routes.ts";
import { useSessionStore } from "@src/shared/store/sessionStore.ts";

export async function loadMainPageAccess() {
  const sessionId = useSessionStore.getState().sessionId;

  if (sessionId === null) {
    throw redirect(`/${routes.welcome}`);
  }

  return null;
}
