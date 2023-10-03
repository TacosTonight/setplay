import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

const PlaylistArt = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [base64Image, setBase64Image] = useState("");
  const artistImg = useSelector((state: RootState) => state.artist.imgUrl);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (artistImg && canvas && ctx) {
      const img = new Image();
      img.src = artistImg;
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
  }, [artistImg]);

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
