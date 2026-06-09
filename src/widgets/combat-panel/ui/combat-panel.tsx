import Button from "@src/shared/ui/button";
import styles from "./combat-panel.module.scss";
import CombatantRow from "@src/entities/combatant/ui/combatant-row/combatant-row.tsx";
import { useCombatStore } from "@src/features/combat/store/combat-store.ts";
import { useState } from "react";
import { selectSortedCombatants } from "@src/features/combat/model/selectors.ts";
import { useShallow } from "zustand/react/shallow";
import AddCombatantModal from "@src/features/add-combatant";
import CombatantConditionsGrid from "@src/features/combat/ui/combatant-conditions-grid";
import DeleteCombatantButton from "@src/features/combat/ui/delete-combatant";
import HitPointsChanger from "@src/features/combat/ui/hit-points-changer";
import clsx from "clsx";
import { LootResult } from "@src/features/combat/types/loot-result.ts";
import { generateCombatLoot } from "@src/features/combat/model/loot-generator.ts";
import { LootModal } from "@src/features/combat/ui/loot-modal/loot-modal.tsx";

const CombatPanel = () => {
  const combatants = useCombatStore((state) => state.combatants);
  const currentRound = useCombatStore((s) => s.currentRound);
  const currentCombatantId = useCombatStore((s) => s.currentCombatantId);
  const selectNextCombatant = useCombatStore((s) => s.selectNextCombatant);
  const handleOpenCombatantsModal = () => {
    setIsCombatantsModalOpen(true);
  };
  const handleSelectNextCombatant = () => {
    selectNextCombatant();
  };
  const endCombat = useCombatStore((state) => state.endCombat);
  const [isCombatantsModalOpen, setIsCombatantsModalOpen] = useState(false);
  const [isLootModalOpen, setIsLootModalOpen] = useState(false);
  const [generatedLoot, setGeneratedLoot] = useState<LootResult | null>(null);
  const sortedCombatants = useCombatStore(useShallow(selectSortedCombatants));
  const combatantsCount = Object.keys(combatants).length;
  const isCombatImpossibleToRun = combatantsCount < 2;
  const handleEndCombat = () => {
    const loot = generateCombatLoot(combatants);

    setGeneratedLoot(loot);
    setIsLootModalOpen(true);
    endCombat();
  };

  return (
    <>
      <div className={clsx(styles.wrapper, { [styles.blurred]: isCombatantsModalOpen || isLootModalOpen })}>
        <div className={styles.topRow}>
          <span>Round: {currentRound}</span>
          <Button onClick={handleEndCombat} size={"xs"}>
            End Combat
          </Button>
        </div>
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
          <Button onClick={handleSelectNextCombatant} size={"m"} disabled={isCombatImpossibleToRun}>
            Next turn
          </Button>
        </div>
      </div>
      <AddCombatantModal
        isOpen={isCombatantsModalOpen}
        onClose={() => setIsCombatantsModalOpen(false)}
      ></AddCombatantModal>
      <LootModal
        isOpen={isLootModalOpen}
        onClose={() => setIsLootModalOpen(false)}
        loot={generatedLoot}
      />
    </>
  );
};

export default CombatPanel;
