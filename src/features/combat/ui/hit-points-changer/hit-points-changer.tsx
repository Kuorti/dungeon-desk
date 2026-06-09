import { useCombatStore } from "@src/features/combat/store/combat-store.ts";
import styles from "./hit-points-changer.module.scss";
import Button from "@src/shared/ui/button";
import { Combatant } from "@src/entities/combatant/model/combatant.ts";

type Props = {
  combatant: Combatant;
};

const HitPointsChanger = ({ combatant }: Props) => {
  const updateHealthScore = useCombatStore((s) => s.updateCombatantHealthScore);
  const addCombatantTemporaryHealthScore = useCombatStore((s) => s.addCombatantTemporaryHealthScore);
  const handleHealthScoreChange = (delta: number) => {
    updateHealthScore(combatant.id, delta);
  };
  const handleAddCombatantTemporaryHealthScore = () => {
    addCombatantTemporaryHealthScore(combatant.id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <span className={styles.label}>Hit points</span>
        <Button size={"xs"} onClick={() => handleAddCombatantTemporaryHealthScore()}>
          Add temporary
        </Button>
      </div>
      <div className={styles.row}>
        <Button size={"s"} onClick={() => handleHealthScoreChange(-1)}>
          -
        </Button>
        <span>
          {combatant.healthScore}
          {combatant.temporaryHealthScore !== 0 && ` (+${combatant.temporaryHealthScore})`} /
          {` ${combatant.maxHealthScore}`}
        </span>
        <Button size={"s"} onClick={() => handleHealthScoreChange(+1)}>
          +
        </Button>
      </div>
    </div>
  );
};

export default HitPointsChanger;
