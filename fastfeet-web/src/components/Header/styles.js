import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgb(27, 29, 35) !important;
  padding: 10px 10px;
  border-bottom: 1px solid rgba(248, 248, 248, 0.3);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    ul {
      display: flex;

      a {
        font-weight: normal;
        font-size: 12px;
        margin-right: 10px;
        color: #fff;

        &:hover {
          color: ${darken(0.3, '#fff')};
        }
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    justify-content: center;

    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #eee;
    margin-top: 3px;

    strong {
      display: block;
      color: #fff;
      font-size: 14px;
    }

    p {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #fff;
    }
  }

  button {
    margin-top: 5px;
    display: flex;
    border: 0;
    background: #fff;
    padding: 10px 5px;

    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    border-radius: 6px;
    transition: background 0.5s;

    &:hover {
      background: ${darken(0.2, '#fff')};
    }

    strong {
      font-weight: normal;
      margin-left: 5px;
      color: #fff;
    }
  }
`;
