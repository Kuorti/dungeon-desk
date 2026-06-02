import styles from "./main-page.module.scss";
import CombatPanel from "@src/widgets/combat-panel/ui";

const MainPage = () => {
  return (
    <main className={styles.wrapper}>
      <CombatPanel></CombatPanel>
    </main>
  );
};

export default MainPage;
