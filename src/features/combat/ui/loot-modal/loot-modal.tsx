import Modal from "@src/shared/ui/modal";
import { LootResult } from "@src/features/combat/types/loot-result.ts";
import styles from './loot-modal.module.scss';

interface LootModalProps {
  isOpen: boolean;
  onClose: () => void;
  loot: LootResult | null;
}

export const LootModal = ({ isOpen, onClose, loot }: LootModalProps) => {
  if (!loot) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="⚔️ Combat Ended!">
      <div className={styles.content}>
        <div className={styles.goldSection}>
          <h3>Gold:</h3>
          <span className={styles.icon}>🪙</span>
          <span>{loot.gold} GP</span> found!
        </div>

        <div className={styles.itemsSection}>
          <h3>Items:</h3>
          {loot.items.length === 0 ? (
            <p className={styles.empty}>No items gained</p>
          ) : (
            <ul>
              {loot.items.map((item, index) => (
                <li key={index}>✨ {item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};
