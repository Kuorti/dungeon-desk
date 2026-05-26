import { Outlet } from "react-router";
import styles from "./app.module.scss";

function App() {
  return (
    <main className={styles.mainLayout}>
      <Outlet />
    </main>
  );
}

export default App;
