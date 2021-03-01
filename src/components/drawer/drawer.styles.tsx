import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 1em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;

  h1 {
    margin: 0;
    font-size: 18px;
  }
`;
