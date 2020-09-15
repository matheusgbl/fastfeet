import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span.status {
    padding: 5px;
  }

  span.status-withdrawal {
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 12px;
    padding: 3px 8px 3px 3px;
    font-weight: medium;
    background: #bad1ff;
    color: #0855ef;

    svg {
      margin-right: 2px;
    }
  }

  span.status-delivered {
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 12px;
    padding: 3px 8px 3px 3px;
    font-weight: medium;
    background: #dff0df;
    color: #2ca42b;

    svg {
      margin-right: 2px;
    }
  }

  span.status-pending {
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 10px;
    padding: 3px 8px 3px 3px;
    font-weight: medium;
    background: #f1f1df;
    color: #cc7722;

    svg {
      margin-right: 2px;
    }
  }

  span.status-canceled {
    display: flex;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 12px;
    padding: 3px 8px 3px 3px;
    font-weight: medium;
    background: #ffe2e2;
    color: #de3b3b;

    svg {
      margin-right: 2px;
    }
  }
`;
