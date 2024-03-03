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

  const handleAddNewLoction = () => {
    fetch("http://localhost:8000/location", {
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
        <Button onClick={LO} colorScheme="red" variant="outline">
          <Text fontSize="20px">
            <span style={{ color: "#6e3652" }}>ADD Group</span>
          </Text>
        </Button>
      </Box>

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
            <Input
              type="text"
              placeholder="Catagories"
              value={newLocation.catagories}
              onChange={(e) =>
                setNewLocation({ ...newLocation, catagories: e.target.value })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={LC}>
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
            <Tr key={item._id}></Tr>
          ))}
        </Tbody>
      </Table>

      <Box backgroundColor="pink" onClick={NO}>
        <Text fontSize="2xl" fontWeight="bold">
          Notes:
        </Text>
        <Text fontSize="2xl">{NotesTxt}</Text>
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
              <Button colorScheme="pink" mr={3} onClick={NC}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}


export default BasePortal;
