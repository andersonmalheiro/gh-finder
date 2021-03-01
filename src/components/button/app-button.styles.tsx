import styled from 'styled-components';
import { MdSync } from 'react-icons/md';

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
