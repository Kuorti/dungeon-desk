import { useMemo, useState } from "react";
import { useNpcs } from "@src/entities/combatant/model/use-npcs.ts";

export function useNpcSearch() {
  const { npcs, loading, error } = useNpcs();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNpcs = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    return npcs.filter((npc) => npc.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, npcs]);

  return {
    searchQuery,
    setSearchQuery,
    filteredNpcs,
    isLoading: loading,
    error,
  };
}
