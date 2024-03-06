// AddNewProductModal.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddNewProductModal from "./src/inventory/AddNewProductModal.js";
import { jest } from "@jest/globals";

test("renders AddNewProductModal", () => {
  const onAddNewProduct = jest.fn();
  const onClose = jest.fn();

  render(
    <AddNewProductModal
      isOpen={true}
      onClose={onClose}
      onAddNewProduct={onAddNewProduct}
    />
  );
  expect(screen.getByText("Add New Product")).toBeInTheDocument();
  expect(screen.getByText("Close")).toBeInTheDocument();
  expect(screen.getByText("Add")).toBeInTheDocument();

  const quantityInput = screen.getByPlaceholderText("Quantity");
  fireEvent.change(quantityInput, { target: { value: "5" } });
  expect(quantityInput).toHaveValue("5");
});

test("handles input changes", () => {
  const onAddNewProduct = jest.fn();
  const onClose = jest.fn();

  render(
    <AddNewProductModal
      isOpen={true}
      onClose={onClose}
      onAddNewProduct={onAddNewProduct}
    />
  );
  const productNameInput = screen.getByPlaceholderText("Product Name");
  fireEvent.change(productNameInput, { target: { value: "Test Product" } });
  expect(productNameInput).toHaveValue("Test Product");
});

test("calls onAddNewProduct when 'Add' button is clicked", () => {
  const onAddNewProduct = jest.fn();
  const onClose = jest.fn();

  render(
    <AddNewProductModal
      isOpen={true}
      onClose={onClose}
      onAddNewProduct={onAddNewProduct}
    />
  );

  expect(onAddNewProduct).not.toHaveBeenCalled();

  const productNameInput = screen.getByPlaceholderText("Product Name");
  fireEvent.change(productNameInput, { target: { value: "Test Product" } });
  fireEvent.click(screen.getByText("Add"));

  expect(onAddNewProduct).toHaveBeenCalledWith({
    name: "Test Product",
    quantity: "",
    description: "",
    minimumThreshold: "",
  });
});

test("handles input changes for minimumThreshold", () => {
  const onAddNewProduct = jest.fn();
  const onClose = jest.fn();

  render(
    <AddNewProductModal
      isOpen={true}
      onClose={onClose}
      onAddNewProduct={onAddNewProduct}
    />
  );
  const minThresholdInput = screen.getByPlaceholderText("Minimum Threshold");
  fireEvent.change(minThresholdInput, { target: { value: "2" } });
  expect(minThresholdInput).toHaveValue("2");
});

test("handles input changes for description", () => {
  const onAddNewProduct = jest.fn();
  const onClose = jest.fn();
  render(
    <AddNewProductModal
      isOpen={true}
      onClose={onClose}
      onAddNewProduct={onAddNewProduct}
    />
  );
  const descriptionInput = screen.getByPlaceholderText("Description");
  fireEvent.change(descriptionInput, { target: { value: "Sample Description" } });
  expect(descriptionInput).toHaveValue("Sample Description");
});

test("handles input changes for quantity", () => {
  const onAddNewProduct = jest.fn();
  const onClose = jest.fn();

  render(
    <AddNewProductModal
      isOpen={true}
      onClose={onClose}
      onAddNewProduct={onAddNewProduct}
    />
  );

  const quantityInput = screen.getByPlaceholderText("Quantity");
  fireEvent.change(quantityInput, { target: { value: "5" } });
  expect(quantityInput).toHaveValue("5");
});

test("clears input fields after 'Add' button is clicked", () => {
  const onAddNewProduct = jest.fn();
  const onClose = jest.fn();

  render(
    <AddNewProductModal
      isOpen={true}
      onClose={onClose}
      onAddNewProduct={onAddNewProduct}
    />
  );

  const productNameInput = screen.getByPlaceholderText("Product Name");
  fireEvent.change(productNameInput, { target: { value: "Test Product" } });

  fireEvent.click(screen.getByText("Add"));

  expect(onAddNewProduct).toHaveBeenCalledWith({
    name: "Test Product",
    quantity: "",
    description: "",
    minimumThreshold: "",
  });
  expect(screen.getByPlaceholderText("Product Name")).toHaveValue("");
  expect(screen.getByPlaceholderText("Quantity")).toHaveValue("");
  expect(screen.getByPlaceholderText("Minimum Threshold")).toHaveValue("");
  expect(screen.getByPlaceholderText("Description")).toHaveValue("");
});