import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Drawer } from '../../components';
import '@testing-library/jest-dom/extend-expect';

describe('Drawer', () => {
  it('should render drawer correctly', () => {
    const toggleDrawer = jest.fn();
    const { getByRole } = render(
      <Drawer open title="Drawer title" toggleDrawer={toggleDrawer}>
        <span>test</span>
      </Drawer>
    );
    expect(getByRole('heading')).toHaveTextContent('Drawer title');
  });

  it('should execute toggleDrawer', () => {
    const toggleDrawer = jest.fn();
    const wrapper = render(
      <Drawer open title="Drawer title" toggleDrawer={toggleDrawer}>
        <span>test</span>
      </Drawer>
    );

    const button = wrapper.getByTestId('close_drawer');
    fireEvent.click(button);

    expect(toggleDrawer).toBeCalledTimes(1);
  });
});
