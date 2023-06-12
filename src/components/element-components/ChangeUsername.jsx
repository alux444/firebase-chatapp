import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const ChangeUsername = ({ open, close }) => {
  return (
    <Box>
      <Modal open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            border: "1px solid red",
          }}
        >
          <Box
            sx={{
              width: "50vw",
              height: "20vh",
              border: "1px solid white",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "block" }}>
              <button style={{ margin: "10px" }} onClick={close}>
                Close
              </button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>Hello</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChangeUsername;
