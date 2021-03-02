import React from 'react';
import { render } from '@testing-library/react';
import { LoadingIndicator } from '../../components';
import '@testing-library/jest-dom/extend-expect';

describe('Loading indicator', () => {
  it('should render correctly', () => {
    const { getByText } = render(<LoadingIndicator />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render a custom message', () => {
    const message = 'Test message';
    const { getByText } = render(<LoadingIndicator message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
});
