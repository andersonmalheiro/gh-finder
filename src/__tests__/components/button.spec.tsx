import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppButton } from '../../components/button';
import '@testing-library/jest-dom/extend-expect';

describe('Button', () => {
  it('should render button correctly', () => {
    const { getByText } = render(<AppButton text="Search" />);
    expect(getByText('Search')).toBeInTheDocument();
  });

  it('should execute function on click', () => {
    const onClick = jest.fn();
    const wrapper = render(
      <AppButton data-testid="button" text="Search" onClick={onClick} />
    );
    const button = wrapper.getByTestId('button');
    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(1);
  });
});
