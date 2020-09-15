/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdSearch, MdDelete, MdAdd, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import history from '../../services/history';
import { Container, AddDeliveryman, NavPage, NavPageButton } from './styles';

import SearchInput from '../../components/SearchInput';
import MoreButton from '../../components/MoreButton';
import { editDeliverymanRequest } from '../../store/modules/deliveryman/actions';

export default function Deliveryman() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [deliverymanSearch, setDeliverymanSearch] = useState('');
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  async function loadDeliverymans(del) {
    const response = await api.get('/deliveryman', {
      params: {
        q: del,
        page,
      },
    });

    const data = response.data.map(deliveryman => {
      const actions = false;

      return {
        ...deliveryman,
        actions,
      };
    });

    setDeliverymans(data);
  }

  useEffect(() => {
    loadDeliverymans();
  }, [page]);

  async function handleSearch(e) {
    e.preventDefault();
    setDeliverymanSearch(e.target.value);

    loadDeliverymans(e.target.value);
  }

  function handleActionsUnvisible() {
    setDeliverymans(
      deliverymans.map(deliveryman => ({
        ...deliveryman,
        actions: false,
      }))
    );
  }

  async function handleDelete(id) {
    const confirm = window.confirm('Click OK to delete the deliveryman!');
    handleActionsUnvisible();
    if (!confirm) {
      return;
    }

    try {
      await api.delete(`/deliveryman/${id}`);
      loadDeliverymans();
      toast.success('Delivery man successfully removed', 1000);
    } catch (err) {
      toast.error('Delete failed! Please check the deliveryman deliveries');
    }
  }

  return (
    <Container>
      <h2>DELIVERYMAN MANAGEMENT</h2>
      <div>
        <SearchInput
          icon={MdSearch}
          placeholder="Delivery man search"
          value={deliverymanSearch}
          onChange={handleSearch}
        />
        <AddDeliveryman onClick={() => history.push('/deliveryman_create')}>
          <MdAdd size={24} color="#fff" />
          <strong>CREATE</strong>
        </AddDeliveryman>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!!deliverymans &&
            deliverymans.map(deliveryman => (
              <tr key={deliveryman.id}>
                <td>
                  {String(deliveryman.id).length < 2
                    ? `0${deliveryman.id}`
                    : deliveryman.id}
                </td>
                <td>
                  <img
                    src={
                      deliveryman.avatar
                        ? deliveryman.avatar.url
                        : 'https://api.adorable.io/avatars/abott@adorable.png'
                    }
                    alt="User avatar"
                  />
                </td>
                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>
                <td>
                  <MoreButton>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(editDeliverymanRequest(deliveryman.id))
                      }
                    >
                      <MdEdit color="#4D85EE" size={12} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(deliveryman.id)}
                    >
                      <MdDelete color="#DE3B3B" size={12} />
                      Delete
                    </button>
                  </MoreButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <NavPage>
        <NavPageButton
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          type="button"
        >
          {'<'} Back
        </NavPageButton>
        <span>Page {page}</span>
        <NavPageButton
          disabled={deliverymans.length < 5}
          onClick={() => setPage(page + 1)}
          type="button"
        >
          Next {'>'}
        </NavPageButton>
      </NavPage>
    </Container>
  );
}
