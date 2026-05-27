import { useCombatStore } from "@src/features/combat/store/combatStore.ts";
import styles from "./hit-points-changer.module.scss";
import Button from "@src/shared/ui/button";
import { Combatant } from "@src/entities/combatant/model/combatant.ts";

type Props = {
  combatant: Combatant;
};

export const HitPointsChanger = ({ combatant }: Props) => {
  const updateHealthScore = useCombatStore((s) => s.updateCombatantHealthScore);
  const handleHealthScoreChange = (delta: number) => {
    updateHealthScore(combatant.id, delta);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <span className={styles.label}>Hit points</span>
        <Button size={"xs"} onClick={() => handleHealthScoreChange(+1)}>
          Add temporary
        </Button>
      </div>
      <div className={styles.row}>
        <Button size={"s"} onClick={() => handleHealthScoreChange(-1)}>
          -
        </Button>
        <span>
          {combatant.healthScore}
          {combatant.temporalHealthScore !== 0 && ` (+${combatant.temporalHealthScore})`} /
          {` ${combatant.maxHealthScore}`}
        </span>
        <Button size={"s"} onClick={() => handleHealthScoreChange(+1)}>
          +
        </Button>
      </div>
    </div>
  );
};
