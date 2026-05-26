export interface CombatActions {
  setCombatId: (id: string) => void;
  setNextTurn: () => void;
  updateCombatantHealthScore: (combatantId: string, delta: number) => void;
  toggleCombatantCondition: (combatantId: string, conditionId: string) => void;
}
