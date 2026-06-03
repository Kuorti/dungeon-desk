import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { CombatState } from "@src/features/combat/types/combat.ts";
import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { getSortedCombatants } from "@src/features/combat/model/selectors.ts";
import {
  applyUnconsciousCondition,
  calculateHealthChange,
  toggleCondition,
} from "@src/features/combat/model/combat-rules.ts";

export const useCombatStore = create<CombatState>()(
  persist(
    (set, get) => ({
      id: null,
      currentRound: 1,
      currentCombatantId: null,
      combatants: {} as Record<string, Combatant>,
      setCombatId: (id) => set({ id }),
      setNextTurn: () => {
        const currentRound = get().currentRound;
        set({
          currentRound: currentRound + 1,
        });
      },
      updateCombatantHealthScore: (combatantId: string, delta: number) => {
        const currentCombatants = get().combatants;
        const targetCombatant = currentCombatants[combatantId];
        const { deleteCombatant } = get();

        if (!targetCombatant) {
          return;
        }

        const { healthScore, temporalHealthScore } = calculateHealthChange(targetCombatant, delta);
        let updatedCombatant: Combatant = {
          ...targetCombatant,
          healthScore,
          temporalHealthScore,
        };

        if (healthScore === 0) {
          if (targetCombatant.isPlayer) {
            updatedCombatant = applyUnconsciousCondition(updatedCombatant);
          } else {
            deleteCombatant(combatantId);
            return;
          }
        }

        set({
          combatants: {
            ...currentCombatants,
            [combatantId]: updatedCombatant,
          },
        });
      },
      selectNextCombatant: () => {
        const { combatants, currentCombatantId, setNextTurn } = get();
        const sorted = getSortedCombatants(combatants);

        if (sorted.length === 0) {
          return;
        }

        const currentIndex = sorted.findIndex((c) => c.id === currentCombatantId);
        const nextIndex = currentIndex + 1;

        if (nextIndex >= sorted.length) {
          set({ currentCombatantId: sorted[0].id });
          setNextTurn();
        } else {
          set({ currentCombatantId: sorted[nextIndex].id });
        }
      },
      toggleCombatantCondition: (combatantId: string, conditionId: string) => {
        const currentCombatants = get().combatants;
        const targetCombatant = currentCombatants[combatantId];

        if (!targetCombatant) {
          return;
        }

        const updatedConditions = toggleCondition(targetCombatant.conditions, conditionId);

        set({
          combatants: {
            ...currentCombatants,
            [combatantId]: {
              ...targetCombatant,
              conditions: updatedConditions,
            },
          },
        });
      },
      addCombatant: (newCombatant: Combatant) => {
        const currentCombatants = get().combatants;
        set({
          combatants: {
            ...currentCombatants,
            [newCombatant.id]: newCombatant,
          },
        });
      },
      deleteCombatant: (combatantId: string) => {
        const { currentCombatantId, combatants, setNextTurn } = get();
        const { [combatantId]: _, ...restCombatants } = combatants;

        if (combatantId !== currentCombatantId) {
          set({ combatants: restCombatants });
          return;
        }

        const sorted = getSortedCombatants(combatants);
        const currentIndex = sorted.findIndex((c) => c.id === combatantId);

        let nextCombatantId: string;

        if (sorted.length <= 1) {
          nextCombatantId = "";
        } else {
          const nextIndex = currentIndex + 1;

          if (nextIndex >= sorted.length) {
            const remainingSorted = getSortedCombatants(restCombatants);
            nextCombatantId = remainingSorted[0]?.id || "";
            setNextTurn();
          } else {
            nextCombatantId = sorted[nextIndex].id;
          }
        }

        set({
          combatants: restCombatants,
          currentCombatantId: nextCombatantId,
        });
      },
    }),
    {
      name: "combat-storage",
    },
  ),
);
