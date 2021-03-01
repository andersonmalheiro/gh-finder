import styled from 'styled-components';

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

export const RepoGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1em;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 70vh;
  overflow: hidden;
  overflow-y: auto;
  padding: 0 5px;
`;

export const RepoCard = styled.li`
  display: flex;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
  min-height: 70px;
  box-shadow: 0 3px 10px 1px #393ac521;

  .title {
    font-weight: bold;
    font-size: 12px;
  }
`;
