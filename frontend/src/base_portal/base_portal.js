// base_portal.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
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
  const { onOpen: UserOpen } = useDisclosure(); // Manage modal state
  const {
    isOpen: LocationDelete,
    onOpen: LocationDeleteOpen,
    onClose: LocationDeleteClose,
  } = useDisclosure(); // Manage modal state

  const [selectedLocationId, setSelectedLocationId] = useState(null); // State for selected location ID

  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    categories: "",
  });
  const [loading, setLoading] = useState(true);

  const handleSortifyClick = () => {
    navigate("/");
  };

  const handleLocationClick = (ID) => {
    navigate(`/categories/${ID}`);
    //navigate(`/categories?${ID}`);
  };

  const [location] = useState({});
  const [username, setUsername] = useState("");

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
    } finally {
      setLoading(false); // Set loading to false when the fetch completes
    }
  }, [navigate, setLocations, setLoading]);

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
          setLocations([...locations, data]);
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
            <MenuItem>
              <LogoutButton />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

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
      {loading ? (
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
      ) : locations.length > 0 ? (
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
                onClick={() => handleLocationClick(item._id)}
                cursor="pointer"
                backgroundColor={"#EDC7B7"}
                height="150px"
                position="relative" // Add this to make the position absolute relative to the parent
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent location click when trash icon is clicked
                    LocationDeleteOpen();
                    setSelectedLocationId(item._id);
                  }}
                  size="sm"
                  position="absolute"
                  top="2"
                  right="2" // Adjusted left position
                  variant="outline"
                  borderColor="white"
                >
                  🗑️
                </Button>
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
              No locations available.
            </Text>
          </Box>
        </Box>
      )}
      {/*new footer*/}
    </Box>
  );
}

export default BasePortal;
