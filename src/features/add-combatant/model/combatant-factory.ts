import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { PlayerClass } from "@src/shared/types/player-class.ts";

interface CreateCombatantParams {
  name: string;
  type: "player" | "npc";
  maxHp: number;
  currentHp: number;
  initiative: number;
  playerClass?: PlayerClass;
}

export function createCombatant({
  name,
  type,
  maxHp,
  currentHp,
  initiative,
  playerClass,
}: CreateCombatantParams): Combatant {
  const isPlayer = type === "player";

  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    isPlayer,
    playerClass: isPlayer ? playerClass : undefined,
    healthScore: currentHp,
    temporaryHealthScore: 0,
    maxHealthScore: maxHp,
    conditions: [],
    initiative: initiative,
  };
}
