import { useToastStore } from "@src/shared/ui/toast/use-toast-store.ts";
import { useState } from "react";
import { combatantApi } from "@src/entities/combatant/api/api.ts";

export function useNpcDetails() {
  const [isNpcDetailsLoading, setIsNpcDetailsLoading] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const loadNpcDetails = async (npcIndex: string) => {
    setIsNpcDetailsLoading(true);

    try {
      const fullData = await combatantApi.fetchDetails(npcIndex);
      return {
        name: fullData.name,
        hp: fullData.hit_points || 1,
      };
    } catch (error) {
      addToast("Failed to load NPC stats from server", "error");
      return null;
    } finally {
      setIsNpcDetailsLoading(false);
    }
  };

  return { loadNpcDetails, isNpcDetailsLoading };
}
