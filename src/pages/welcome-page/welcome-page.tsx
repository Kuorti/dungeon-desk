import styles from "./welcome-page.module.scss";
import Button from "@src/shared/ui/button";
import { useNavigate } from "react-router";
import { routes } from "@src/shared/routes/routes.ts";
import { useSessionStore } from "@src/shared/store/sessionStore.ts";

const WelcomePage = () => {
  const navigate = useNavigate();
  const setSessionId = useSessionStore((s) => s.setSessionId);
  const handleStartSession = () => {
    setSessionId(crypto.randomUUID());
    navigate(routes.main);
  };

  return (
    <main className={styles.wrapper}>
      <h2 className={styles.header}>Dungeon Desk</h2>
      <p className={styles.description}>
        Run the fight. Track the chaos. Roll the dice. Stay in control.
      </p>
      <Button onClick={handleStartSession} className={styles.button}>
        Begin
      </Button>
    </main>
  );
};

export default WelcomePage;
