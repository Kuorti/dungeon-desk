import { ConditionId } from "@src/shared/types/condition-ids.ts";
import {
  applyUnconsciousCondition,
  calculateHealthChange,
  toggleCondition,
} from "@src/features/combat/model/combat-rules.ts";
import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { Condition } from "@src/shared/types/condition.ts";

const createMockCombatant = (overrides: Partial<Combatant> = {}): Combatant => ({
  id: "test-id",
  name: "Test Hero",
  isPlayer: true,
  healthScore: 20,
  maxHealthScore: 20,
  temporaryHealthScore: 0,
  conditions: [],
  initiative: 10,
  ...overrides,
});

describe("Combat Rules - calculateHealthChange", () => {
  test("should decrease HP when no temporary HP is present", () => {
    const combatant = createMockCombatant({ healthScore: 20, maxHealthScore: 20, temporaryHealthScore: 0 });
    const result = calculateHealthChange(combatant, -5);

    expect(result.healthScore).toBe(15);
    expect(result.temporaryHealthScore).toBe(0);
  });

  test("should decrease temporary HP if combatant has it", () => {
    const combatant = createMockCombatant({
      healthScore: 20,
      maxHealthScore: 20,
      temporaryHealthScore: 8,
    });
    const result = calculateHealthChange(combatant, -5);

    expect(result.healthScore).toBe(20);
    expect(result.temporaryHealthScore).toBe(3);
  });

  test("should decrease temporary HP first and main HP after", () => {
    const combatant = createMockCombatant({
      healthScore: 20,
      maxHealthScore: 20,
      temporaryHealthScore: 8,
    });
    const result = calculateHealthChange(combatant, -10);

    expect(result.healthScore).toBe(18);
    expect(result.temporaryHealthScore).toBe(0);
  });

  test("should increase main HP first and temporary HP after", () => {
    const combatant = createMockCombatant({
      healthScore: 18,
      maxHealthScore: 20,
      temporaryHealthScore: 6,
    });
    const result = calculateHealthChange(combatant, 5);

    expect(result.healthScore).toBe(20);
    expect(result.temporaryHealthScore).toBe(9);
  });

  test("health score should not drop below zero", () => {
    const combatant = createMockCombatant({
      healthScore: 5,
      maxHealthScore: 20,
      temporaryHealthScore: 0,
    });
    const result = calculateHealthChange(combatant, -100);

    expect(result.healthScore).toBe(0);
  });
});

describe("Combat Rules - applyUnconsciousCondition", () => {
  test("should append the Unconscious condition if it is not already present", () => {
    const combatant = createMockCombatant({ conditions: [] });
    const updated = applyUnconsciousCondition(combatant);
    const hasUnconscious = updated.conditions.some((c) => c.id === ConditionId.Unconscious);

    expect(hasUnconscious).toBe(true);
  });

  test("should not duplicate the Unconscious condition if it is already applied", () => {
    const mockCondition = { id: ConditionId.Unconscious, name: "Unconscious", icon: "" };
    const combatant = createMockCombatant({ conditions: [mockCondition] });
    const updated = applyUnconsciousCondition(combatant);
    const unconsciousCount = updated.conditions.filter(
      (c) => c.id === ConditionId.Unconscious,
    ).length;

    expect(unconsciousCount).toBe(1);
  });
});

describe("Combat Rules - toggleCondition", () => {
  test("should remove a condition from the list if it already exists", () => {
    const mockCondition = { id: "poisoned", name: "Poisoned", icon: "" };
    const currentConditions = [mockCondition];
    const result = toggleCondition(currentConditions, "poisoned");

    expect(result.length).toBe(0);
  });

  test("should add a condition to the list if it does not exist", () => {
    const currentConditions: Condition[] = [];
    const result = toggleCondition(currentConditions, ConditionId.Unconscious);
    const hasCondition = result.some((c) => c.id === ConditionId.Unconscious);

    expect(hasCondition).toBe(true);
  });
});
