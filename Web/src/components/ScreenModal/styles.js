import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #2c313a;
  width: 500px;

  border: 0;
  border-radius: 4px;
  padding: 20px;

  div {
    display: flex;
    justify-content: space-between;

    button {
      background: none;
      border: 0;

      svg {
        transition: transform 0.7s;
        color: #fff;

        &:hover {
          color: #fff;
          -moz-transform: scale(1.5);
          -webkit-transform: scale(1.5);
          -o-transform: scale(1.5);
          -ms-transform: scale(1.5);
          transform: scale(1.5);
        }
      }
    }
  }

  h3 {
    color: #fff;
  }

  p {
    margin: 20px 0;
    color: #fff;
  }
`;
