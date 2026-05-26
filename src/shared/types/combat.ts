import { Combatant } from "@src/entities/combatant/model/combatant.ts";

export interface Combat {
  id: string | null;
  currentRound: number;
  combatants: Record<string, Combatant>;
  currentCombatantId: string | null;
}
