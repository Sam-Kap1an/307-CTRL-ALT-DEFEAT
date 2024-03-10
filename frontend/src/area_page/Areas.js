import React, { useState, useEffect, useCallback } from "react";
import {
  Flex,
  Text,
  Button,
  Input,
  Select,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import AreaCards from "./AreaCards.js";
import LogoutButton from "../components/Logout.js";
import AddNewArea from "./AddNewArea.js";
import { useParams, useNavigate } from "react-router-dom";

const Areas = () => {
  // need a header for the name of the location
  // need a search bar and add button similar to the inventory page
  // need a flexbox with cards for each area
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleAddNewClick = () => {
    onOpen();
  };
  const { location } = useParams();
  const [inventories, setInventories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        navigate("/login");
      }

      const response = await fetch(
        `https://sortify-backend.azurewebsites.net/categories?locationID=${location}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            // Include authentication headers if required
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const extractedData = data.map((item) => ({
        _id: item._id,
        Name: item.name,
      }));
      console.log(extractedData);
      setInventories(extractedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Handle error as needed
    }
  }, [setInventories, location, navigate]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Flex direction="column" width="900px">
      <Flex alignItems="center" justifyContent="space-between" mt="5">
        <Flex>
          <Text fontSize="40px" fontWeight="bold" color="#D47697" mr="3">
            Home
          </Text>
          <Text fontSize="40px" fontWeight="bold" color="#6e3652">
            Inventories
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
          <Flex key={item._id}>
            <AreaCards
              name={item.Name}
              lowItems={5}
              highItems={5}
              totalItems={5}
              details={"Add notes field"}
            />
          </Flex>
        ))}
      </Flex>

      <AddNewArea isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Areas;
