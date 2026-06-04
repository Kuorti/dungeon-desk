import { SyntheticEvent, useEffect, useState } from "react";
import { useCombatStore } from "@src/features/combat/store/combatStore.ts";
import { PlayerClass } from "@src/shared/types/player-class.ts";
import { PLAYER_CLASSES } from "@src/shared/constants/player-classes.ts";
import { MAX_AVAILABLE_HP } from "@src/shared/constants/max-available-hp.ts";
import { createCombatant } from "@src/features/add-combatant/model/combatant-factory.ts";
import { useNpcDetails } from "@src/features/add-combatant/model/use-npc-details.ts";

const DEFAULT_VALUES = {
  initiative: 1,
  maxHp: 10,
};

export const useCombatantForm = (isOpen: boolean, onClose: () => void) => {
  const addCombatant = useCombatStore((state) => state.addCombatant);
  const { loadNpcDetails, isNpcDetailsLoading } = useNpcDetails();
  const [type, setType] = useState<"player" | "npc">("player");
  const [playerClass, setPlayerClass] = useState<PlayerClass | undefined>(undefined);
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState(DEFAULT_VALUES.initiative);
  const [maxHp, setMaxHp] = useState(DEFAULT_VALUES.maxHp);
  const [currentHp, setCurrentHp] = useState(DEFAULT_VALUES.maxHp);
  const [isCurrentHpDirty, setIsCurrentHpDirty] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    initiative: false,
    maxHp: false,
    currentHp: false,
  });

  useEffect(() => {
    if (!isCurrentHpDirty) {
      setCurrentHp(maxHp);
    }
  }, [maxHp, isCurrentHpDirty]);

  useEffect(() => {
    if (isOpen) {
      setType("player");
      setPlayerClass(PLAYER_CLASSES[0].value);
      setName("");
      setInitiative(DEFAULT_VALUES.initiative);
      setMaxHp(DEFAULT_VALUES.maxHp);
      setCurrentHp(DEFAULT_VALUES.maxHp);
      setIsCurrentHpDirty(false);
      setTouched({ name: false, initiative: false, maxHp: false, currentHp: false });
    }
  }, [isOpen]);

  const handleTypeChange = (newType: "player" | "npc") => {
    setType(newType);
    setInitiative(DEFAULT_VALUES.initiative);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setTouched((prev) => ({ ...prev, name: true }));
  };

  const handleInitiativeChange = (value: number) => {
    setInitiative(value);
    setTouched((prev) => ({ ...prev, initiative: true }));
  };

  const handleClassChange = (value: PlayerClass) => {
    setPlayerClass(value);
  };

  const handleMaxHpChange = (value: number) => {
    setMaxHp(value);
    setTouched((prev) => ({ ...prev, maxHp: true }));
  };

  const handleCurrentHpChange = (value: number) => {
    setIsCurrentHpDirty(true);
    setCurrentHp(value);
    setTouched((prev) => ({ ...prev, currentHp: true }));
  };

  const errors = {
    name: touched.name && name.trim().length === 0 ? "Name is required" : "",
    initiative:
      touched.initiative && Number(initiative) < DEFAULT_VALUES.initiative
        ? `Initiative must be ${DEFAULT_VALUES.initiative} or greater`
        : "",
    maxHp:
      touched.maxHp && (maxHp <= 0 || maxHp > MAX_AVAILABLE_HP)
        ? `Max HP must be between 1 and ${MAX_AVAILABLE_HP}`
        : "",
    currentHp: touched.currentHp
      ? currentHp <= 0
        ? "Current HP must be a positive number"
        : currentHp > maxHp
          ? "Current HP cannot exceed Max HP"
          : ""
      : "",
  };

  const isValid =
    name.trim().length > 0 &&
    Number(maxHp) > 0 &&
    Number(maxHp) <= MAX_AVAILABLE_HP &&
    Number(currentHp) >= 0 &&
    Number(currentHp) <= Number(maxHp) &&
    initiative &&
    initiative >= DEFAULT_VALUES.initiative;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isValid) {
      setTouched({ name: true, initiative: true, maxHp: true, currentHp: true });
      return;
    }

    const newCombatant = createCombatant({
      name,
      type,
      maxHp,
      currentHp,
      initiative,
      playerClass,
    });

    addCombatant(newCombatant);
    onClose();
  };

  const handleNpcSelect = async (npcIndex: string) => {
    const npcStats = await loadNpcDetails(npcIndex);

    if (!npcStats) {
      return;
    }

    handleNameChange(npcStats.name);
    handleMaxHpChange(npcStats.hp);
    setIsCurrentHpDirty(false);
    setCurrentHp(npcStats.hp);
  };

  return {
    state: {
      type,
      name,
      initiative,
      maxHp,
      currentHp,
      errors,
      isValid,
      playerClass,
      isNpcDetailsLoading,
    },
    actions: {
      setType,
      setInitiative,
      setPlayerClass,
      handleNameChange,
      handleTypeChange,
      handleInitiativeChange,
      handleMaxHpChange,
      handleClassChange,
      handleCurrentHpChange,
      handleSubmit,
      handleNpcSelect,
    },
  };
};
