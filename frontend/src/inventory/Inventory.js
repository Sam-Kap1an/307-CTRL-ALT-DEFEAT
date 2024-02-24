// Inventory.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inventory.css';

function Inventory() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Navigate back to the previous page
    navigate('/');
  };

  const handleSortifyClick = () => {
    // Navigate to the home page
    navigate('/');
  };

  const handleEditStockClick = () => {
    console.log("Edit Stock");
    // Add logic for handling "Edit Stock" button click
  };

  const [newProduct, setNewProduct] = useState({
    product: '',
    category: '',
    stock: '',
  });

  const [inventory, setInventory] = useState([
    // Sample initial inventory data, you can replace it with your data
    { id: 1, product: 'Laptop', category: 'Electronics', stock: 10 },
    { id: 2, product: 'T-Shirt', category: 'Clothing', stock: 20 },
    // Add more items as needed
  ]);

  const handleAddNewClick = () => {
    console.log("Add New");
    // Add logic for handling "Add New" button click
    // For now, let's update the inventory state with the new product
    setInventory([...inventory, { id: inventory.length + 1, ...newProduct }]);
    // Reset the newProduct state for the next entry
    setNewProduct({ product: '', category: '', stock: '' });
  };

  return (
    <div className="inventory-container">
      <div id="sortify-text" onClick={handleSortifyClick}>
        {/* Your sortify text here */}
      </div>

      {/* Header with back button */}
      <header>
        <div className="title">Inventory</div>
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      </header>

      {/* Search, Filter, and Action buttons */}
      <section className="search-filter-buttons">
        <div className="search-box">
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        <div className="filter-box">
          <input type="text" placeholder="Filter" className="filter-input" />
        </div>

        <button className="blue-button" onClick={handleEditStockClick}>
          Edit Stock
        </button>

        {/* Add New button with input fields */}
        <div className="blue-buttons">
          <input
            type="text"
            placeholder="Product"
            value={newProduct.product}
            onChange={(e) => setNewProduct({ ...newProduct, product: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          />
          <button className="blue-button" onClick={handleAddNewClick}>
            Add New
          </button>
        </div>
      </section>

      {/* Table to display inventory */}
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.category}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;



  








