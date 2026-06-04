import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import styles from "./combatant-row.module.scss";
import { CombatantLogo } from "@src/entities/combatant/ui/combatant-logo/combatant-logo.tsx";
import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  className: string;
  combatant: Combatant;
  isActive: boolean;
  deleteButtonSlot?: ReactNode;
  hpChangerSlot?: ReactNode;
  conditionsGridSlot?: ReactNode;
};

const CombatantRow = ({
  combatant,
  isActive = false,
  deleteButtonSlot,
  hpChangerSlot,
  conditionsGridSlot,
  className,
}: Props) => {
  return (
    <div className={clsx(styles.wrapper, className, { [styles.isActive]: isActive })}>
      <div className={styles.left}>
        <CombatantLogo combatant={combatant}></CombatantLogo>
        <span className={styles.name}>{combatant.name}</span>
      </div>

      <div className={styles.right}>
        <div className={styles.initiative}>
          <span className={styles.label}>Initiative</span>
          <span>{combatant.initiative}</span>
        </div>
        {hpChangerSlot}
        {conditionsGridSlot}
      </div>
      {deleteButtonSlot}
    </div>
  );
};

export default CombatantRow;
