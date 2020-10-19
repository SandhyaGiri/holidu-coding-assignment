import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

test('renders initial loading message', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/loading search results/i)).toBeInTheDocument();
});

// TODO - can also use storybook.js for interactive testing of UI components