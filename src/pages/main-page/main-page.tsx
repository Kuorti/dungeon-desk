import styles from "./main-page.module.scss";
import CombatPanel from "@src/widgets/combat-panel/ui/combat-panel";

const MainPage = () => {
  return (
    <main className={styles.wrapper}>
      <CombatPanel></CombatPanel>
    </main>
  );
};

export default MainPage;
