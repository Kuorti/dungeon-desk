import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { ConditionId } from "@src/shared/types/condition-ids.ts";
import { conditions } from "@src/shared/constants/conditions.ts";
import { Condition } from "@src/shared/types/condition.ts";

export function calculateHealthChange(combatant: Combatant, delta: number) {
  let healthScore = combatant.healthScore;
  let temporalHealthScore = combatant.temporalHealthScore;

  if (delta < 0) {
    const damageScore = Math.abs(delta);

    if (temporalHealthScore > 0) {
      if (damageScore <= temporalHealthScore) {
        temporalHealthScore -= damageScore;
      } else {
        const leftoverDamage = damageScore - temporalHealthScore;
        temporalHealthScore = 0;
        healthScore -= leftoverDamage;
      }
    } else {
      healthScore -= damageScore;
    }

    if (healthScore < 0) {
      healthScore = 0;
    }
  } else {
    const healScore = Math.abs(delta);
    const availableHealScore = combatant.maxHealthScore - combatant.healthScore;

    if (healScore <= availableHealScore) {
      healthScore += healScore;
    } else {
      const leftoverHeal = healScore - availableHealScore;
      healthScore = combatant.maxHealthScore;
      temporalHealthScore = combatant.temporalHealthScore + leftoverHeal;
    }
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
