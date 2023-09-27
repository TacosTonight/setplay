import React, { useEffect, useRef, useState } from "react";
import { useFetchArtistImage } from "../../hooks/useFetchArtistImage";
import { Skeleton } from "@mui/material";

type PlaylistArtProps = {
  artist: string;
};

const PlaylistArt: React.FC<PlaylistArtProps> = ({ artist }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [base64Image, setBase64Image] = useState("");
  const { data } = useFetchArtistImage(artist);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (data && canvas && ctx) {
      const img = new Image();
      img.src = data;
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const msg = "SetPlay";
        ctx.fillStyle = "white";
        ctx.font = "16px bold";
        const textWidth = ctx.measureText(msg).width;
        const xCoordinate = (canvas.width - textWidth) / 2;

        ctx.fillText(msg, xCoordinate, canvas.height - 10);

        const base64URL = canvas.toDataURL("image/png");
        setBase64Image(base64URL);
      };
    }
  }, [data, artist]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {base64Image ? (
        <img src={base64Image} alt="Generated Artwork" />
      ) : (
        <Skeleton variant="rectangular" width={300} height={300}></Skeleton>
      )}
    </div>
  );
};

export default PlaylistArt;
