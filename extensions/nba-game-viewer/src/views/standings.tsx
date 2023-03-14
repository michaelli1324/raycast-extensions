import { List } from "@raycast/api";
import useStandings from "../hooks/useStandings";
import TeamComponent from "../components/Team";
import { useState } from "react";
import { Conference } from "../types/standings.types";
import { getStatByName } from "../utils/standings";

const Standings = () => {
  const { data, isLoading } = useStandings();
  const [isShowingDetail, setIsShowingDetail] = useState<boolean>(false);
  const [conference, setConference] = useState<string>(Conference.Eastern);

  const conferenceData = conference === Conference.Eastern ? data?.easternStandings : data?.westernStandings;
  const sortedConferenceData = conferenceData?.sort(
    (a, b) => (getStatByName(a.stats, "playoffSeed")?.value || 0) - (getStatByName(b.stats, "playoffSeed")?.value || 0)
  );

  return (
    <List
      isLoading={isLoading}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Conference"
          placeholder="Select a conference"
          onChange={(value) => setConference(value)}
          value={conference}
        >
          <List.Dropdown.Item value={Conference.Eastern} title="Eastern" />
          <List.Dropdown.Item value={Conference.Western} title="Western" />
        </List.Dropdown>
      }
      isShowingDetail={isShowingDetail}
    >
      {sortedConferenceData?.map((teamStats) => {
        return (
          <TeamComponent
            key={teamStats.team.id}
            teamStats={teamStats}
            showDetail={isShowingDetail}
            onChangeDetail={(detail) => setIsShowingDetail(detail)}
          />
        );
      })}
    </List>
  );
};

export default Standings;
