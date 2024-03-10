import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from "@chakra-ui/react";

const AddNewArea = ({ isOpen, onClose, onAddArea }) => {
  const [newArea, setNewArea] = useState({
    name: "",
    notes: "",
  });

  const handleInputChange = (field, value) => {
    setNewArea({ ...newArea, [field]: value });
  };

  const handleAddClick = () => {
    onAddArea(newArea);
    setNewArea({ name: "", notes: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Area Name"
            value={newArea.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            mb={4}
          />
          <Input
            type="text"
            placeholder="Description"
            value={newArea.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            backgroundColor="darkBlue"
            color="white"
            onClick={handleAddClick}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewArea;
