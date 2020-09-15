import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;
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

export const Content = styled.div`
  width: 100%;
  padding: 10px 0 30px;
  background: #2c313a;
  border: 0;
  border-radius: 4px;

  button {
    width: 100px;
    height: 36px;

    background: #7d40e7;
    margin: 15px 0 0 20px;
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
      align-items: center;
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

    aside {
      display: flex;
      flex-direction: row;
    }
  }

  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    p {
      align-self: flex-start;
      margin-left: 21px;
      margin-bottom: 5px;
      color: #fff;

      &:last-child {
        margin-top: 20px;
      }
    }

    input {
      width: 95%;
      padding: 5px;
      border: 1px solid #eee;
      border-radius: 4px;
      color: #666;
    }
  }

  div.bottom {
    margin-top: 20px;
  }
`;
