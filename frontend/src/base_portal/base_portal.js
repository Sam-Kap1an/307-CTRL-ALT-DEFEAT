// base_portal.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, // Import useDisclosure to control the modal state
} from '@chakra-ui/react';

function Base_portal() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Manage modal state

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSortifyClick = () => {
    navigate('/');
  };

  const [newLocation, setNewLocation] = useState({
    name: '',
    catagories: '',
  });

  const [location, setLocation] = useState([]);
  const [editedItemId, setEditedItemId] = useState(null);


  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    fetch('http://localhost:8000/location')
      .then((response) => response.json())
      .then((data) => setLocation(data))
      .catch((error) => console.error('Error fetching location:', error));
  };

  const handleAddNewClick = () => {
    onOpen(); // Open the modal when Add New button is clicked
  };

  const handleAddNewLoction = () => {
    fetch('http://localhost:8000/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLocation),
    })
      .then((response) => response.json())
      .then((data) => {
        setLocation([...location, data]);
        setNewLocation({ name: '', catagories: '' });
        onClose(); // Close the modal after adding a new product
      })
      .catch((error) => console.error('Error adding new product:', error));
  };

  const handleDeleteClick = (itemId) => {
    fetch(`http://localhost:8000/inventory/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchInventory();
        } else {
          console.error('Error deleting item');
        }
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleEditClick = (itemId) => {
    setEditedItemId(itemId);
  };

  const handleSaveEdit = (itemId) => {
    const editedData = {
      name: document.getElementById(`name-${itemId}`).value,
      catagories: document.getElementById(`catagories-${itemId}`).value,
    };

    fetch(`http://localhost:8000/inventory/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Item updated successfully');
        setLocation((prevLocation) => {
          const updatedLocation = prevLocation.map((item) =>
            item._id === itemId ? { ...item, ...editedData } : item
          );
          return updatedLocation;
        });
      })
      .catch((error) => console.error('Error updating item:', error))
      .finally(() => {
        setEditedItemId(null);
      });
  };

  const handleInputChange = (e, itemId, field) => {
    const updatedLocation = location.map((item) =>
      item._id === itemId ? { ...item, [field]: e.target.value } : item
    );
    setLocation(updatedLocation);
  };


  return (
    <Box className="inventory-container">
      <Box id="sortify-text" onClick={handleSortifyClick}>
        {/* Your sortify text here */}
      </Box>

      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Inventory
        </Text>
        <Button onClick={handleAddNewClick} colorScheme="Red" variant="outline">
          Back
        </Button>
      </Box>
      
      {/* Modal for adding a new product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="Product Name"
              value={newLocation.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Minimum Threshold"
              value={newProduct.minimumThreshold}
              onChange={(e) => setNewProduct({ ...newProduct, minimumThreshold: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleAddNewProduct}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Table>
        <Thead>
          <Tr>
            {/*all of the groups*/}
          </Tr>
        </Thead>
        <Tbody>
          {location.map((item) => (
            <Tr
              key={item._id}
              display={
                filterOption === 'All' ||
                (filterOption === 'Low' &&
                  parseFloat(item.minimumThreshold) > parseFloat(item.quantity)) ||
                (filterOption === 'High' &&
                  parseFloat(item.minimumThreshold) <= parseFloat(item.quantity))
                  ? 'table-row'
                  : 'none'
              }
            >
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Base_portal;







