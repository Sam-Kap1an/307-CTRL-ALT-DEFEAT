// base_portal.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Textarea,
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Tr,
  Td,
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
  const { isOpen: locIO, onOpen: LO, onClose: LC} = useDisclosure(); // Manage modal state
  const { isOpen: NIO, onOpen: NO, onClose:NC } = useDisclosure(); // Manage modal state
  const locations = [
    { name: "Location1", components: "componentId1"},
    { name: "Location2", components: "componentId2"},
    { name: "Location3", components: "componentId3"},
    { name: "Location3", components: "componentId3"},
    { name: "Location3", components: "componentId3"},
    { name: "Location3", components: "componentId3"},
    { name: "Location3", components: "componentId3"},
    // Add more locations as needed
  ];

  const handleSortifyClick = () => {
    navigate('/');
  };

  const handleLocationClick = (components) => {
    navigate(`/${components}`); 
  };

  let handlesetNotesInputChange = (e) => {
    let inputValue = e.target.value
    setNotes(inputValue)
  }

  useEffect(() => {
    setLocation(locations);
  }, []);

  const [newLocation, setNewLocation] = useState({
    name: '',
    catagories: '',
  });

  const [location, setLocation] = useState([]);
  let [NotesTxt, setNotes] = React.useState('')


  const handleAddNewLocation = () => {
    // Simulate adding a new location
    const generatedId = `componentId${location.length + 1}`; // Generate componentId
    const newLocationData = { ...newLocation, components: generatedId }; // Assign generatedId to newLocation
    setLocation([...location, newLocationData]); // Add new location to the array
    setNewLocation({ name: '', catagories: '' }); // Reset newLocation state
    LC(); // Close the modal after adding a new location
  };

  return (
    <Box className="Location-container">
      <Box id="sortify-text" onClick={handleSortifyClick}>
        <Text fontSize="90px" fontWeight="bold" letterSpacing="20px">
            <span style={{ color: "#D47697" }}>SOR</span>
            <span style={{ color: "#6e3652" }}>TIFY</span>
          </Text>
      </Box>

      <Flex borderRadius ='10' mt='2' mb='3'align="center" justify="center" backgroundColor='#6e3652' onClick={LO}>
        <Text mt='2' mb='2' fontSize="20px">
            <span style={{ color: "white" }}>Add Group</span>
          </Text>        
      </Flex>
      
      {/* Modal for adding a new product */}
      <Modal isOpen={locIO} onClose={LC}>
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
            <Button colorScheme="pink" onClick={handleAddNewLocation}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex display="grid" gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={2}>
        {location.map((item) => (
          <Flex 
            align="center" 
            justify="center"
            key={item._id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            onClick={() => handleLocationClick(item.components)}
            cursor="pointer"
            backgroundColor="#EDC7B7"
          >
              <Flex fontWeight="bold" align="center" justify="center"  >
                <span style={{ color: 'White' }}>{item.name}</span>
              </Flex>
          </Flex>
        ))}
      </Flex>
      <Box borderRadius ='10' backgroundColor="#EDC7B7" onClick={NO}>
        <Text ml='2' mt='3' fontSize="2xl" fontWeight="bold">
          <span style={{ color: 'White' }}>Notes:</span>        
          </Text>
        <Text  ml='2' fontSize="2xl">
        <span style={{ color: 'White' }}>{NotesTxt}</span>
        </Text>
          <Modal isOpen={NIO} onClose={NC}>
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
              </ModalFooter>
            </ModalContent>
          </Modal>

      </Box>


      
    </Box>
  );
}

export default Base_portal;







