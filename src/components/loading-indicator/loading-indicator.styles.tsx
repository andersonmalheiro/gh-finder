import { MdSync } from 'react-icons/md';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const LoadingIcon = styled(MdSync)`
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
