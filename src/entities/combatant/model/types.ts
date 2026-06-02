export interface NpcShortInfo {
  index: string;
  name: string;
  url: string;
}

export interface NpcFullDetails {
  index: string;
  name: string;
  hit_points: number;
}

export interface DndApiListResponse {
  count: number;
  results: NpcShortInfo[];
}
