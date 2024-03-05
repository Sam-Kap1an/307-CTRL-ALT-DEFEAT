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
    useDisclosure, // Import useDisclosure to control the modal state
  } from "@chakra-ui/react";

  function BasePortal() {
    const navigate = useNavigate();
    const { isOpen: locIO, onOpen: LO, onClose: LC } = useDisclosure(); // Manage modal state
    const { isOpen: NIO, onOpen: NO, onClose: NC } = useDisclosure(); // Manage modal state
    let [NotesTxt, setNotes] = React.useState("");

    const [userEmail, setUserEmail] = useState("");
    const [locations, setLocations] = useState([]);

    const [newLocation, setNewLocation] = useState({
      name: "",
      categories: "",
    });

    const fetchUserEmail = useCallback(async () => {
      try {
        const authToken = localStorage.getItem("authToken");
    
        if (!authToken) {
          console.log("Authentication token not found");
          return;
        }
    
        const response = await fetch("http://localhost:8000/useremail", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
    
        if (response.status === 200) {
          const data = await response.json();
          setUserEmail(data.userEmail); // Set userEmail here
          console.log(`user email:${data.userEmail}`);
          return data.userEmail
        } else if (response.status === 401) {
          console.error("User is not logged in or token is expired");
          navigate("/login");
        } else {
          console.error("Error fetching user email:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    }, [navigate, setUserEmail]);
    
    
    const fetchLocation = useCallback(async () => {
      try {
        const userEmail = await fetchUserEmail();
        if (!userEmail) {
          console.log("User email not found");
          return;
        }
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.log("Authentication token not found");
          return;
        }
        const response = await fetch(`http://localhost:8000/location?email=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
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
    }, [navigate, setLocations, fetchUserEmail]);
    

    useEffect(() => {
      fetchLocation();
    }, [fetchLocation]);




  const handleAddNewLocation = () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }

      fetch(`http://localhost:8000/location?email=${userEmail}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLocation), // Make sure newLocation contains name and categories
      })
        .then((response) => response.json())
        .then((data) => {
            setNewLocation({
              name: "",
              categories: "", 
            });
            fetchLocation(); // Fetch locations again after adding a new location
            LC(); // Close the modal after adding a new location
        })
        .catch((error) => console.error("Error adding new location:", error));
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

    


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
