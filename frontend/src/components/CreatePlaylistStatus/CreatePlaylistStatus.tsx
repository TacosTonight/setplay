import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreatePlaylistStatus = () => {
  const isSuccess = useSelector(
    (state: RootState) => state.playlistManagement.status.isSuccess
  );
  const isError = useSelector(
    (state: RootState) => state.playlistManagement.status.isError
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      setOpen(true);
    }
  }, [isError, isSuccess]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const renderSnackbar = () => {
    if (isSuccess) {
      return (
        <Snackbar
          disableWindowBlurListener
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Spotify Playlist Created
          </Alert>
        </Snackbar>
      );
    }

    if (isError) {
      return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Spotify Playlist Not Created
          </Alert>
        </Snackbar>
      );
    }
  };

  return renderSnackbar();
};

export default CreatePlaylistStatus;
