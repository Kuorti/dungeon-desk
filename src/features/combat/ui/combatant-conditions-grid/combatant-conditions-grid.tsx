import { useCombatStore } from "@src/features/combat/store/combatStore.ts";
import { conditions } from "@src/shared/constants/conditions.ts";
import styles from "./combatant-conditions-grid.module.scss";

type Props = {
  combatantId: string;
  activeConditionIds: string[];
  className?: string;
};

const CombatantConditionsGrid = ({ combatantId, activeConditionIds, className }: Props) => {
  const toggleCondition = useCombatStore((s) => s.toggleCombatantCondition);

  return (
    <div className={`${styles.grid} ${className || ""}`}>
      {conditions.map((item) => {
        const isActive = activeConditionIds.includes(item.id);

        return (
          <button
            key={item.id}
            className={`${styles.button} ${isActive ? styles.active : ""}`}
            onClick={() => toggleCondition?.(combatantId, item.id)}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
};

export default CombatantConditionsGrid;
