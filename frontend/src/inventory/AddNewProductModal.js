import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Button, Input, Flex } from "@chakra-ui/react";

const AddNewProductModal = ({ isOpen, onClose, onAddNewProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    description: "",
    minimumThreshold: "",
  });

  const handleInputChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleAddClick = () => {
    onAddNewProduct(newProduct);
    setNewProduct({
      name: "",
      quantity: "",
      description: "",
      minimumThreshold: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Flex mt="3" mb="3">
            <Input
              mr="3"
              type="text"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Minimum Threshold"
              value={newProduct.minimumThreshold}
              onChange={(e) => handleInputChange("minimumThreshold", e.target.value)}
            />
          </Flex>
          <Input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button backgroundColor="darkBlue" color="white" onClick={handleAddClick}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewProductModal;
