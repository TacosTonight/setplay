import React from "react";
import { Typography, Container, Box } from "@mui/material";

const WelcomeScreen = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Setplay
        </Typography>
        <Typography variant="body1" align="center">
          Please search for an artist to get their latest setlist.
        </Typography>
      </Box>
    </Container>
  );
};

export default WelcomeScreen;
