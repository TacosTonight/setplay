import React, { useState } from "react";
import { Modal, Box, Tabs, Tab, Typography, Button } from "@mui/material";
import CreateNew from "../CreateNew";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "70vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  maxHeight: "70vh",
  boxShadow: 24,
  p: 4,
};

type PlaylistManagementModalProps = {
  open: boolean;
  onClose: () => void;
};

const PlaylistManagementModal: React.FC<PlaylistManagementModalProps> = ({
  open,
  onClose,
}) => {
  const [tab, setTab] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="Create New Playlist" />
          <Tab label="or" disabled />
          <Tab label="Add to Existing Playlist" />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <CreateNew />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Typography>Existing Playlists Here</Typography>
        </TabPanel>
        <Box
          sx={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button variant="contained">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PlaylistManagementModal;
