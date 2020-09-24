import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;
`;

export const Title = styled.div`
  margin: 20px auto;
  text-align: center;

  strong {
    font-size: 26px;
    color: ${props => props.theme.colors.text};
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 30px;
  background: ${props => props.theme.colors.trbk};
  border: 0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  aside {
    display: flex;
    flex-direction: row;

    button {
      width: 100px;
      height: 36px;

      background: #7d40e7;
      margin: 15px auto;
      color: #fff;
      font-weight: medium;

      border: 0;
      border-radius: 6px;
      transition: background 0.2s;

      &:last-child {
        margin-left: 545px;
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
    }
  }

  div.name {
    p {
      font-weight: bold;
      color: ${props => props.theme.colors.text};
    }
    input {
      height: 45px;
      width: 740px;
      color: #999;
      padding: 0 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-top: 5px;
    }
  }

  div.street {
    display: flex;
    width: 100%;
    flex: 1;
    margin-top: 10px;
    justify-content: space-between;

    p {
      font-weight: bold;
      color: ${props => props.theme.colors.text};
    }

    input {
      height: 45px;
      width: 236px;
      color: #999;
      padding: 0 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-top: 5px;
    }
  }

  div.city {
    display: flex;
    width: 100%;
    flex: 1;
    margin-top: 10px;
    justify-content: space-between;

    p {
      font-weight: bold;
      color: ${props => props.theme.colors.text};
    }

    input {
      height: 45px;
      width: 236px;
      color: #999;
      padding: 0 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-top: 5px;
    }
  }
`;
