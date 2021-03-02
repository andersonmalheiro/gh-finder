import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Form } from '../../components';
import '@testing-library/jest-dom/extend-expect';

describe('Form', () => {
  it('should render correctly', () => {
    expect(render(<Form />)).toBeTruthy();
  });

  it('should run submit function', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <Form data-testid="form" onSubmit={onSubmit} />
    );
    const form = getByTestId('form');
    fireEvent.submit(form);

    expect(onSubmit).toBeCalledTimes(1);
  });
});
