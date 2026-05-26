import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { Combat } from "@src/shared/types/combat.ts";
import { CombatActions } from "@src/shared/types/combat-actions.ts";
import { conditions } from "@src/shared/constants/conditions.ts";
import { Combatant } from "@src/entities/combatant/model/combatant.ts";

type CombatState = Combat & CombatActions;

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

        if (!targetCombatant) {
          return;
        }

        const isMaxHealth = targetCombatant.healthScore === targetCombatant.maxHealthScore;
        let temporalHealthScore = 0;
        let healthScore = targetCombatant.healthScore;

        if (isMaxHealth) {
          temporalHealthScore =
            targetCombatant.temporalHealthScore === 0 && delta < 0
              ? 0
              : targetCombatant.temporalHealthScore + delta;
        }

        if (
          !isMaxHealth ||
          (isMaxHealth && delta < 0 && targetCombatant.temporalHealthScore === 0)
        ) {
          healthScore = healthScore + delta;
        }

        set({
          combatants: {
            ...currentCombatants,
            [combatantId]: {
              ...targetCombatant,
              healthScore,
              temporalHealthScore,
            },
          },
        });
      },
      toggleCombatantCondition: (combatantId: string, conditionId: string) => {
        const currentCombatants = get().combatants;
        const targetCombatant = currentCombatants[combatantId];

        if (!targetCombatant) {
          return;
        }

        const hasCondition = targetCombatant.conditions.some(
          (condition) => condition.id === conditionId,
        );

        let updatedConditions;
        if (hasCondition) {
          updatedConditions = targetCombatant.conditions.filter(
            (condition) => condition.id !== conditionId,
          );
        } else {
          const conditionToAppend = conditions.find((c) => c.id === conditionId);
          updatedConditions = conditionToAppend
            ? [...targetCombatant.conditions, conditionToAppend]
            : targetCombatant.conditions;
        }

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
    }),
    {
      name: "combat-storage",
    },
  ),
);
