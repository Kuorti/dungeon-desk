import { useEffect, useRef, useState } from "react";
import { useNpcSearch } from "@src/features/add-combatant/model/use-npc-search.ts";
import styles from "./npc-search-autocomplete.module.scss";
import { useDebounce } from "@src/shared/lib/hooks/useDebounce";

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectNpc: (index: string) => void;
}

const NpcSearchAutocomplete = ({ value, onChange, onSelectNpc }: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { filteredNpcs, isLoading } = useNpcSearch(useDebounce(value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isExactMatch =
    filteredNpcs.length === 1 && filteredNpcs[0].name.toLowerCase() === value.toLowerCase();

  return (
    <div ref={containerRef}>
      <input
        type="text"
        value={value}
        placeholder="Type NPC name..."
        disabled={isLoading}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (!isExactMatch) {
            setIsOpen(true);
          }
        }}
      />

      {isOpen && filteredNpcs.length > 0 && !isExactMatch && (
        <ul className={styles.dropdown}>
          {filteredNpcs.map((npc) => (
            <li
              className={styles.dropdownElement}
              key={npc.index}
              onMouseDown={(event) => {
                event.preventDefault();
                onSelectNpc(npc.index);
                setIsOpen(false);
              }}
            >
              {npc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NpcSearchAutocomplete;
