import Button from "@src/shared/ui/button";
import styles from "./combat-panel.module.scss";
import CombatantRow from "@src/entities/combatant/ui/combatant-row/combatant-row.tsx";
import { useCombatStore } from "@src/features/combat/store/combatStore.ts";
import { useState } from "react";
import { selectSortedCombatants } from "@src/features/combat/model/selectors.ts";
import { useShallow } from "zustand/react/shallow";
import AddCombatantModal from "@src/features/add-combatant";
import CombatantConditionsGrid from "@src/features/combat/ui/combatant-conditions-grid";
import DeleteCombatantButton from "@src/features/combat/ui/delete-combatant";
import HitPointsChanger from "@src/features/combat/ui/hit-points-changer";

const CombatPanel = () => {
  const currentRound = useCombatStore((s) => s.currentRound);
  const currentCombatantId = useCombatStore((s) => s.currentCombatantId);
  const selectNextCombatant = useCombatStore((s) => s.selectNextCombatant);
  const handleOpenCombatantsModal = () => {
    setIsCombatantsModalOpen(true);
  };
  const handleSelectNextCombatant = () => {
    selectNextCombatant();
  };
  const [isCombatantsModalOpen, setIsCombatantsModalOpen] = useState(false);
  const sortedCombatants = useCombatStore(useShallow(selectSortedCombatants));

  return (
    <>
      <div className={styles.wrapper}>
        <span>Round: {currentRound}</span>
        <div className={styles.combatantsList}>
          {sortedCombatants.map((combatant) => (
            <CombatantRow
              className={styles.row}
              key={combatant.id}
              isActive={currentCombatantId === combatant.id}
              combatant={combatant}
              deleteButtonSlot={
                <DeleteCombatantButton
                  combatantId={combatant.id}
                  className={styles.deleteCombatantButton}
                />
              }
              hpChangerSlot={<HitPointsChanger combatant={combatant} />}
              conditionsGridSlot={
                <CombatantConditionsGrid
                  className={styles.conditions}
                  combatantId={combatant.id}
                  activeConditionIds={combatant.conditions.map((condition) => condition.id)}
                />
              }
            />
          ))}
        </div>
        <div className={styles.bottomButtons}>
          <Button onClick={handleOpenCombatantsModal} size={"m"}>
            Add combatant
          </Button>
          <Button onClick={handleSelectNextCombatant} size={"m"}>
            Next turn
          </Button>
        </div>
      </div>
      <AddCombatantModal
        isOpen={isCombatantsModalOpen}
        onClose={() => setIsCombatantsModalOpen(false)}
      ></AddCombatantModal>
    </>
  );
};

export default CombatPanel;
