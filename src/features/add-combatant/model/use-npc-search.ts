import { useMemo } from "react";
import { useNpcs } from "@src/entities/combatant/model/use-npcs.ts";

export function useNpcSearch(searchQuery: string) {
  const { npcs, loading, error } = useNpcs();

  const filteredNpcs = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    return npcs.filter((npc) => npc.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, npcs]);

  return {
    searchQuery,
    filteredNpcs,
    isLoading: loading,
    error,
  };
}
