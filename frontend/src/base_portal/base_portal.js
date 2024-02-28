// base_portal.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Tr,
  Text,
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

  const handleSortifyClick = () => {
    navigate('/');
  };

  const [newLocation, setNewLocation] = useState({
    name: '',
    catagories: '',
  });

  const [location, setLocation] = useState([]);
  const [editedLocationId, setLocationId] = useState(null);


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

  const handleDeleteClick = (LocationId) => {
    fetch(`http://localhost:8000/location/${LocationId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchLocation();
        } else {
          console.error('Error deleting item');
        }
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleEditClick = (LocationId) => {
    setLocationId(LocationId);
  };

  const handleSaveEdit = (LocationId) => {
    const editedData = {
      name: document.getElementById(`name-${LocationId}`).value,
      catagories: document.getElementById(`catagories-${LocationId}`).value,
    };

    const handleInputChange = (e, LocationId, field) => {
      const updatedLocation = location.map((item) =>
        item._id === LocationId ? { ...item, [field]: e.target.value } : item
      );
      setLocation(updatedLocation);
    };
  

    
    fetch(`http://localhost:8000/location/${LocationId}`, {
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
            item._id === LocationId ? { ...item, ...editedData } : item
          );
          return updatedLocation;
        });
      })
      .catch((error) => console.error('Error updating item:', error))
      .finally(() => {
        setLocationId(null);
      });
  };

  
  return (
    <Box className="inventory-container">
      <Box id="sortify-text" onClick={handleSortifyClick}>
        <Text fontSize="90px" fontWeight="bold" letterSpacing="20px">
            <span style={{ color: "#D47697" }}>SOR</span>
            <span style={{ color: "#6e3652" }}>TIFY</span>
          </Text>
      </Box>

      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Groups
        </Text>
        <Button onClick={handleAddNewClick} colorScheme="red" variant="outline">
        <Text fontSize="20px">
            <span style={{ color: "#6e3652" }}>ADD Group</span>
          </Text>        
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
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Catagories"
              value={newLocation.catagories}
              onChange={(e) => setNewLocation({ ...newLocation, catagories: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleAddNewLoction}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Table>
        <Tbody>
          {location.map((item) => (
            <Tr
              key={item._id}
            >
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Base_portal;







