export type StandingsResponse = {
  name: string;
  abbreviation: string;
  children: Array<ConferenceStanding>;
};

export type ConferenceStanding = {
  name: string;
  abbreviation: string;
  standings: {
    name: string;
    entries: Array<TeamStats>;
  };
};

export type TeamStats = {
  team: {
    id: number;
    location: string;
    name: string;
    abbreviation: string;
    displayName: string;
    logos: Array<{ href: string }>;
    links: Array<{ href: string }>;
  };
  stats: Array<Stat>;
};

export type Stat = {
  name: string;
  value: number;
  displayName: string;
  description: string;
  abbreviation: string;
  displayValue: string;
  shortDisplayName: string;
};

export const Conference = {
  Eastern: "Eastern",
  Western: "Western",
} as const;
