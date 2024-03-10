import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Text,
  Select,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import LogoutButton from "../components/Logout.js";
import AddNewProductModal from "./AddNewProductModal.js";
import ProductTable from "./ProductTable.js";
import BackButton from "./BackButton.js";

function Inventory() {
  const navigate = useNavigate();
  const { onClose } = useDisclosure();

  const handleSortifyClick = () => {
    navigate("/");
  };

  const [setNewProduct] = useState({
    name: "",
    quantity: "",
    description: "",
    minimumThreshold: "",
  });

  const [inventory, setInventory] = useState([]);
  const [editedItemId, setEditedItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const [userEmail, setUserEmail] = useState("");
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

  const handleAddNewClick = () => {
    setIsAddNewModalOpen(true);
  };

  const fetchInventory = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        navigate("/login");
      }

      const response = await fetch(
        "https://sortify-backend.azurewebsites.net/inventory",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const data = await response.json();
        setInventory(data.inventory);
        setUserEmail(data.userEmail);
        console.log(userEmail);
      } else if (response.status === 401) {
        console.error("User is not logged in or token is expired");
        navigate("/login");
      } else {
        console.error("Error fetching inventory:", response.status);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  }, [navigate, setInventory, userEmail]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleAddNewProduct = (newProduct) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }

      fetch("https://sortify-backend.azurewebsites.net/inventory", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data._id) {
            setInventory((prevInventory) => {
              const newArray = Array.isArray(prevInventory)
                ? prevInventory
                : [];
              return [...newArray, data];
            });
            setNewProduct({
              name: "",
              quantity: "",
              description: "",
              minimumThreshold: "",
            });
            onClose();
          } else {
            console.error(
              "Error adding new product: Invalid response format",
              data,
            );
          }
        })
        .catch((error) => console.error("Error adding new product:", error));
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };

  const handleDeleteClick = (itemId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }
      fetch(`https://sortify-backend.azurewebsites.net/inventory/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            fetchInventory();
          } else {
            console.error("Error deleting item");
          }
        })
        .catch((error) => console.error("Error deleting item:", error));
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  const handleEditClick = (itemId) => {
    setEditedItemId(itemId);
  };

  const handleSaveEdit = (itemId) => {
    const editedData = {
      name: document.getElementById(`name-${itemId}`).value,
      quantity: document.getElementById(`quantity-${itemId}`).value,
      description: document.getElementById(`description-${itemId}`).value,
      minimumThreshold: document.getElementById(`minimumThreshold-${itemId}`)
        .value,
    };
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }

      fetch(`https://sortify-backend.azurewebsites.net/inventory/${itemId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      })
        .then((response) => response.json())
        .then(() => {
          console.log("Item updated successfully");
          setInventory((prevInventory) => {
            const updatedInventory = prevInventory.map((item) =>
              item._id === itemId ? { ...item, ...editedData } : item,
            );
            return updatedInventory;
          });
        })
        .catch((error) => console.error("Error updating item:", error))
        .finally(() => {
          setEditedItemId(null);
        });
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  const handleInputChange = (e, itemId, field) => {
    const updatedInventory = inventory.map((item) =>
      item._id === itemId ? { ...item, [field]: e.target.value } : item,
    );
    setInventory(updatedInventory);
  };

  const filteredInventory = (inventory ?? []).filter((item) => {
    const nameIncludesSearchTerm = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filterOption === "All") {
      return nameIncludesSearchTerm;
    } else if (filterOption === "Low") {
      return (
        nameIncludesSearchTerm &&
        parseFloat(item.minimumThreshold) > parseFloat(item.quantity)
      );
    } else if (filterOption === "High") {
      return (
        nameIncludesSearchTerm &&
        parseFloat(item.minimumThreshold) <= parseFloat(item.quantity)
      );
    }

    return false;
  });

  return (
    <>
      <Flex
        mt="5"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleSortifyClick}
      >
        <Flex>
          <Text fontSize="40px" fontWeight="bold" color="#D47697" mr="3">
            Kitchen
          </Text>
          <Text fontSize="40px" fontWeight="bold" color="#6e3652">
            Inventory
          </Text>
        </Flex>
        <Flex>
          <BackButton />
          <LogoutButton />
        </Flex>
      </Flex>
      <Box className="inventory-container" p="6">
        <Flex direction="row" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            Inventory
          </Text>
        </Flex>

        <Flex mt="2" mb="2" className="search-filter-buttons" direction="row">
          <Input
            type="text"
            placeholder="Search Product"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr="3"
          />

          <Select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="filter-input"
            mr="3"
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
          </Select>

          <Box className="blue-buttons">
            <Button
              onClick={handleAddNewClick}
              backgroundColor="darkBlue"
              color="white"
            >
              Add New
            </Button>
          </Box>
        </Flex>

        <ProductTable
          filteredInventory={filteredInventory}
          editedItemId={editedItemId}
          handleEditClick={handleEditClick}
          handleSaveEdit={handleSaveEdit}
          handleDeleteClick={handleDeleteClick}
          handleInputChange={handleInputChange}
        />

        <AddNewProductModal
          isOpen={isAddNewModalOpen}
          onClose={() => setIsAddNewModalOpen(false)}
          onAddNewProduct={handleAddNewProduct}
        />
      </Box>
    </>
  );
}

export default Inventory;
