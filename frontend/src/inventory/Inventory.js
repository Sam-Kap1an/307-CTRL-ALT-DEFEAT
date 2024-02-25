// Inventory.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useDisclosure, // Import useDisclosure to control the modal state
} from '@chakra-ui/react';

function Inventory() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Manage modal state

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSortifyClick = () => {
    navigate('/');
  };

  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    description: '',
    minimumThreshold: '',
  });

  const [inventory, setInventory] = useState([]);
  const [editedItemId, setEditedItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('All');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = () => {
    fetch('http://localhost:8000/inventory')
      .then((response) => response.json())
      .then((data) => setInventory(data))
      .catch((error) => console.error('Error fetching inventory:', error));
  };

  const handleAddNewClick = () => {
    onOpen(); // Open the modal when Add New button is clicked
  };

  const handleAddNewProduct = () => {
    fetch('http://localhost:8000/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setInventory([...inventory, data]);
        setNewProduct({ name: '', quantity: '', description: '', minimumThreshold: '' });
        onClose(); // Close the modal after adding a new product
      })
      .catch((error) => console.error('Error adding new product:', error));
  };

  const handleDeleteClick = (itemId) => {
    fetch(`http://localhost:8000/inventory/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchInventory();
        } else {
          console.error('Error deleting item');
        }
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleEditClick = (itemId) => {
    setEditedItemId(itemId);
  };

  const handleSaveEdit = (itemId) => {
    const editedData = {
      name: document.getElementById(`name-${itemId}`).value,
      quantity: document.getElementById(`quantity-${itemId}`).value,
      description: document.getElementById(`description-${itemId}`).value,
      minimumThreshold: document.getElementById(`minimumThreshold-${itemId}`).value,
    };

    fetch(`http://localhost:8000/inventory/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then(() => {
        console.log('Item updated successfully');
        setInventory((prevInventory) => {
          const updatedInventory = prevInventory.map((item) =>
            item._id === itemId ? { ...item, ...editedData } : item
          );
          return updatedInventory;
        });
      })
      .catch((error) => console.error('Error updating item:', error))
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

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="inventory-container">
      <Box id="sortify-text" onClick={handleSortifyClick}>
        {/* Your sortify text here */}
      </Box>

      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Inventory
        </Text>
        <Button onClick={handleBackClick} colorScheme="teal" variant="outline">
          Back
        </Button>
      </Box>

      <Box className="search-filter-buttons">
        <Input
          type="text"
          placeholder="Search Product"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          
          className="filter-input"
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="High">High</option>
        </Select>

        <Box className="blue-buttons">
          {/* Change the Add New button to open the modal */}
          <Button onClick={handleAddNewClick} colorScheme="blue">
            Add New
          </Button>
        </Box>
      </Box>

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
                  parseFloat(item.minimumThreshold) > parseFloat(item.quantity)
                    ? 'rgba(255, 0, 0, 0.1)' // Red with transparency
                    : 'rgba(0, 255, 0, 0.1)', // Green with transparency
              }}
              display={
                filterOption === 'All' ||
                (filterOption === 'Low' &&
                  parseFloat(item.minimumThreshold) > parseFloat(item.quantity)) ||
                (filterOption === 'High' &&
                  parseFloat(item.minimumThreshold) <= parseFloat(item.quantity))
                  ? 'table-row'
                  : 'none'
              }
            >
              <Td>
                {editedItemId === item._id ? (
                  <Input
                    type="text"
                    id={`name-${item._id}`}
                    value={item.name}
                    onChange={(e) => handleInputChange(e, item._id, 'name')}
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
                    onChange={(e) => handleInputChange(e, item._id, 'quantity')}
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
                    onChange={(e) => handleInputChange(e, item._id, 'description')}
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
                    onChange={(e) => handleInputChange(e, item._id, 'minimumThreshold')}
                  />
                ) : (
                  item.minimumThreshold
                )}
              </Td>
              <Td>
                {editedItemId === item._id ? (
                  <Button onClick={() => handleSaveEdit(item._id)} colorScheme="teal">
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => handleEditClick(item._id)} colorScheme="teal">
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

      {/* Modal for adding a new product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Minimum Threshold"
              value={newProduct.minimumThreshold}
              onChange={(e) => setNewProduct({ ...newProduct, minimumThreshold: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleAddNewProduct}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Inventory;







