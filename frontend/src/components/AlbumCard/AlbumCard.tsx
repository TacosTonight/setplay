import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";

type AlbumCardProps = {
  position: number;
  albumUrl: string;
};

const AlbumCard: React.FC<AlbumCardProps> = ({ position, albumUrl }) => {
  return (
    <Card sx={{ width: 80, height: 80 }}>
      <CardMedia
        sx={{
          position: "relative",
          objectFit: "cover",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        image={albumUrl}
        title={`Track ${position}`}
      >
        <Typography
          sx={(theme) => ({
            position: "absolute",
            height: "25%",
            width: "25%",
            backgroundColor: "rgba(181, 181, 181, 0.80)",
            padding: theme.spacing(1),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "100%",
          })}
          variant="body1"
        >
          {position}
        </Typography>
      </CardMedia>
    </Card>
  );
};

export default AlbumCard;
