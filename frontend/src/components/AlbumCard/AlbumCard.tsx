import React from "react";
import { AlbumCardProps } from "../../types";
import {
  StyledCard,
  StyledCardMedia,
  StyledTypography,
} from "./AlbumCard.styles";

const AlbumCard: React.FC<AlbumCardProps> = ({ position, albumUrl, size }) => {
  return (
    <StyledCard size={size}>
      <StyledCardMedia image={albumUrl} title={`Track ${position}`}>
        <StyledTypography variant="body1">{position}</StyledTypography>
      </StyledCardMedia>
    </StyledCard>
  );
};

export default AlbumCard;
