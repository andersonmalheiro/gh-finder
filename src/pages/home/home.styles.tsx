import styled from 'styled-components';
import { GhostBtn } from 'styles/utils';

export const StyledSection = styled.section`
  height: calc(100vh);
  overflow: hidden;
  overflow-y: auto;
  padding: 2em;
  scroll-behavior: smooth;
`;

export const Grid = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: 35% auto;
  gap: 1em;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

export const FloatingBtn = styled(GhostBtn)`
  position: absolute;
  border: none;
  right: 20px;
  bottom: 20px;
  background: #393ac5;
  color: #fff;
  padding: 10px;
  z-index: 1000;

  &:hover {
    border: none;
  }
`;
