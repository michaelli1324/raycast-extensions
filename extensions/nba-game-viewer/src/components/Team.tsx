import { List, ActionPanel, Action, Icon } from "@raycast/api";
import Roster from "../views/roster";
import { TeamStats } from "../types/standings.types";
import { getStatByName } from "../utils/standings";

type TeamProps = {
  teamStats: TeamStats;
  showDetail: boolean;
  onChangeDetail?: (detail: boolean) => void;
};

const Team = ({ teamStats, showDetail, onChangeDetail }: TeamProps) => {
  const logo = teamStats.team.logos[0].href;
  const wins = getStatByName(teamStats.stats, "wins");
  const losses = getStatByName(teamStats.stats, "losses");
  const winPercentage = getStatByName(teamStats.stats, "winPercent");
  const streak = getStatByName(teamStats.stats, "streak");
  const lastTen = getStatByName(teamStats.stats, "Last Ten Games");

  return (
    <List.Item
      key={teamStats.team.id}
      title={teamStats.team.name}
      subtitle={getStatByName(teamStats.stats, "playoffSeed")?.displayValue}
      icon={logo}
      accessories={
        showDetail
          ? undefined
          : [
              { text: `${wins?.displayName}: ${wins?.displayValue}` },
              { text: `${losses?.displayName}: ${losses?.displayValue}` },
            ]
      }
      detail={
        <List.Item.Detail
          markdown={`<img src="${logo}" alt="image" width="200" />`}
          metadata={
            <List.Item.Detail.Metadata>
              <List.Item.Detail.Metadata.Label title="Team Name" text={teamStats.team.name} />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label title="Wins" text={wins?.displayValue} />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label title="Losses" text={losses?.displayValue} />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label
                title="Win Percentage"
                text={new Intl.NumberFormat("default", {
                  style: "percent",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(winPercentage?.value || 0)}
              />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label title="Streak" text={streak?.displayValue} />
              <List.Item.Detail.Metadata.Separator />
              <List.Item.Detail.Metadata.Label title="Last 10 Games" text={lastTen?.displayValue} />
            </List.Item.Detail.Metadata>
          }
        />
      }
      actions={
        <ActionPanel>
          <Action.Push title="View Roster" icon={Icon.Person} target={<Roster id={teamStats.team.id} />} />
          <Action title={showDetail ? "Hide Detail" : "Show Detail"} onAction={() => onChangeDetail?.(!showDetail)} />
          <Action.OpenInBrowser title="View Team on ESPN" url={teamStats.team.links[0].href} />
        </ActionPanel>
      }
    />
  );
};

export default Team;
