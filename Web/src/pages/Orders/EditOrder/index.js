import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';

import OrderForm from '../../../components/OrderForm';

import { updateOrderRequest } from '../../../store/modules/order/actions';

export default function OrderEdit() {
  const order = useSelector(state => state.order.order);

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('Please insert a valid recipient.'),
    deliveryman_id: Yup.number().required('Please insert a valid deliveryman.'),
    product: Yup.string().required('Product is required.'),
  });

  function handleSubmit(data) {
    dispatch(updateOrderRequest(order.id, data));
  }

  return (
    <OrderForm
      initialData={order}
      onSubmit={handleSubmit}
      title="ORDER EDIT"
      schema={schema}
    />
  );
}
