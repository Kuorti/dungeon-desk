import styles from "./combatant-logo.module.scss";
import BarbarianIcon from "@src/shared/assets/icons/classes/barbarian.svg?react";
import BardIcon from "@src/shared/assets/icons/classes/bard.svg?react";
import ClericIcon from "@src/shared/assets/icons/classes/cleric.svg?react";
import DruidIcon from "@src/shared/assets/icons/classes/druid.svg?react";
import FighterIcon from "@src/shared/assets/icons/classes/fighter.svg?react";
import MonkIcon from "@src/shared/assets/icons/classes/monk.svg?react";
import PaladinIcon from "@src/shared/assets/icons/classes/paladin.svg?react";
import RangerIcon from "@src/shared/assets/icons/classes/ranger.svg?react";
import RogueIcon from "@src/shared/assets/icons/classes/rogue.svg?react";
import SorcererIcon from "@src/shared/assets/icons/classes/sorcerer.svg?react";
import WarlockIcon from "@src/shared/assets/icons/classes/warlock.svg?react";
import WizardIcon from "@src/shared/assets/icons/classes/wizard.svg?react";
import { Combatant } from "@src/entities/combatant/model/combatant.ts";
import { PlayerClass } from "@src/shared/types/player-class.ts";
import { ComponentType, SVGProps } from "react";

const CLASS_ICONS: Record<PlayerClass, ComponentType<SVGProps<SVGSVGElement>>> = {
  barbarian: BarbarianIcon,
  bard: BardIcon,
  cleric: ClericIcon,
  druid: DruidIcon,
  fighter: FighterIcon,
  monk: MonkIcon,
  paladin: PaladinIcon,
  ranger: RangerIcon,
  rogue: RogueIcon,
  sorcerer: SorcererIcon,
  warlock: WarlockIcon,
  wizard: WizardIcon,
};

type Props = {
  combatant: Combatant;
};

export const CombatantLogo = ({ combatant }: Props) => {
  const IconComponent = combatant.playerClass ? CLASS_ICONS[combatant.playerClass] : null;

  return (
    <span className={styles.logo}>
      {combatant.isPlayer && IconComponent && <IconComponent className={styles.svgIcon} />}
    </span>
  );
};
