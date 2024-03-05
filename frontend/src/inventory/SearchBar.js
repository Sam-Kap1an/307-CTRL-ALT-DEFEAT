// SearchBar.js
import React from "react";
import { Input, Flex } from "@chakra-ui/react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <Flex>
      <Input
        type="text"
        placeholder="Search Product"
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        mr="3"
      />
    </Flex>
  );
}

export default SearchBar;
