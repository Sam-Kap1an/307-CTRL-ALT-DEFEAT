// base_portal.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

function BasePortal() {
  const navigate = useNavigate();
  const { isOpen: locIO, onOpen: LO, onClose: LC } = useDisclosure(); // Manage modal state
  const { isOpen: NIO, onOpen: NO, onClose: NC } = useDisclosure(); // Manage modal state

  const handleSortifyClick = () => {
    navigate("/");
  };

  const handleLocationClick = (ID) => {
    navigate(`/${ID}`); 
  };

  let handlesetNotesInputChange = (e) => {
    let inputValue = e.target.value;
    setNotes(inputValue);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const [newLocation, setNewLocation] = useState({
    name: "",
    catagories: "",
  });

  const [location, setLocation] = useState([]);
  let [NotesTxt, setNotes] = React.useState("");

  const fetchLocation = () => {
    fetch("http://localhost:8000/location")
      .then((response) => response.json())
      .then((data) => setLocation(data))
      .catch((error) => console.error("Error fetching location:", error));
  };

  const handleAddNewLocation = () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }
    fetch(`http://localhost:8000/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    })
      .then((response) => response.json())
      .then((data) => {
        setLocation([...location, data]);
        setNewLocation({ name: "", catagories: "" });
        LC(); // Close the modal after adding a new product
      })
      .catch((error) => console.error("Error adding new product:", error));
    } catch (error) {
      console.error("Error adding location:", error);
    }
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
              onChange={(e) =>
                setNewLocation({ ...newLocation, name: e.target.value })
              }
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
        {locations && locations.length > 0 ? (
          locations.map((item) => (
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
          ))
        ) : (
          <Text>Loading locations...</Text>
        )}
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
                  placeholder="Put user Notes Here"
                  size="sm"
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

export default BasePortal;
