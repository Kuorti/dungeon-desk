import styles from "./delete-combatant.module.scss";
import { useCombatStore } from "@src/features/combat/store/combat-store.ts";
import clsx from "clsx";

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
      className={clsx(styles.button, className)}
      onClick={handleDeleteCombatant}
      aria-label="Delete combatant"
    >
      ✖
    </button>
  );
};

export default DeleteCombatantButton;
