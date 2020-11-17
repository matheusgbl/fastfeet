import React from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import { createDeliverymanRequest } from '../../../store/modules/deliveryman/actions';

import { Container, Title, Content } from './styles';

import AvatarInput from './AvatarInput';

import history from '../../../services/history';

export default function DeliveryManAdd() {
  const schema = Yup.object().shape({
    avatar_id: Yup.number(),
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Insert a valid e-mail')
      .required('E-mail is required'),
  });

  const dispatch = useDispatch();

  function handleSubmit({ id, name, email, avatar_id }) {
    const data = {
      id,
      name,
      email,
      avatar_id,
    };

    dispatch(createDeliverymanRequest(data));
  }
  return (
    <>
      <Container>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Title>
            <strong>DELIVERY MAN REGISTRATION</strong>
          </Title>

          <Content>
            <AvatarInput name="avatar_id" />
            <div className="top">
              <p>NAME</p>
              <Input placeholder="Your Name" name="name" />
            </div>
            <div className="bottom">
              <p>EMAIL</p>
              <Input placeholder="Your email" name="email" />
            </div>
            <aside>
              <button
                type="button"
                onClick={() => history.push('/deliverymans')}
              >
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
    </>
  );
}
