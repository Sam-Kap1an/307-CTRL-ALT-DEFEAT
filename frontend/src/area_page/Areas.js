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

  const { location } = useParams();
  const [inventories, setInventories] = useState([]);
  const [locationName, setLocationName] = useState();

  const handleAddNewClick = () => {
    onOpen();
  };

  const handleBackClick = () => {
    navigate("/location");
  };

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
        const locationSelect = locations.find((loc) => loc._id === location); // Assuming locationId is available
        if (location) {
          setLocationName(locationSelect.name);
        } else {
          console.error("Location not found with _id:", location);
        }
      } else if (response.status === 401) {
        console.error("User is not logged in or token is expired");
        navigate("/login");
      } else {
        console.error("Error fetching Location:", response.status);
      }
    } catch (error) {
      console.error("Error Fetching Location:", error);
    }
  }, [navigate, setLocationName, location]);

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
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const extractedData = data.map((item) => ({
        _id: item._id,
        Name: item.name,
        Notes: item.notes,
      }));
      console.log(extractedData);
      setInventories(extractedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Handle error as needed
    }
  }, [setInventories, location, navigate]);

  const handleAddNewCat = async (newCat) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        navigate("/login");
      }

      const response = await fetch(
        `https://sortify-backend.azurewebsites.net/categories?locationID=${location}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",

            // Include authentication headers if required
          },
          body: JSON.stringify(newCat),
        },
      );
      if (response.status === 201) {
        const createdCategory = await response.json();
        // Assuming response returns the newly created category object
        console.log("New category added:", createdCategory);
        setInventories((prevState) => [
          ...prevState,
          {
            _id: createdCategory._id,
            Name: createdCategory.name,
            Notes: createdCategory.notes,
          },
        ]);
        // You may want to update state or refetch data to reflect the changes
      } else {
        console.error("Failed to add new category:", response.status);
      }
    } catch (error) {
      console.error("Error adding Inventory:", error);
    }
  };

  const handleDelete = (itemId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }
      fetch(`https://sortify-backend.azurewebsites.net/category/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            fetchCategories();
          } else {
            console.error("Error deleting area");
          }
        })
        .catch((error) => console.error("Error deleting area:", error));
    } catch (error) {
      console.error("Error deleting area:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchCategories();
  }, [fetchCategories, fetchLocation]);

  // new testing
  const handleCategoryClick = (categoryId, categoryName) => {
    // Construct the URL by combining the location ID and category ID

    const url = `/categories/${location}/${categoryId}`;
    navigate(url, { state: { areaName: categoryName } });

    // navigate(url);
  };

  return (
    <Flex direction="column" width="900px" alignItems="center">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="5"
        width="full"
      >
        <Flex>
          <Text fontSize="40px" fontWeight="bold" color="#D47697" mr="3">
            {locationName}
          </Text>
          <Text fontSize="40px" fontWeight="bold" color="#6e3652">
            Areas
          </Text>
        </Flex>
        <Flex>
          <Button
            colorScheme="teal"
            variant="outline"
            mr="3"
            onClick={handleBackClick}
          >
            Back
          </Button>
          <LogoutButton />
        </Flex>
      </Flex>

      <Box className="inventory-container" p="6" width="full">
        <Flex
          mt="2"
          mb="2"
          className="search-filter-buttons"
          direction="row"
          width="full"
        >
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
      <Flex flexWrap="wrap" alignItems="center" gap="15px" width="full">
        {inventories.map((item) => (
          <Flex key={item._id}>
            <AreaCards
              name={item.Name}
              id={item._id}
              lowItems={5}
              highItems={5}
              totalItems={5}
              details={item.Notes}
              onClick={() => handleCategoryClick(item._id, item.Name)}
              onDelete={() => handleDelete(item._id)}
            />
          </Flex>
        ))}
      </Flex>

      <AddNewArea
        isOpen={isOpen}
        onClose={onClose}
        onAddArea={handleAddNewCat}
      />
    </Flex>
  );
};

export default Areas;
