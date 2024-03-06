// SearchBar.js
import React, { useState } from "react";
import { Input, Flex } from "@chakra-ui/react";

function SearchBar({ onSearchChange, inventory }) {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearchChange = (value) => {
      setSearchTerm(value);
      const filteredInventory = (inventory ?? []).filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      onSearchChange(filteredInventory);
    };
  
    return (
      <Flex>
        <Input
          type="text"
          placeholder="Search Product"
          className="search-input"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          mr="3"
        />
      </Flex>
    );
  }

export default SearchBar;