import { Condition } from "@src/shared/types/condition.ts";
import { PlayerClass } from "@src/shared/types/player-class.ts";

export interface Combatant {
  id: string;
  name: string;
  logo?: string;
  isPlayer: boolean;
  playerClass?: PlayerClass;
  healthScore: number;
  temporalHealthScore: number;
  maxHealthScore: number;
  conditions: Condition[];
  initiative: number;
}
