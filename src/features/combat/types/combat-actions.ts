import { Combatant } from "@src/entities/combatant/model/combatant.ts";

export interface CombatActions {
  setCombatId: (id: string) => void;
  setNextTurn: () => void;
  selectNextCombatant: () => void;
  updateCombatantHealthScore: (combatantId: string, delta: number) => void;
  toggleCombatantCondition: (combatantId: string, conditionId: string) => void;
  addCombatant: (combatant: Combatant) => void;
  deleteCombatant: (combatantId: string) => void;
  endCombat: () => void;
}
