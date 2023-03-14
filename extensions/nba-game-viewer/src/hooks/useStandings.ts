import { getStandings } from "../utils/standings";
import { useCallback } from "react";
import { Conference } from "../types/standings.types";
import { useCachedPromise } from "@raycast/utils";

const useStandings = () => {
  const fetchTeamStandings = useCallback(async () => {
    const data = await getStandings({ year: new Date().getUTCFullYear().toString(), group: "conference" });

    const easternConference = data?.children?.find(
      (conference) => conference?.name === `${Conference.Eastern} Conference`
    );
    const westernConference = data?.children?.find(
      (conference) => conference?.name === `${Conference.Western} Conference`
    );

    if (!easternConference || !westernConference) throw new Error("Could not find conference standings");

    const easternStandings = easternConference.standings.entries;
    const westernStandings = westernConference.standings.entries;

    return { easternStandings, westernStandings };
  }, []);

  return useCachedPromise(fetchTeamStandings);
};

export default useStandings;
