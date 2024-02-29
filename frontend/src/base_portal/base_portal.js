// base_portal.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Textarea,
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
  const [category, setCatagory] = useState([]);
  let [NotesTxt, setNotes] = React.useState('')

  let handlesetNotesInputChange = (e) => {
    let inputValue = e.target.value
    setNotes(inputValue)
  }

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    fetch('http://localhost:8000/location')
      .then((response) => response.json())
      .then((data) => setLocation(data))
      .catch((error) => console.error('Error fetching location:', error));
  };

  const fetchCategory = (Catagory) => {
    fetch(`http://localhost:8000/catagory/${Catagory}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
    .then((response) => response.json())
    .then((data) => setCatagory(data))
    .catch((error) => console.error('Error fetching Catagory:', error));
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
        setNewLocation({ name: '', catagories: fetchCategory('') });
        onClose(); // Close the modal after adding a new product
      })
      .catch((error) => console.error('Error adding new product:', error));
  };

  
  return (
    <Box className="Location-container">
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
              placeholder="Location Name"
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
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="pink" onClick={handleAddNewLoction}>
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

      <Box onClick={handleAddNewClick}>
        <Text fontSize="2xl" fontWeight="bold">
          Notes: {NotesTxt}
        </Text>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Location</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <>
                <Textarea
                  value={NotesTxt}
                  onChange={handlesetNotesInputChange}
                  placeholder='Put user Notes Here'
                  size='sm'
                />
              </>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="pink" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

      </Box>


      
    </Box>
  );
}

export default Base_portal;







