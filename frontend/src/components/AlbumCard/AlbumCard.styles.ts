import { styled } from "@mui/system";
import { Card, CardMedia, Typography } from "@mui/material";

// Styled Card
type StyledCardProps = {
  size: number;
};

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "size",
})<StyledCardProps>(({ size }) => ({
  width: size,
  height: size,
}));

// Styled Card Media
export const StyledCardMedia = styled(CardMedia)({
  position: "relative",
  objectFit: "cover",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// Styled Typography
export const StyledTypography = styled(Typography)(({ theme }) => ({
  position: "absolute",
  height: "25%",
  width: "25%",
  backgroundColor: "rgba(181, 181, 181, 0.80)",
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "100%",
}));
