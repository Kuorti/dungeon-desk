import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { ConditionId } from "@src/shared/types/condition-ids.ts";
import { conditions } from "@src/shared/constants/conditions.ts";
import { Condition } from "@src/shared/types/condition.ts";

export function calculateHealthChange(combatant: Combatant, delta: number) {
  const isMaxHealth = combatant.healthScore === combatant.maxHealthScore;
  let temporalHealthScore = combatant.temporalHealthScore;
  let healthScore = combatant.healthScore;

  if (isMaxHealth) {
    temporalHealthScore =
      combatant.temporalHealthScore === 0 && delta < 0 ? 0 : combatant.temporalHealthScore + delta;
  }

  if (!isMaxHealth || (isMaxHealth && delta < 0 && combatant.temporalHealthScore === 0)) {
    healthScore = healthScore + delta;
  }

  if (healthScore < 0) {
    healthScore = 0;
  }

  return { healthScore, temporalHealthScore };
}

export function applyUnconsciousCondition(combatant: Combatant): Combatant {
  const hasUnconscious = combatant.conditions.some((c) => c.id === ConditionId.Unconscious);
  if (hasUnconscious) return combatant;

  const unconsciousCondition = conditions.find((c) => c.id === ConditionId.Unconscious);

  return {
    ...combatant,
    conditions: unconsciousCondition
      ? [...combatant.conditions, unconsciousCondition]
      : combatant.conditions,
  };
}

export function toggleCondition(currentConditions: Condition[], conditionId: string): Condition[] {
  const hasCondition = currentConditions.some((condition) => condition.id === conditionId);

  if (hasCondition) {
    return currentConditions.filter((condition) => condition.id !== conditionId);
  }

  const conditionToAppend = conditions.find((c) => c.id === conditionId);

  return conditionToAppend ? [...currentConditions, conditionToAppend] : currentConditions;
}
