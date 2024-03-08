// BackButton.js
import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/areas");
  };

  return (
    <Button
      onClick={handleBackClick}
      colorScheme="teal"
      variant="outline"
      mr="3"
    >
      Back
    </Button>
  );
};

export default BackButton;
