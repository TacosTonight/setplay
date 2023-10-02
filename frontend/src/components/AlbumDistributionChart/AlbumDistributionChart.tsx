import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";
import { styled } from "@mui/system";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";
import { Setlist } from "../../types";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

type AlbumOccurrences = {
  value: number;
  label: string;
};

const StyledText = styled("text")(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

type PieCenterLabelProps = {
  children: React.ReactNode;
};

const PieCenterLabel: React.FC<PieCenterLabelProps> = ({ children }) => {
  const { width, height, left, top } = useDrawingArea();
  const lines = (children?.toString() ?? "").split("\n");
  return (
    <StyledText x={left + width / 2} y={top + height / 2.3}>
      {lines.map((line, index) => (
        <tspan key={index} x={left + width / 2} dy={index > 0 ? "1.2em" : 0}>
          {line}
        </tspan>
      ))}
    </StyledText>
  );
};

const findUniqueGroups = (inputArray: Setlist): AlbumOccurrences[] => {
  const groupMap: Map<string, number> = new Map();

  inputArray.songs.forEach((item) => {
    if (groupMap.has(item.albumName)) {
      groupMap.set(item.albumName, groupMap.get(item.albumName)! + 1);
    } else {
      groupMap.set(item.albumName, 1);
    }
  });

  const uniqueGroups: AlbumOccurrences[] = [];

  groupMap.forEach((count, label) => {
    uniqueGroups.push({ value: count, label });
  });

  return uniqueGroups;
};

const AlbumDistributionChart = () => {
  const setlistStore = useSelector((state: RootState) => state.setlist);
  const [setlist, setSetlist] = useState<Setlist>({ songs: [] });
  useEffect(() => {
    setSetlist(setlist);
  }, [setlistStore]);

  const uniqueGroups: AlbumOccurrences[] = findUniqueGroups(setlist);

  return (
    <PieChart
      colors={cheerfulFiestaPalette}
      series={[
        {
          data: uniqueGroups,
          paddingAngle: 5,
          innerRadius: 60,
          outerRadius: 80,
          highlightScope: { faded: "global", highlighted: "item" },
        },
      ]}
      width={400}
      height={200}
      legend={{ hidden: true }}
    >
      <PieCenterLabel>{`Album \n Distribution`}</PieCenterLabel>
    </PieChart>
  );
};

export default AlbumDistributionChart;
