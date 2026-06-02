import {
  DndApiListResponse,
  NpcFullDetails,
  NpcShortInfo,
} from "@src/entities/combatant/model/types.ts";

const BASE_URL = "https://dnd5eapi.co/api/2014";

export const combatantApi = {
  fetchList: async (): Promise<NpcShortInfo[]> => {
    const response = await fetch(`${BASE_URL}/monsters`);

    if (!response.ok) {
      throw new Error(`Failed to fetch NPC list: ${response.status}`);
    }

    const data: DndApiListResponse = await response.json();
    return data.results;
  },

  fetchDetails: async (npcIndex: string): Promise<NpcFullDetails> => {
    const response = await fetch(`${BASE_URL}/monsters/${npcIndex}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch NPC details: ${response.status}`);
    }

    return await response.json();
  },
};
