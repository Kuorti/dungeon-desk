import { Combatant } from "@src/entities/combatant/model/combatant.ts";

export interface CombatActions {
  setNextTurn: () => void;
  selectNextCombatant: () => void;
  updateCombatantHealthScore: (combatantId: string, delta: number) => void;
  addCombatantTemporaryHealthScore: (combatantId: string) => void;
  toggleCombatantCondition: (combatantId: string, conditionId: string) => void;
  addCombatant: (combatant: Combatant) => void;
  deleteCombatant: (combatantId: string) => void;
  endCombat: () => void;
}
