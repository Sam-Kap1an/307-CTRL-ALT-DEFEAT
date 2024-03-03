import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

function Inventory() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSortifyClick = () => {
    navigate("/");
  };

  const [newProduct, setNewProduct] = useState({
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

  const fetchInventory = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("Authentication token not found");
        return;
      }

      const response = await fetch("http://localhost:8000/inventory", {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

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
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddNewClick = () => {
    onOpen();
  };

  const handleAddNewProduct = () => {
    fetch("http://localhost:8000/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setInventory([...inventory, data]);
        setNewProduct({
          name: "",
          quantity: "",
          description: "",
          minimumThreshold: "",
        });
        onClose();
      })
      .catch((error) => console.error("Error adding new product:", error));
  };

  const handleDeleteClick = (itemId) => {
    fetch(`http://localhost:8000/inventory/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchInventory();
        } else {
          console.error("Error deleting item");
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
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

    fetch(`http://localhost:8000/inventory/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Item updated successfully");
        setInventory((prevInventory) => {
          const updatedInventory = prevInventory.map((item) =>
            item._id === itemId ? { ...item, ...editedData } : item
          );
          return updatedInventory;
        });
      })
      .catch((error) => console.error("Error updating item:", error))
      .finally(() => {
        setEditedItemId(null);
      });
  };

  const handleInputChange = (e, itemId, field) => {
    const updatedInventory = inventory.map((item) =>
      item._id === itemId ? { ...item, [field]: e.target.value } : item
    );
    setInventory(updatedInventory);
  };

  const filteredInventory = (inventory ?? []).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Flex
        mt="5"
        ml="5"
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
        <Button onClick={handleBackClick} colorScheme="teal" variant="outline">
          Back
        </Button>
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

        <Table>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Description</Th>
              <Th>Minimum Threshold</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredInventory.map((item) => (
              <Tr
                key={item._id}
                style={{
                  backgroundColor:
                    parseFloat(item.minimumThreshold) >
                    parseFloat(item.quantity)
                      ? "rgba(255, 0, 0, 0.1)" // Red with transparency
                      : "rgba(0, 255, 0, 0.1)", // Green with transparency
                }}
                display={
                  filterOption === "All" ||
                  (filterOption === "Low" &&
                    parseFloat(item.minimumThreshold) >
                      parseFloat(item.quantity)) ||
                  (filterOption === "High" &&
                    parseFloat(item.minimumThreshold) <=
                      parseFloat(item.quantity))
                    ? "table-row"
                    : "none"
                }
              >
                <Td>
                  {editedItemId === item._id ? (
                    <Input
                      type="text"
                      id={`name-${item._id}`}
                      value={item.name}
                      onChange={(e) => handleInputChange(e, item._id, "name")}
                    />
                  ) : (
                    item.name
                  )}
                </Td>
                <Td>
                  {editedItemId === item._id ? (
                    <Input
                      type="text"
                      id={`quantity-${item._id}`}
                      value={item.quantity}
                      onChange={(e) =>
                        handleInputChange(e, item._id, "quantity")
                      }
                    />
                  ) : (
                    item.quantity
                  )}
                </Td>
                <Td>
                  {editedItemId === item._id ? (
                    <Input
                      type="text"
                      id={`description-${item._id}`}
                      value={item.description}
                      onChange={(e) =>
                        handleInputChange(e, item._id, "description")
                      }
                    />
                  ) : (
                    item.description
                  )}
                </Td>
                <Td>
                  {editedItemId === item._id ? (
                    <Input
                      type="text"
                      id={`minimumThreshold-${item._id}`}
                      value={item.minimumThreshold}
                      onChange={(e) =>
                        handleInputChange(e, item._id, "minimumThreshold")
                      }
                    />
                  ) : (
                    item.minimumThreshold
                  )}
                </Td>
                <Td>
                  {editedItemId === item._id ? (
                    <Button
                      onClick={() => handleSaveEdit(item._id)}
                      colorScheme="teal"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEditClick(item._id)}
                      colorScheme="teal"
                    >
                      Edit
                    </Button>
                  )}
                </Td>
                <Td>
                  <Button
                    onClick={() => handleDeleteClick(item._id)}
                    colorScheme="red"
                    variant="outline"
                  >
                    🗑️
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Product</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Flex mt="3" mb="3">
                <Input
                  mr="3"
                  type="text"
                  placeholder="Quantity"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                />
                <Input
                  type="text"
                  placeholder="Minimum Threshold"
                  value={newProduct.minimumThreshold}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      minimumThreshold: e.target.value,
                    })
                  }
                />
              </Flex>

              <Input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                backgroundColor="darkBlue"
                color="white"
                onClick={handleAddNewProduct}
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default Inventory;
