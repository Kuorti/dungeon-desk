import Button from "@src/shared/ui/button";
import styles from "./combat-panel.module.scss";
import CombatantRow from "@src/entities/combatant/ui/combatant-row/combatant-row.tsx";
import { useCombatStore } from "@src/shared/store/combatStore.ts";
import Modal from "@src/shared/ui/modal";
import { useState } from "react";

const CombatPanel = () => {
  const currentCombatantId = useCombatStore((s) => s.currentCombatantId);
  const combatants = useCombatStore((s) => s.combatants);
  const openCombatantsModal = () => {
    setIsCombatantsModalOpen(true);
  };
  const [isCombatantsModalOpen, setIsCombatantsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.combatantsList}>
          {Object.values(combatants).map((combatant) => (
            <CombatantRow
              key={combatant.id}
              isActive={currentCombatantId === combatant.id}
              combatant={combatant}
            />
          ))}
        </div>
        <div className={styles.bottomButtons}>
          <Button onClick={openCombatantsModal} size={"m"}>
            Add combatant
          </Button>
          <Button size={"m"}>Next turn</Button>
        </div>
      </div>
      <Modal
        isOpen={isCombatantsModalOpen}
        onClose={() => setIsCombatantsModalOpen(false)}
        title="Статусы персонажа"
        footer={<Button onClick={() => setIsCombatantsModalOpen(false)}>Ok</Button>}
      >
        <p>
          Ваш бард сейчас находится в состоянии <strong>Unconscious</strong>.
        </p>
        <p>Вы не можете совершать действия до успешного прохождения спасбросков.</p>
      </Modal>
    </>
  );
};

export default CombatPanel;
