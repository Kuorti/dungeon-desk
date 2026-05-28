import styles from "./delete-combatant.module.scss";
import { useCombatStore } from "@src/features/combat/store/combatStore.ts";

type Props = {
  className: string;
  combatantId: string;
};

const DeleteCombatantButton = ({ className, combatantId }: Props) => {
  const deleteCombatant = useCombatStore((s) => s.deleteCombatant);
  const handleDeleteCombatant = () => {
    deleteCombatant(combatantId);
  };

  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={handleDeleteCombatant}
      aria-label="Delete combatant"
    >
      ✖
    </button>
  );
};

export default DeleteCombatantButton;
