import React from "react";
import { PieChart } from "@mui/x-charts";
import { styled } from "@mui/system";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";

type AlbumOccurrences = {
  value: number;
  label: string;
};

type Song = {
  title: string;
  albumUrl: string;
  duration: number;
  albumName: string;
};

type AlbumDistributionProps = {
  setList: Song[];
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

const findUniqueGroups = (inputArray: Song[]): AlbumOccurrences[] => {
  const groupMap: Map<string, number> = new Map();

  inputArray.forEach((item) => {
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

//currently takes in an array of songs to keep the grouping function
//in here for now but in the future will move the function out of this component
//and make it take albumOccurences instead
const AlbumDistributionChart: React.FC<AlbumDistributionProps> = ({
  setList,
}) => {
  const uniqueGroups: AlbumOccurrences[] = findUniqueGroups(setList);
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
