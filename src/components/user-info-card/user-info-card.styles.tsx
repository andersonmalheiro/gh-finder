import styled from 'styled-components';

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 1em;
  border-radius: 12px;
  height: fit-content;
  box-shadow: 0 3px 10px 1px #393ac521;

  .name {
    font-weight: bold;
    font-size: 18px;
    color: #000;
    margin-bottom: 10px;
  }

  .alias {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    font-size: 14px;
    color: #000;
    opacity: 0.7;
    text-decoration: none;
  }

  .bio {
    margin: 10px 0;
    padding: 0;
    font-size: 14px;
    color: #000;
    opacity: 0.7;
  }

  .stats-box {
    border-radius: 12px;
    background: #393ac522;
    padding: 10px;
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    .stat {
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      padding: 5px;

      small {
        color: #393ac5;
        opacity: 0.7;
      }

      span {
        font-size: 16px;
        color: #000;
        opacity: 0.7;
        font-weight: bold;
      }
    }
  }
`;

export const UserAvatar = styled.img`
  height: 100px;
  min-height: 100px;
  width: 100px;
  min-width: 100px;
  border-radius: 12px;
`;
