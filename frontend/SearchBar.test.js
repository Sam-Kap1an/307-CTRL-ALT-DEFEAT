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
});

test("handles search term change", () => {
    const onSearchChangeMock = jest.fn();
    render(<SearchBar searchTerm="" onSearchChange={onSearchChangeMock} />);
    const inputElement = screen.getByPlaceholderText("Search Product");
    fireEvent.change(inputElement, { target: { value: "new term" } });
    expect(onSearchChangeMock).toHaveBeenCalledWith([]);
});

test("filters inventory based on search term", () => {
    const onSearchChangeMock = jest.fn();
    const inventory = [
      { _id: 1, name: "Product A" },
      { _id: 2, name: "Product B" },
    ];

    render(
      <SearchBar
        onSearchChange={onSearchChangeMock}
        inventory={inventory}
      />
    );
    const inputElement = screen.getByPlaceholderText("Search Product");
    fireEvent.change(inputElement, { target: { value: "Product A" } });

    expect(onSearchChangeMock).toHaveBeenCalledWith([
      { _id: 1, name: "Product A" },
    ]);
});

test("properly filters inventory ignoring case", () => {
    const onSearchChangeMock = jest.fn();
    const inventory = [
      { _id: 1, name: "Product A" },
      { _id: 2, name: "Product B" },
      { _id: 3, name: "product C" },
    ];

    render(
      <SearchBar
        onSearchChange={onSearchChangeMock}
        inventory={inventory}
      />
    );

    const inputElement = screen.getByPlaceholderText("Search Product");
    fireEvent.change(inputElement, { target: { value: "PRODUCT" } });

    expect(onSearchChangeMock).toHaveBeenCalledWith([
      { _id: 1, name: "Product A" },
      { _id: 2, name: "Product B" },
      { _id: 3, name: "product C" },
    ]);
});

test("does not include items with names like 'apple' when searching for 'PRODUCT'", () => {
    const onSearchChangeMock = jest.fn();
    const inventory = [
      { _id: 1, name: "Product A" },
      { _id: 2, name: "Product B" },
      { _id: 3, name: "product C" },
      { _id: 4, name: "apple" },
      { _id: 5, name: "pineapple" },
    ];

    render(
      <SearchBar
        onSearchChange={onSearchChangeMock}
        inventory={inventory}
      />
    );

    const inputElement = screen.getByPlaceholderText("Search Product");
    fireEvent.change(inputElement, { target: { value: "PRODUCT" } });

    expect(onSearchChangeMock).toHaveBeenCalledWith([
      { _id: 1, name: "Product A" },
      { _id: 2, name: "Product B" },
      { _id: 3, name: "product C" },
    ]);
});



