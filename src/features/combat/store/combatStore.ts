import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { CombatState } from "@src/features/combat/types/combat.ts";
import { conditions } from "@src/shared/constants/conditions.ts";
import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { getSortedCombatants } from "@src/features/combat/model/selectors.ts";

export const useCombatStore = create<CombatState>()(
  persist(
    (set, get) => ({
      id: null,
      currentRound: 1,
      currentCombatantId: "2",
      combatants: {
        "1": {
          id: "1",
          name: "Nastya",
          isPlayer: true,
          playerClass: "bard",
          healthScore: 22,
          temporalHealthScore: 0,
          maxHealthScore: 22,
          conditions: [],
          initiative: 1,
        },
        "2": {
          id: "2",
          name: "Grisha",
          isPlayer: true,
          playerClass: "paladin",
          healthScore: 22,
          temporalHealthScore: 0,
          maxHealthScore: 30,
          conditions: [],
          initiative: 3,
        },
      } as Record<string, Combatant>,
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
        const { deleteCombatant, toggleCombatantCondition } = get();

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

        if (healthScore < 0) {
          healthScore = 0;
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

        if (healthScore === 0) {
          if (targetCombatant.isPlayer) {
            const unconsciousId = "15";
            toggleCombatantCondition(combatantId, unconsciousId);
          } else {
            deleteCombatant(combatantId);
          }
        }
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
        const { currentCombatantId, selectNextCombatant } = get();
        const currentCombatants = get().combatants;
        const { [combatantId]: _, ...restCombatants } = currentCombatants;

        if (combatantId === currentCombatantId) {
          selectNextCombatant();
        }

        set({
          combatants: restCombatants,
        });
      },
    }),
    {
      name: "combat-storage",
    },
  ),
);
