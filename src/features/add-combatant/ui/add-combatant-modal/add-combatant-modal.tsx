import Modal from "@src/shared/ui/modal";
import Button from "@src/shared/ui/button";
import { useCombatantForm } from "@src/features/add-combatant/model/use-combatant-form.ts";
import { MAX_AVAILABLE_HP } from "@src/shared/constants/max-available-hp.ts";
import styles from "./add-combatant-modal.module.scss";
import { PLAYER_CLASSES } from "@src/shared/constants/player-classes.ts";
import { PlayerClass } from "@src/shared/types/player-class.ts";
import NumericInput from "@src/shared/ui/numeric-input";
import NpcSearchAutocomplete from "@src/features/add-combatant/ui/npc-search-autocomplete";

interface AddCombatantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CombatantType = "player" | "npc";

const AddCombatantModal = ({ isOpen, onClose }: AddCombatantModalProps) => {
  const { state, actions } = useCombatantForm(isOpen, onClose);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add combatant"
      className={styles.wrapper}
      footer={
        <Button type="submit" form="add-combatant-form" disabled={!state.isValid}>
          Add
        </Button>
      }
    >
      <form id="add-combatant-form" className={styles.form} onSubmit={actions.handleSubmit}>
        <div className={styles.control}>
          <label>
            Type:
            <select
              value={state.type}
              onChange={(e) => actions.handleTypeChange(e.target.value as CombatantType)}
            >
              <option value="player">Player</option>
              <option value="npc">NPC</option>
            </select>
          </label>
        </div>

        {state.type === "npc" && (
          <div className={styles.control}>
            <label>
              Name:
              <NpcSearchAutocomplete
                value={state.name}
                onSelectNpc={actions.handleNpcSelect}
                onChange={(value) => actions.handleNameChange(value)}
              />
            </label>
          </div>
        )}

        {state.type === "player" && (
          <>
            <div className={styles.control}>
              <label>
                Name:
                <input
                  type="text"
                  value={state.name}
                  onChange={(event) => actions.handleNameChange(event.target.value)}
                  placeholder="Enter name..."
                />
              </label>
              {state.errors.name && <div className={styles.error}>{state.errors.name}</div>}
            </div>
            <div className={styles.control}>
              <label>
                Class:
                <select
                  value={state.playerClass}
                  onChange={(e) => actions.handleClassChange(e.target.value as PlayerClass)}
                >
                  {PLAYER_CLASSES.map((playerClass) => {
                    return (
                      <option value={playerClass.value} key={playerClass.value}>
                        {playerClass.label}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          </>
        )}

        <div className={styles.control}>
          <label>
            Initiative:
            <NumericInput
              placeholder="Enter initiative..."
              min={1}
              value={state.initiative}
              onChange={(value) => actions.handleInitiativeChange(value)}
            ></NumericInput>
          </label>
          {state.errors.initiative && <div className={styles.error}>{state.errors.initiative}</div>}
        </div>

        <div className={styles.control}>
          <label>
            Max HP:
            <NumericInput
              placeholder="Enter max HP..."
              min={1}
              max={MAX_AVAILABLE_HP}
              value={state.maxHp}
              onChange={(value) => actions.handleMaxHpChange(value)}
            ></NumericInput>
          </label>
          {state.errors.maxHp && <div className={styles.error}>{state.errors.maxHp}</div>}
        </div>

        <div className={styles.control}>
          <label>
            Current HP:
            <NumericInput
              placeholder="Enter current HP..."
              min={1}
              max={MAX_AVAILABLE_HP}
              value={+state.currentHp}
              onChange={(value) => actions.handleCurrentHpChange(value)}
            ></NumericInput>
          </label>
          {state.errors.currentHp && <div className={styles.error}>{state.errors.currentHp}</div>}
        </div>
      </form>
    </Modal>
  );
};

export default AddCombatantModal;
