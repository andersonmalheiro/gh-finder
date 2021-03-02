import React from 'react';
import { render } from '@testing-library/react';
import { Map } from '../../components';
import '@testing-library/jest-dom/extend-expect';

describe('Map', () => {
  it('should render correctly', () => {
    const center = { lat: 20, lng: 20 };
    expect(render(<Map center={center} />)).toBeTruthy();
  });
});
