import React from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';

import { createRecipientRequest } from '../../../store/modules/recipient/actions';

import { Container, Title, Content } from './styles';

import history from '../../../services/history';

export default function RecipientEdit() {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    street: Yup.string().required('Street is required.'),
    number: Yup.number().required('Number is required.'),
    complement: Yup.string(),
    state: Yup.string().required('State is required.'),
    city: Yup.string().required('City is required.'),
    zipcode: Yup.string().required('ZipCode is required.'),
  });

  function handleSubmit({
    id,
    name,
    street,
    number,
    complement,
    state,
    city,
    zipcode,
  }) {
    const data = {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    };

    dispatch(createRecipientRequest(data));
  }

  return (
    <>
      <Container>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Title>
            <strong>RECIPIENT CREATION</strong>
          </Title>

          <Content>
            <div className="name">
              <div>
                <p>Name</p>
                <Input placeholder="Name" name="name" />
              </div>
            </div>
            <div className="street">
              <div>
                <p>Street</p>
                <Input placeholder="Street" name="street" />
              </div>
              <div>
                <p>Number</p>
                <Input placeholder="Number" name="number" />
              </div>
              <div className="complement">
                <div>
                  <p>Complement</p>
                  <Input placeholder="Complement" name="complement" />
                </div>
              </div>
            </div>
            <div className="city">
              <div>
                <p>City</p>
                <Input placeholder="City" name="city" />
              </div>
              <div>
                <p>State</p>
                <Input placeholder="State" name="state" />
              </div>
              <div>
                <p>Zipcode</p>
                <Input placeholder="Zipcode" name="zipcode" />
              </div>
            </div>

            <aside>
              <button type="button" onClick={() => history.push('/recipients')}>
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
