import React from 'react';
import { render } from '@testing-library/react';
import { EmptyIndicator } from '../../components';
import '@testing-library/jest-dom/extend-expect';

describe('Empty indicator', () => {
  it('should render correctly', () => {
    const { getByText } = render(<EmptyIndicator />);
    expect(getByText('No data...')).toBeInTheDocument();
  });

  it('should render a custom message', () => {
    const message = 'Test message';
    const { getByText } = render(<EmptyIndicator message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
});
