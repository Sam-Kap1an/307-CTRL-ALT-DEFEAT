// Inventory.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inventory.css';

function Inventory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    description: '',
  });
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, [searchTerm]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSortifyClick = () => {
    navigate('/');
  };

  const handleEditStockClick = () => {
    console.log('Edit Stock');
    // Add logic for handling "Edit Stock" button click
  };

  const fetchInventory = () => {
    fetch(`http://localhost:8000/inventory?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setInventory(data))
      .catch((error) => console.error('Error fetching inventory:', error));
  };

  const handleAddNewClick = () => {
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
        setNewProduct({ name: '', quantity: '', description: '' });
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

  return (
    <div className="inventory-container">
      <div id="sortify-text" onClick={handleSortifyClick}>
        {/* Your sortify text here */}
      </div>

      <header>
        <div className="title">Inventory</div>
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      </header>

      <section className="search-filter-buttons">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Product"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchInventory();
              }
            }}
          />
        </div>

        <div className="filter-box">
          <input type="text" placeholder="Filter" className="filter-input" />
        </div>

        <button className="blue-button" onClick={handleEditStockClick}>
          Edit Stock
        </button>

        <div className="blue-buttons">
          <input
            type="text"
            placeholder="Product"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button className="blue-button" onClick={handleAddNewClick}>
            Add New
          </button>
        </div>
      </section>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Description</th>
            <th className="delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td className="delete-column">
                <button className="delete-button" onClick={() => handleDeleteClick(item._id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;




  








