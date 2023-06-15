import React, { useContext } from "react";

export const AttemptJoinRoom = (roomName, privacy) => {
  if (!privacy) {
    return true;
  } else {
    return false;
  }
};
