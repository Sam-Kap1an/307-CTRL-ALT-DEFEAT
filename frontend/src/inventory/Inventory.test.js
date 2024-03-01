// Inventory.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Inventory from './Inventory';

test('renders the empty form correctly', () => {
  render(<Inventory />);
  
  expect(screen.getByPlaceholderText('Search Product')).toBeInTheDocument();
  expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
  expect(screen.getByLabelText('Minimum Threshold')).toBeInTheDocument();
  expect(screen.getByLabelText('Description')).toBeInTheDocument();
  expect(screen.getByText('Add New')).toBeInTheDocument();
});
