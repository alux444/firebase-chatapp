import React, { useRef, useEffect } from "react";
import { Modal, Box } from "@mui/material";

const PreviewImage = ({ open, close, image }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, close]);

  return (
    <Box>
      <Modal open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              width: "min-content",
              padding: "15px",
              height: "min-content",
              maxWidth: "90vw",
              maxHeight: "90vh",
              border: "1px solid white",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,0,0,0.8)",
              borderRadius: "20px",
            }}
          >
            <Box>
              <img
                src={image}
                style={{ maxWidth: "85vw", maxHeight: "85vh" }}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PreviewImage;
