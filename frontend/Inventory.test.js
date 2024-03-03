import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Inventory from './src/inventory/Inventory.js';

test('renders Inventory component without errors', () => {
  render(
    <MemoryRouter>
      <Inventory />
    </MemoryRouter>
  );
});