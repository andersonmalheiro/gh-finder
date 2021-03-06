import styled from 'styled-components';

export const StyledFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
  margin: 0;
`;

export const StyledInput = styled.input`
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  width: 100%;
  background: #fff;
  box-shadow: 0 3px 10px 1px #393ac521;

  &::placeholder {
    color: #999;
  }

  &:invalid {
    border: 1px solid red;
  }
`;

export const StyledSelect = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 12px 18px;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;

  & option {
    padding: 10px;
    color: #000;
  }
`;

export const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;
