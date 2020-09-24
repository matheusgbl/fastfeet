import React, { useState } from 'react';

import { MdClose } from 'react-icons/md';

import { Container, Content } from './styles';

export default function ScreenModal({ children, visible, title }) {
  const [show, setShow] = useState(false);

  function handleClose(_e) {
    setShow(!show);
  }

  if (visible === show) {
    return null;
  }

  return (
    <Container {...visible}>
      <Content>
        <div>
          <h3>{title}</h3>
          <button type="button" onCLick={e => handleClose(e)}>
            <MdClose size={20} color="#000" />
          </button>
        </div>

        <p>{children}</p>
      </Content>
    </Container>
  );
}
