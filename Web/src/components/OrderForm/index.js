import React from 'react';

import { Form } from '@unform/web';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Title, Content, InputContent } from './styles';

import DeliverymanInput from './DeliverymanInput';
import RecipientInput from './RecipientInput';

import Input from '../Form/Input';

import history from '../../services/history';

export default function OrderForm({ onSubmit, title, ...rest }) {
  return (
    <Container>
      <Form onSubmit={onSubmit} {...rest}>
        <Title>
          <strong>{title}</strong>
        </Title>

        <Content>
          <div>
            <InputContent style={{ marginRight: 10 }}>
              <p>Recipient</p>
              <RecipientInput name="recipient_id" />
            </InputContent>

            <InputContent>
              <p>Deliveryman</p>
              <DeliverymanInput name="deliveryman_id" />
            </InputContent>
          </div>
          <footer>
            <InputContent>
              <Input
                placeholder="Product name"
                type="text"
                label="Product"
                name="product"
              />
            </InputContent>
          </footer>

          <aside>
            <button type="button" onClick={() => history.push('/orders')}>
              <div>
                <MdKeyboardArrowLeft size={20} color="#fff" />
                BACK
              </div>
            </button>
            <button type="submit">
              <div>
                <MdCheck size={18} color="#fff" />
                SAVE
              </div>
            </button>
          </aside>
        </Content>
      </Form>
    </Container>
  );
}
