import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { CombatState } from "@src/features/combat/types/combat.ts";

export const getSortedCombatants = (combatants: Record<string, Combatant>): Combatant[] => {
  return Object.values(combatants).sort((a, b) => {
    if (b.initiative !== a.initiative) {
      return b.initiative - a.initiative;
    }
    return a.name.localeCompare(b.name);
  });
};

export const selectSortedCombatants = (state: CombatState): Combatant[] =>
  getSortedCombatants(state.combatants);
