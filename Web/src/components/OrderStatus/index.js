import React from 'react';

import { MdLocalShipping } from 'react-icons/md';

import { Container } from './styles';

export default function OrderStatus({ data }) {
  return (
    <Container>
      <span className="status-box">
        {data.start_date && !data.end_date && !data.canceled_at ? (
          <span className="status-withdrawal">
            <MdLocalShipping size={18} />
            WITHDRAWAL
          </span>
        ) : null}

        {data.start_date &&
        data.end_date &&
        data.signature &&
        !data.canceled_at ? (
          <span className="status-delivered">
            <MdLocalShipping size={18} />
            DELIVERED
          </span>
        ) : null}

        {!data.start_date && !data.end_date && !data.canceled_at ? (
          <span className="status-pending">
            <MdLocalShipping size={18} />
            PENDING
          </span>
        ) : null}

        {data.canceled_at ? (
          <span className="status-canceled">
            <MdLocalShipping size={18} />
            CANCELED
          </span>
        ) : null}
      </span>
    </Container>
  );
}
