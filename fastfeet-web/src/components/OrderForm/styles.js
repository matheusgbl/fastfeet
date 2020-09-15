import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;

  span {
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;

export const Title = styled.div`
  margin: 30px 0 20px;
  justify-content: space-between;
  text-align: center;

  strong {
    font-size: 26px;
    color: #fff;
  }
`;

export const InputContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  p {
    margin-bottom: 5px;
  }
`;

export const Content = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  background: #2c313a;

  > div {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    color: #fff;
  }

  footer {
    margin-top: 10px;
    display: flex;
    color: #fff;

    div {
      width: 100%;
      display: flex;
      flex-direction: column;

      input {
        margin-top: 5px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: row;

    button {
      width: 100px;
      height: 36px;

      background: #7d40e7;
      margin: 15px 0 0 0;
      color: #fff;

      font-weight: medium;
      border: 0;
      border-radius: 6px;
      transition: background 0.2s;

      &:last-child {
        margin-left: 560px;
      }

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-right: 10px;

        svg {
          margin-right: 5px;
        }
      }

      &:first-child {
        background: #505050;
        &:hover {
          background: ${darken(0.03, '#505050')};
        }
      }
    }
  }
`;
