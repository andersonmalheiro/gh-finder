import React from 'react';
import { Container, LoadingIcon } from './loading-indicator.styles';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const { message } = props;
  return (
    <Container>
      <LoadingIcon size={40} />
      <p>{message || 'Loading...'}</p>
    </Container>
  );
};
