// base_portal.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Textarea,
  Box,
  Button,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure, // Import useDisclosure to control the modal state
} from "@chakra-ui/react";
import LogoutButton from "../components/Logout.js";
import { HamburgerIcon } from "@chakra-ui/icons";

function BasePortal() {
  const navigate = useNavigate();
  const { isOpen: locIO, onOpen: LO, onClose: LC } = useDisclosure(); // Manage modal state
  const { isOpen: NIO, onOpen: NO, onClose: NC } = useDisclosure(); // Manage modal state
  const { onOpen: UserOpen } = useDisclosure(); // Manage modal state
  const {
    isOpen: LocationDelete,
    onOpen: LocationDeleteOpen,
    onClose: LocationDeleteClose,
  } = useDisclosure(); // Manage modal state

  const [editMode, setEditMode] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null); // State for selected location ID

  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    categories: "",
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSortifyClick = () => {
    navigate("/");
  };

  const handleLocationClick = (ID) => {
    navigate(`/categories/${ID}`);
    //navigate(`/categories?${ID}`);
  };

  let handlesetNotesInputChange = (e) => {
    let inputValue = e.target.value;
    setNotes(inputValue);
  };

  const [location, setLocation] = useState([]);
  const [username, setUsername] = useState("");

  let [NotesTxt, setNotes] = React.useState("");

  const fetchUsername = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }
      const response = await fetch(
        `https://sortify-backend.azurewebsites.net/username`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        const username = await response.json();
        setUsername(username);
      } else if (response.status === 401) {
        console.error("User is not logged in or token is expired");
        navigate("/login");
      } else {
        console.error("Error fetching Location:", response.status);
      }
    } catch (error) {
      console.error("Error Fetching Location:", error);
    }
  }, [navigate, setUsername]);

  const fetchLocation = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }
      const response = await fetch(
        `https://sortify-backend.azurewebsites.net/location`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        const locations = await response.json();
        setLocations(locations);
      } else if (response.status === 401) {
        console.error("User is not logged in or token is expired");
        navigate("/login");
      } else {
        console.error("Error fetching Location:", response.status);
      }
    } catch (error) {
      console.error("Error Fetching Location:", error);
    }
  }, [navigate, setLocations]);

  useEffect(() => {
    fetchLocation();
    fetchUsername();
  }, [fetchLocation, fetchUsername, location, username]);

  const handleAddNewLocation = () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }
      fetch(`https://sortify-backend.azurewebsites.net/location`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLocation),
      })
        .then((response) => response.json())
        .then((data) => {
          setNewLocation({ name: "", catagories: "" });
          setLocation([...location, data]);
          LC(); // Close the modal after adding a new product
        })
        .catch((error) => console.error("Error adding new product:", error));
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const handleDeleteClick = (locationId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }
      fetch(
        `https://sortify-backend.azurewebsites.net/location/${locationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => {
          if (response.ok) {
            fetchLocation();
          } else {
            console.error("Error deleting location");
          }
        })
        .catch((error) => console.error("Error deleting location!:", error));
    } catch (error) {
      console.error("Error deleting location!!!:", error);
    }
  };

  return (
    <Box className="Location-container" width="1000px">
      <Flex justifyContent="space-between" alignItems="center">
        {/* Sortify logo */}
        <Box id="sortify-text" onClick={handleSortifyClick}>
          <Text fontSize="50px" fontWeight="bold" letterSpacing="10px">
            <span style={{ color: "#D47697" }}>SOR</span>
            <span style={{ color: "#6e3652" }}>TIFY</span>
          </Text>
        </Box>
        <Box width="350px" onClick={UserOpen} />
        {/* Welcome user message and logout dropdown */}
        <Menu>
          <MenuButton
            as={Text}
            fontSize="30px"
            fontWeight="bold"
            cursor="pointer"
          >
            <span style={{ color: "#D47697" }}>Welcome, </span>
            <span style={{ color: "#6e3652" }}>{username} </span>
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            {editMode ? (
              <MenuItem>
                <Button
                  backgroundColor="darkBlue"
                  color="white"
                  variant="outline"
                  onClick={toggleEditMode}
                >
                  Exit Edit Mode
                </Button>
              </MenuItem>
            ) : (
              <MenuItem>
                <Button
                  backgroundColor="darkBlue"
                  color="white"
                  variant="outline"
                  onClick={toggleEditMode}
                >
                  Edit Locations
                </Button>
              </MenuItem>
            )}
            <MenuItem>
              <LogoutButton />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {!editMode ? (
        <Flex
          borderRadius="10"
          mt="2"
          mb="3"
          align="center"
          justify="center"
          backgroundColor="#6e3652"
          onClick={LO}
        >
          <Text mt="2" mb="2" fontSize="20px">
            <span style={{ color: "white" }}>Add Group</span>
          </Text>
        </Flex>
      ) : (
        <Flex
          borderRadius="10"
          mt="2"
          mb="3"
          align="center"
          justify="center"
          backgroundColor="#D47697"
        >
          <Text mt="2" mb="2" fontSize="20px" fontWeight="bold">
            <span style={{ color: "white" }}>
              Click on Groups To Delete Them
            </span>
          </Text>
        </Flex>
      )}

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
                setNewLocation({
                  ...newLocation,
                  name: e.target.value,
                  categories: [],
                })
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
      {locations && locations.length > 0 ? (
        <Flex
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={2}
        >
          {locations.map((item) => (
            <React.Fragment key={item._id}>
              <Flex
                align="center"
                justify="center"
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                onClick={
                  editMode
                    ? () => {
                        LocationDeleteOpen();
                        setSelectedLocationId(item._id);
                      }
                    : () => handleLocationClick(item._id)
                }
                cursor="pointer"
                backgroundColor={!editMode ? "#EDC7B7" : "#6e3652"}
                height="150px"
              >
                <Flex
                  fontWeight="bold"
                  align="center"
                  justify="center"
                  fontSize="25px"
                >
                  <span style={{ color: "White" }}>{item.name}</span>
                </Flex>
              </Flex>
              <Modal
                isOpen={LocationDelete && selectedLocationId === item._id}
                onClose={LocationDeleteClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Confirm Deletion</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Are you sure you want to delete {item.name}?</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="red"
                      mr={3}
                      onClick={() => {
                        handleDeleteClick(item._id);
                        LocationDeleteClose();
                      }}
                    >
                      Yes
                    </Button>
                    <Button variant="ghost" onClick={LocationDeleteClose}>
                      No
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </React.Fragment>
          ))}
        </Flex>
      ) : (
        <Box justifyContent="center" alignItems="center">
          <Box
            align="center"
            justify="center"
            borderWidth="1px"
            borderRadius="lg"
            backgroundColor="#EDC7B7"
            p={4}
          >
            <Text color="white" fontWeight="bold">
              Loading Locations...
            </Text>

            <Spinner
              align="center"
              justify="center"
              mt={2}
              thickness="4px"
              speed="0.65s"
              emptyColor="#D47697"
              color="#6e3652"
              size="xl"
            />
          </Box>
        </Box>
      )}
      {editMode ? (
        <Flex
          borderRadius="10"
          mt="2"
          mb="3"
          align="center"
          justify="center"
          backgroundColor="#D47697"
          onClick={toggleEditMode}
        >
          <Text mt="2" mb="2" fontSize="20px" fontWeight="bold">
            <span style={{ color: "white" }}>Exit Edit Mode</span>
          </Text>
        </Flex>
      ) : (
        <Box borderRadius="10" backgroundColor="#EDC7B7" onClick={NO}>
          <Text ml="2" mt="3" fontSize="2xl" fontWeight="bold">
            <span style={{ color: "White" }}>Notes:</span>
          </Text>
          <Text ml="2" fontSize="2xl">
            <span style={{ color: "White" }}>{NotesTxt}</span>
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
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
}

export default BasePortal;
