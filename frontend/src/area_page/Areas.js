import React from "react";
import {
  Flex,
  Text,
  Button,
  Input,
  Select,
  Box,
  useDisclosure,
  Modal,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import AreaCards from "./AreaCards";
import LogoutButton from "../components/Logout.js";

const Areas = () => {
  // need a header for the name of the location
  // need a search bar and add button similar to the inventory page
  // need a flexbox with cards for each area
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleAddNewClick = () => {
    onOpen();
  };

  const inventories = [
    {
      inventory: "Kitchen",
      numLow: 5,
      numHigh: 3,
      totalItems: 4,
      details: "Main kitchen space.",
    },
    {
      inventory: "Garage",
      numLow: 2,
      numHigh: 0,
      totalItems: 2,
      details: "Two car garage.",
    },
    {
      inventory: "Bathroom",
      numLow: 5,
      numHigh: 13,
      totalItems: 18,
      details: "Upstairs bathroom 2 sinks.",
    },
    {
      inventory: "Backyard",
      numLow: 5,
      numHigh: 13,
      totalItems: 18,
      details: "350 sq ft",
    },
  ];
  return (
    <Flex direction="column">
      <Flex alignItems="center" justifyContent="space-between" mt="5">
        <Flex>
          <Text fontSize="40px" fontWeight="bold" color="#D47697" mr="3">
            Home
          </Text>
          <Text fontSize="40px" fontWeight="bold" color="#6e3652">
            Areas
          </Text>
        </Flex>
        <Flex>
          <Button colorScheme="teal" variant="outline" mr="3">
            Back
          </Button>
          <LogoutButton />
        </Flex>
      </Flex>

      <Box className="inventory-container" p="6">
        <Flex mt="2" mb="2" className="search-filter-buttons" direction="row">
          <Input
            type="text"
            placeholder="Search Areas"
            className="search-input"
            mr="3"
          />
          <Select placeholder="Filter" mr="3">
            <option value="All">All</option>
            <option value="Low">A - Z</option>
            <option value="High">Most - Least Items</option>
          </Select>
          <Box className="blue-buttons">
            <Button
              backgroundColor="darkBlue"
              color="white"
              onClick={handleAddNewClick}
            >
              Add New
            </Button>
          </Box>
        </Flex>
      </Box>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        gap="4"
      >
        {inventories.map((item) => (
          <button>
            <AreaCards
              name={item.inventory}
              lowItems={item.numLow}
              highItems={item.numHigh}
              totalItems={item.totalItems}
              details={item.details}
            />
          </button>
        ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalBody>
            <Input type="text" placeholder="Area Name" mb={4} />

            <Input type="text" placeholder="Description" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button backgroundColor="darkBlue" color="white">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Areas;
