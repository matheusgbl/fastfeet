import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

export const Title = styled.div`
  margin: 0;
  text-align: center;

  strong {
    font-size: 26px;
    color: ${props => props.theme.colors.text};
  }
`;

export const Content = styled.table`
  width: 100%;
  margin: 25px 0;
  border-collapse: collapse;

  thead {
    display: block;

    tr {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
    }

    th {
      flex: 1px;
      text-align: left;
      color: ${props => props.theme.colors.text};
      font-size: 14px;
      :last-child {
        text-align: right;
        margin-right: 10px;
      }
    }
  }

  tbody {
    display: block;
    height: 380px;
    width: 100%;
    overflow: visible;

    tr {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: ${props => props.theme.colors.trbk};
      height: 60px;
      padding: 5px 10px;
      border-radius: 4px;
    }

    td {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 14px;
      color: ${props => props.theme.colors.text};
      main {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      :last-child {
        justify-content: flex-end;
        margin-right: 20px;
      }

      button {
        background: none;
        border: 0;
        align-items: center;
        color: #999;
        cursor: pointer;

        svg {
          align-self: flex-end;
        }
      }
    }
  }
`;

export const NavPage = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.text};
  > button {
    color: #fff;
    border: 0;
    background: none;
    cursor: pointer;
  }
`;

export const NavPageButton = styled.button.attrs({
  type: 'button',
})`
  color: ${props => props.theme.colors.text};
  border: 0;
  background: none;
  cursor: ${props => (props.disabled ? null : 'pointer')};
  opacity: ${props => (props.disabled ? 0 : 1)};
`;
