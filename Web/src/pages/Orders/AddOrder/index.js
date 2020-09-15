import React from 'react';

import * as Yup from 'yup';

import { toast } from 'react-toastify';

import OrderForm from '../../../components/OrderForm';

import api from '../../../services/api';
import history from '../../../services/history';

export default function OrderAdd() {
  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('Recipient is required.'),
    deliveryman_id: Yup.number().required('Deliveryman is required.'),
    product: Yup.string().required('Product is required.'),
  });

  async function handleSubmit({ recipient_id, deliveryman_id, product }) {
    try {
      await api.post('/orders', {
        recipient_id,
        deliveryman_id,
        product,
      });

      toast.success('Order successfully created');
      history.push('/orders');
    } catch ({ response }) {
      console.tron.log(response.data.error);
      toast.error(response.data.error);
    }
  }

  return (
    <OrderForm
      title="ORDER REGISTRATION"
      schema={schema}
      onSubmit={handleSubmit}
    />
  );
}
