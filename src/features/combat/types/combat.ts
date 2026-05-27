import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { CombatActions } from "@src/features/combat/types/combat-actions.ts";

export interface Combat {
  id: string | null;
  currentRound: number;
  combatants: Record<string, Combatant>;
  currentCombatantId: string | null;
}

export type CombatState = Combat & CombatActions;
