import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Inventory from './src/inventory/Inventory';

global.fetch = fetchMock;

test('renders the empty inventory form correctly and finds text', async () => {
  
  fetchMock.mockResponseOnce(JSON.stringify([]));

  await act(async () => {
    render(
      <MemoryRouter>
        <Inventory />
      </MemoryRouter>
    );
  });

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


test('updates search input correctly', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));

  await act(async () => {
    render(
      <MemoryRouter>
        <Inventory />
      </MemoryRouter>
    );
  });
  const searchInput = screen.getByPlaceholderText('Search Product');
  fireEvent.change(searchInput, { target: { value: testProduct.name } });
  expect(searchInput).toHaveValue(testProduct.name);

});


test('opens and closes the modal when clicking Add New button', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));

  await act(async () => {
    render(
      <MemoryRouter>
        <Inventory />
      </MemoryRouter>
    );
  });

  expect(screen.queryByText('Add New Product')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Add New'));

  await waitFor(() => {
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Close'));

  await waitFor(() => {
    expect(screen.queryByText('Add New Product')).not.toBeInTheDocument();
  });
});


test('edits product and updates display', async () => {

  const mockData = [
    { _id: '1', name: 'EditableProduct', quantity: '5', description: 'EditableDescription', minimumThreshold: '2' },
  ];

  fetchMock.mockResponseOnce(JSON.stringify(mockData));
  fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
  await act(async () => {
    render(
      <MemoryRouter>
        <Inventory />
      </MemoryRouter>
    );
  });
  fireEvent.click(screen.getByTestId('edit-button-1'));
  const newName = 'UpdatedProductName';
  const newQuantity = '10';
  await waitFor(() => {
    expect(screen.getByTestId('name-1')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByTestId('name-1'), { target: { value: newName } });
  fireEvent.change(screen.getByTestId('quantity-1'), { target: { value: newQuantity } });
  fireEvent.click(screen.getByText('Save'));
  await waitFor(() => {
    expect(screen.getByText(newName)).toBeInTheDocument();
    expect(screen.getByText(newQuantity)).toBeInTheDocument();
  });
});


test('filters inventory based on quantity and minimum threshold', async () => {
  fetchMock.mockResponseOnce(JSON.stringify([
    { name: 'LowQuantity', quantity: '1', minimumThreshold: '5' },
    { name: 'HighQuantity', quantity: '10', minimumThreshold: '5' },
  ]));
  fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
  await act(async () => {
    render(
      <MemoryRouter>
        <Inventory />
      </MemoryRouter>
    );
  });

  fireEvent.change(screen.getByPlaceholderText('Search Product'), { target: { value: '' } });
  
  fireEvent.change(screen.getByTestId('filter-input'), { target: { value: 'Low' } });
  expect(screen.getByText('LowQuantity')).toBeInTheDocument();
  expect(screen.queryByText(<td class="css-0">HighQuantity</td>)).not.toBeInTheDocument();

  fireEvent.change(screen.getByTestId('filter-input'), { target: { value: 'High' } });
  expect(screen.getByText('HighQuantity')).toBeInTheDocument();
  expect(screen.queryByText(<td class="css-0">LowQuantity</td>)).not.toBeInTheDocument();
});










/*
test('deletes a product and updates display', async () => {
  const mockData = [
    { _id: '1', name: 'DeletableProduct', quantity: '5', description: 'DeletableDescription', minimumThreshold: '2' },
  ];

  fetchMock.mockResponseOnce(JSON.stringify(mockData));
  fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
  
  await act(async () => {
    render(
      <MemoryRouter>
        <Inventory />
      </MemoryRouter>
    );
  });

  fireEvent.click(screen.getByTestId('delete-button-1')); 
  fireEvent.click(screen.getByText('Delete')); 
  await waitFor(() => {
    expect(screen.queryByText('DeletableProduct')).not.toBeInTheDocument();
  });
});
*/

/*
test('adds a new product and updates display', async () => {
  const newProduct = {
    name: 'NewProduct',
    quantity: '15',
    description: 'NewDescription',
    minimumThreshold: '5',
  };

  const mockData = [
    { _id: '1', name: 'ExistingProduct', quantity: '10', description: 'ExistingDescription', minimumThreshold: '3' },
  ];

  fetchMock.mockResponseOnce(JSON.stringify(mockData));
  fetchMock.mockResponseOnce(JSON.stringify([...mockData, { ...newProduct, _id: '2' }]));

  await act(async () => {
    render(
      <MemoryRouter>
        <Inventory />
      </MemoryRouter>
    );
  });

  fireEvent.click(screen.getByText('Add New'));

  // Fill in the new product details in the modal
  fireEvent.change(screen.getByPlaceholderText('Product Name'), { target: { value: newProduct.name } });
  fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: newProduct.quantity } });
  fireEvent.change(screen.getByPlaceholderText('Minimum Threshold'), { target: { value: newProduct.minimumThreshold } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: newProduct.description } });

  fireEvent.click(screen.getByText('Add'));

  await waitFor(() => {
    expect(screen.getByText(newProduct.name)).toBeInTheDocument();
    expect(screen.getByText(newProduct.quantity)).toBeInTheDocument();
    expect(screen.getByText(newProduct.description)).toBeInTheDocument();
    expect(screen.getByText(newProduct.minimumThreshold)).toBeInTheDocument();
  });
});

*/


