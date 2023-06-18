import React, { useState, useRef, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";

const UploadImage = ({ open, close, setImage }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    setImage(file);

    close();
  };

  const removeImage = () => {
    setFile(null);
    setImage(null);
    close();
  };

  const onChangeImage = (e) => {
    setFile(e.target.files[0]);
  };

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
          }}
        >
          <Box
            ref={modalRef}
            sx={{
              width: "min-content",
              padding: "15px",
              height: "min-content",
              border: "1px solid white",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,0,0,0.8)",
            }}
          >
            <Box>
              <form
                onSubmit={onSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignContent: "center",
                }}
              >
                <input
                  type="file"
                  onChange={onChangeImage}
                  accept=".jpg,.jpeg,.png"
                />
                <button style={{ margin: "5px 0" }} type="submit">
                  OK
                </button>
                <button onClick={removeImage} type="button">
                  Remove image
                </button>
              </form>
            </Box>
            <Typography sx={{ textAlign: "center" }}>
              {uploading ? "Uploading file..." : null}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UploadImage;
