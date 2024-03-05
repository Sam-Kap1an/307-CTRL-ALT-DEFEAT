// SearchBar.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import SearchBar from "./src/inventory/SearchBar.js";
import {jest} from '@jest/globals'
  
describe("SearchBar", () => {
  test("renders SearchBar component", () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search Product")).toBeInTheDocument();
  });

  test("handles search term change", () => {
    const onSearchChangeMock = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={onSearchChangeMock} />);

    const inputElement = screen.getByPlaceholderText("Search Product");
    fireEvent.change(inputElement, { target: { value: "new term" } });

    expect(onSearchChangeMock).toHaveBeenCalledWith("new term");
  });
});

describe("SearchBar", () => {
    test("filters inventory based on search term", () => {
      const onSearchChangeMock = jest.fn();
      const filteredInventory = [
        { _id: 1, name: "Product A" },
        { _id: 2, name: "Product B" },
      ];
  
      render(<SearchBar onSearchChange={onSearchChangeMock} filteredInventory={filteredInventory} />);
  
      const inputElement = screen.getByPlaceholderText("Search Product");
      fireEvent.change(inputElement, { target: { value: "Product A" } });
  
      expect(onSearchChangeMock).toHaveBeenCalledWith("Product A");
    });
});