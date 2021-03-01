import React from 'react';
import empty from 'assets/blank.svg';
import { Container } from './empty-indicator.styles';

interface EmptyIndicatorProps {
  message?: string;
}

export const EmptyIndicator = (props: EmptyIndicatorProps) => {
  const { message } = props;

  return (
    <Container>
      <img src={empty} alt="empty" />
      <p>{message || 'No data...'}</p>
    </Container>
  );
};
