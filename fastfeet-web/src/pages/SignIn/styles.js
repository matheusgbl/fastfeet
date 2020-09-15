import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #121212;
  border-radius: 10px;
  padding: 20px;

  img {
    height: 45px;
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: #24292e;
      border: 1px solid #fff;
      border-radius: 6px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: #ddd;
        opacity: 60%;
      }
    }

    strong {
      font-size: 14px;
      color: #9da5b4;
      text-align: left;
      margin-bottom: 5px;
    }

    button {
      margin: 10px 0;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 8px;
      font-size: 16px;
      transition: background 0.4s;

      &:hover {
        background: ${darken(0.2, '#7d40e7')};
      }
    }
  }
`;
