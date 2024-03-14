import React, { useState, useEffect, useCallback } from "react";
import {
  Flex,
  Text,
  Button,
  Input,
  Select,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import AreaCards from "./AreaCards.js";
import LogoutButton from "../components/Logout.js";
import AddNewArea from "./AddNewArea.js";
import { useParams, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

const Areas = () => {
  // need a header for the name of the location
  // need a search bar and add button similar to the inventory page
  // need a flexbox with cards for each area
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { location } = useParams();
  const [inventories, setInventories] = useState([]);
  const [locationName, setLocationName] = useState();
  const { onOpen: MenueOpen } = useDisclosure(); // Manage modal state

  const handleSortifyClick = () => {
    navigate("/");
  };

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

  const handleCategoryClick = (categoryId, categoryName) => {
    const url = `/categories/${location}/${categoryId}`;
    navigate(url, { state: { areaName: categoryName } });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("All");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filteredInventories = inventories
    .filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice()
    .sort((a, b) => {
      if (filterOption === "Alph") {
        return a.Name.localeCompare(b.Name);
      }

      return 0;
    });

  return (
    <Flex direction="column" width="900px" alignItems="center">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="5"
        width="full"
      >
        {/* Sortify logo */}
        <Box id="sortify-text" onClick={handleSortifyClick}>
          <Text fontSize="50px" fontWeight="bold" letterSpacing="10px">
            <span style={{ color: "#D47697" }}>SOR</span>
            <span style={{ color: "#6e3652" }}>TIFY</span>
          </Text>
        </Box>
        <Box width="350px" onClick={MenueOpen} />
        {/* Welcome user message and logout dropdown */}
        <Menu>
          <MenuButton
            as={Text}
            fontSize="30px"
            fontWeight="bold"
            cursor="pointer"
          >
            <span style={{ color: "#D47697" }}>{locationName} </span>
            <span style={{ color: "#6e3652" }}> Areas </span>
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Button
                colorScheme="teal"
                variant="outline"
                mr="3"
                onClick={handleBackClick}
              >
                Back
              </Button>
            </MenuItem>
            <MenuItem>
              <LogoutButton />
            </MenuItem>
          </MenuList>
        </Menu>
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
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Select
            placeholder="Filter"
            mr="3"
            value={filterOption}
            onChange={handleFilterChange}
          >
            <option value="Alph">A - Z</option>
            <option value="Quantity">Most - Least Items</option>
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
        alignItems="center"
        gap="15px"
        width="full"
        maxHeight="calc(100vh - 200px)"
        overflow="scroll"
        pb="5"
      >
        {filteredInventories.map((item) => (
          <Flex key={item._id}>
            <AreaCards
              name={item.Name}
              id={item._id}
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
