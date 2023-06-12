import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const ChangeUsername = ({ open, close }) => {
  return (
    <Box>
      <Modal open={open} onClose={close}>
        <Box
          sx={{
            width: "50vw",
            height: "20vh",
            border: "1px solid white",
          }}
        >
          <button onClick={close}>Close</button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>Hello</Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangeUsername;
