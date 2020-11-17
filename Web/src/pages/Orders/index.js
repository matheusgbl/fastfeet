import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  MdSearch,
  MdAdd,
  MdRemoveRedEye,
  MdDelete,
  MdEdit,
} from 'react-icons/md';

import { toast } from 'react-toastify';

import {
  Container,
  Title,
  AddOrder,
  PageActions,
  Content,
  NavPage,
  NavPageButton,
} from './styles';

import SearchInput from '../../components/SearchInput';
import MoreButton from '../../components/MoreButton';
import OrderInfo from '../../components/OrderInfo';
import OrderStatus from '../../components/OrderStatus';

import { editOrderRequest } from '../../store/modules/order/actions';

import api from '../../services/api';
import history from '../../services/history';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState('');
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('/orders', {
        params: {
          product,
          page,
        },
      });

      setOrders(response.data);
    }

    loadDeliveries();
  }, [product, page]);

  async function handleView(id) {
    try {
      const response = await api.get(`/orders/${id}`);

      setItem(response.data);
      setVisible(!visible);
    } catch ({ response }) {
      toast.error('Order visualization error.');
      console.tron.log(response.data.error);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/orders/${id}`);

      toast.success('Order removed!', 2000);
    } catch (error) {
      toast.error('Error when deleting order.');
      console.tron.log(error);
    } finally {
      setTimeout(function() {
        history.go(0);
      }, 4000);
    }
  }

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  return (
    <>
      <Container>
        <Title>
          <strong>ORDER MANAGEMENT</strong>
        </Title>

        <PageActions>
          <div>
            <SearchInput
              icon={MdSearch}
              placeholder="Order search"
              value={product}
              onChange={e => setProduct(e.target.value)}
            />
            <AddOrder onClick={() => history.push('/orders_create')}>
              <MdAdd size={24} color="#fff" />
              <strong>CREATE</strong>
            </AddOrder>
          </div>
        </PageActions>

        <Content>
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipient</th>
              <th>Deliveryman</th>
              <th>Product</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <>
                <tr key={order.id}>
                  <td>
                    {String(order.id).length < 2 ? `0${order.id}` : order.id}
                  </td>
                  <td>{order.recipient.name}</td>
                  <td>
                    <main>
                      <img
                        src={
                          order.deliveryman.avatar
                            ? order.deliveryman.avatar.url
                            : 'https://api.adorable.io/avatars/abott@adorable.png'
                        }
                        alt={order.deliveryman.name}
                      />
                      <span>{order.deliveryman.name}</span>
                    </main>
                  </td>
                  <td>{order.product}</td>
                  <td>{order.recipient.city}</td>
                  <td>{order.recipient.state}</td>
                  <td className="status">
                    <OrderStatus data={order} />
                  </td>
                  <td>
                    <MoreButton>
                      <button
                        type="button"
                        onClick={() => handleView(order.id)}
                      >
                        <MdRemoveRedEye color="#7d40e7" size={12} />
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(editOrderRequest(order.id))}
                      >
                        <MdEdit color="#4D85EE" size={12} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(order.id)}
                      >
                        <MdDelete color="#DE3B3B" size={12} />
                        Delete
                      </button>
                    </MoreButton>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Content>
        <NavPage>
          <NavPageButton
            disabled={page === 1}
            onClick={() => handlePage('back')}
            type="button"
          >
            {'<'} Back
          </NavPageButton>
          <span>Page {page}</span>
          <NavPageButton
            disabled={orders.length <= 1}
            onClick={() => handlePage('next')}
            type="button"
          >
            Next {'>'}
          </NavPageButton>
        </NavPage>
        <OrderInfo visible={visible} data={item} />
      </Container>
    </>
  );
}
