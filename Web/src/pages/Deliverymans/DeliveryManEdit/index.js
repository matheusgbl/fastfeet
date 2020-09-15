import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { updateDeliverymanRequest } from '../../../store/modules/deliveryman/actions';

import { Container, Title, Content } from './styles';

import AvatarInput from '../DeliveryManAdd/AvatarInput';

import history from '../../../services/history';

export default function DeliveryManEdit() {
  const profile = useSelector(state => state.deliveryman.profile);

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    avatar_id: Yup.number(),
    name: Yup.string().required('Name is required.'),
    email: Yup.string()
      .email('Insert a valid e-mail')
      .required('E-mail is required.'),
  });

  function handleSubmit({ name, email, avatar_id }) {
    const data = {
      id: profile.id,
      name,
      email,
      avatar_id,
    };

    dispatch(updateDeliverymanRequest(data));
  }
  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Title>
          <strong>DELIVERYMAN EDITORS</strong>
        </Title>

        <Content>
          <AvatarInput name="avatar_id" />
          <div className="top">
            <p>NAME</p>
            <Input placeholder="Your name" name="name" />
          </div>
          <div className="bottom">
            <p>E-MAIL</p>
            <Input placeholder="Your e-mail" type="email" name="email" />
          </div>

          <aside>
            <button type="button" onClick={() => history.push('/deliverymans')}>
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
