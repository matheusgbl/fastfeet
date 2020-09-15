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
`;

export const Info = styled.div`
  border-bottom: 1px solid #eee;

  div {
    display: flex;
    justify-content: space-between;

    button {
      background: none;
      border: 0;
      color: #fff;

      svg {
        transition: transform 0.7s;

        &:hover {
          color: #eee;
          -moz-transform: scale(1.5);
          -webkit-transform: scale(1.5);
          -o-transform: scale(1.5);
          -ms-transform: scale(1.5);
          transform: scale(1.5);
        }
      }
    }

    p {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
  }

  div.info {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    color: #fff;

    div {
      margin-top: 5px;
    }

    span.address {
      color: #fff;
      margin-top: 5px;
    }
  }
`;

export const Dates = styled.div`
  margin-top: 10px;
  border-bottom: 1px solid #eee;

  p {
    font-weight: bold;
    color: #fff;
  }

  div.withdraw {
    margin-top: 5px;
    margin-bottom: 5px;
    color: #fff;

    h4 {
      color: #eee;
    }
  }

  div {
    margin-bottom: 10px;

    h3 {
      color: #fff;
    }

    span {
      color: #fff;
    }

    h4 {
      color: #444;
    }
  }
`;

export const Signature = styled.div`
  margin-top: 10px;

  p {
    font-weight: bold;
    color: #fff;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      align-self: center;
      margin-top: 10px;
      max-height: 150px;
    }
  }
`;
