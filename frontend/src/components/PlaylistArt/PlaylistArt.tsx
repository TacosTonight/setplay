import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { updatePlaylistArt } from "../../redux/playlistManagementSlice";

const PlaylistArt = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [base64Image, setBase64Image] = useState("");
  const filePaths = [
    "/mid_setplayart.png",
    "/mid_setplayart2.png",
    "/mid_setplayart3.png",
    "/mid_setplayart4.png",
    "/mid_setplayart5.png",
  ];
  const getRandomFileFromFolder = () => {
    const randomIndex = Math.floor(Math.random() * filePaths.length);
    return filePaths[randomIndex];
  };
  const [artistImg, setArtistImg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setArtistImg(getRandomFileFromFolder());
  }, []);

  useEffect(() => {
    dispatch(updatePlaylistArt(base64Image));
  }, [base64Image]);

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

        const msg = "Created with Setplay";
        const outlineColor = "black"; // Define the outline color
        const textColor = "white"; // Define the text color
        ctx.font = "50px bold";

        const textWidth = ctx.measureText(msg).width;
        const xCoordinate = (canvas.width - textWidth) / 2;

        // Draw the text with outline
        ctx.fillStyle = outlineColor;
        ctx.fillText(msg, xCoordinate - 2, canvas.height - 10); // Offset by -2 pixels

        // Draw the text over the outline
        ctx.fillStyle = textColor;
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
        <img
          src={base64Image}
          width={300}
          height={300}
          alt="Generated Artwork"
        />
      ) : (
        <Skeleton variant="rectangular" width={300} height={300}></Skeleton>
      )}
    </div>
  );
};

export default PlaylistArt;
