import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { ArtistCardProps } from "../../types";

const ArtistCard: React.FC<ArtistCardProps> = ({ artistName, imageUrl }) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar alt={artistName} src={imageUrl} />
      <Box ml={2}>
        <Typography variant="h6">{artistName}</Typography>
      </Box>
    </Box>
  );
};

export default ArtistCard;
