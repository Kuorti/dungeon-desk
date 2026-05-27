import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import styles from "./combatant-row.module.scss";
import { CombatantLogo } from "@src/entities/combatant/ui/combatant-logo/combatant-logo.tsx";
import { HitPointsChanger } from "@src/features/combat/ui/hit-points-changer/hit-points-changer.tsx";
import CombatantConditionsGrid from "@src/features/combat/ui/combatant-conditions-grid";

type Props = {
  combatant: Combatant;
  isActive: boolean;
};

const CombatantRow = ({ combatant, isActive = false }: Props) => {
  return (
    <div className={`${styles.wrapper} ${isActive ? styles.isActive : ""}`}>
      <div className={styles.left}>
        <CombatantLogo combatant={combatant}></CombatantLogo>
        <span className={styles.name}>{combatant.name}</span>
      </div>

      <div className={styles.right}>
        <div className={styles.initiative}>
          <span className={styles.label}>Initiative</span>
          <span>{combatant.initiative}</span>
        </div>
        <HitPointsChanger combatant={combatant} />
        <CombatantConditionsGrid
          className={styles.conditions}
          combatantId={combatant.id}
          activeConditionIds={combatant.conditions.map((condition) => condition.id)}
        />
      </div>
    </div>
  );
};

export default CombatantRow;
