import { useEffect, useState } from "react";
import { NpcShortInfo } from "@src/entities/combatant/model/types.ts";
import { combatantApi } from "@src/entities/combatant/api/api.ts";

export function useNpcs() {
  const [npcs, setNpcs] = useState<NpcShortInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    combatantApi
      .fetchList()
      .then(setNpcs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { npcs, loading, error };
}
