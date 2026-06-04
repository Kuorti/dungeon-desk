import { combatantApi } from "@src/entities/combatant/api/api.ts";
import { useQuery } from "@tanstack/react-query";
import { useToastStore } from "@src/shared/ui/toast/use-toast-store.ts";
import { useEffect } from "react";

export function useNpcs() {
  const {
    data: npcs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["npcs"],
    queryFn: () => combatantApi.fetchList(),
  });

  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    if (error) {
      addToast("NPC list hasn't been loaded", "warning");
    }
  }, [error, addToast]);

  return { npcs, loading: isLoading, error };
}
