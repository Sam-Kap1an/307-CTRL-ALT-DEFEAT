import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // If needed, you can use MemoryRouter to wrap your component
import '@testing-library/jest-dom';
import Inventory from './src/inventory/Inventory';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';




test('renders the empty inventory form correctly', () => {
  render(
    <MemoryRouter>
      <Inventory />
    </MemoryRouter>
  );
  const inventoryElements = screen.queryAllByText('Inventory');
  expect(inventoryElements.length).toBe(2);
  expect(screen.getByPlaceholderText('Search Product')).toBeInTheDocument();
  expect(screen.getByText('Product')).toBeInTheDocument();
  expect(screen.getByText('Quantity')).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();
  expect(screen.getByText('Minimum Threshold')).toBeInTheDocument();
  expect(screen.getByText('Edit')).toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument();
  expect(screen.getByText('Add New')).toBeInTheDocument();
  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('Back')).toBeInTheDocument();
});


const testProduct = {
  name: 'TestProduct',
  quantity: '5',
  description: 'TestDescription',
  minimumThreshold: '2',
};

test('updates search input correctly', () => {
  render(
    <MemoryRouter>
      <Inventory />
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText('Search Product');
  fireEvent.change(searchInput, { target: { value: testProduct.name } });
  expect(searchInput).toHaveValue(testProduct.name);
});

test('opens and closes the modal when clicking Add New button', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));
  
  render(
    <MemoryRouter>
      <Inventory />
    </MemoryRouter>
  );

  expect(screen.queryByText('Add New Product')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Add New'));
  expect(screen.getByText('Add New Product')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Close'));
  await waitFor(() => {
    expect(screen.queryByText('Add New Product')).not.toBeInTheDocument();
  });
});

