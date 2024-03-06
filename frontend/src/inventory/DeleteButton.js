// DeleteButton.js
import React from "react";
import { Button } from "@chakra-ui/react";

const DeleteButton = ({ onDeleteClick, itemId }) => {
  return (
    <Button onClick={() => onDeleteClick(itemId)} colorScheme="red" variant="outline">
      🗑️
    </Button>
  );
};

export default DeleteButton;
