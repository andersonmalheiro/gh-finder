import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { SearchForm } from '../../components';
import '@testing-library/jest-dom/extend-expect';

describe('SearchForm', () => {
  it('should render correctly', () => {
    expect(
      render(
        <Provider store={store}>
          <SearchForm />
        </Provider>
      )
    ).toBeTruthy();
  });
});
