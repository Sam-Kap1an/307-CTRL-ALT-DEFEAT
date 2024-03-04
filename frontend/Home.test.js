import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Home from './src/components/home/Home.js';

global.fetch = fetchMock;

test("renders the Home component correctly", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  const headingText = screen.getByText("SOR");
  const headingText2 = screen.getByText("TIFY");
  const getStartedButton = screen.getByText("Get Started Today!");
  const loginLink = screen.getByText("Already have an account? Log In");

  expect(headingText).toBeInTheDocument();
  expect(headingText2).toBeInTheDocument();
  expect(getStartedButton).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
});


