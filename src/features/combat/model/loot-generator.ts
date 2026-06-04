import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { LootResult } from "@src/features/combat/types/loot-result.ts";



const POSSIBLE_ITEMS = [
  "Potion of Healing",
  "Scroll of Fireball",
  "Longsword +1",
  "Bag of Holding",
  "Ring of Protection",
  "Gems (worth 50gp)",
];

// ToDo: Add AI loot generation based on combat difficulty
export function generateCombatLoot(combatants: Record<string, Combatant>): LootResult {
  const npcCount = Object.values(combatants).filter((c) => !c.isPlayer).length;

  if (npcCount === 0) {
    return { gold: 0, items: [] };
  }

  const gold = Math.floor(Math.random() * (50 - 10 + 1) + 10) * npcCount;
  const items: string[] = [];

  for (let i = 0; i < npcCount; i++) {
    if (Math.random() < 0.3) {
      const randomIndex = Math.floor(Math.random() * POSSIBLE_ITEMS.length);
      items.push(POSSIBLE_ITEMS[randomIndex]);
    }
  }

  return { gold, items };
}
