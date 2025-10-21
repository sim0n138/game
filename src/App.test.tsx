import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders robot programming puzzle title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Головоломка программирования робота/i);
  expect(titleElement).toBeInTheDocument();
});
