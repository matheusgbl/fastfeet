import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { MdAdd, MdDelete, MdEdit, MdSearch } from 'react-icons/md';
import Modal from '../../components/Modal';

import { editRecipientRequest } from '../../store/modules/recipient/actions';

import {
  Container,
  Title,
  PageActions,
  Content,
  NavPage,
  NavPageButton,
} from './styles';

import api from '../../services/api';
import history from '../../services/history';
import SearchInput from '../../components/SearchInput';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('/recipients', {
        params: {
          name,
          page,
        },
      });

      setRecipients(response.data);
    }

    loadRecipients();
  }, [name, page]);

  async function handleDelete(id) {
    try {
      await api.delete(`/recipients/${id}`);

      toast.success('Recipient deleted!', 1000);
    } catch (error) {
      toast.error('Error when deleting recipient!');

      console.tron.log(error);
    }
  }

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  return (
    <>
      <Container>
        <Title>
          <strong>RECIPIENT MANAGEMENT</strong>
        </Title>

        <PageActions>
          <div>
            <SearchInput
              icon={MdSearch}
              placeholder="Recipient search"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button
              type="button"
              onClick={() => history.push('/recipient_create')}
            >
              <MdAdd color="#fff" size={20} />
              <strong>CREATE</strong>
            </button>
          </div>
        </PageActions>

        <Content>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Adress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map(recipient => (
              <>
                <tr key={recipient.id}>
                  <td>{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {recipient.complement
                      ? `Street ${recipient.street}, ${recipient.number}, ${recipient.city}, ${recipient.state}, ${recipient.complement}.`
                      : `Street ${recipient.street}, ${recipient.number}, ${recipient.city}, ${recipient.state}.`}
                  </td>

                  <td className="menu">
                    <Modal>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(editRecipientRequest(recipient.id))
                        }
                      >
                        <MdEdit color="#4D85EE" size={12} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(recipient.id)}
                      >
                        <MdDelete color="#DE3B3B" size={12} />
                        Delete
                      </button>
                    </Modal>
                  </td>
                </tr>
                <br />
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
            disabled={recipients.length <= 1}
            onClick={() => handlePage('next')}
            type="button"
          >
            Next {'>'}
          </NavPageButton>
        </NavPage>
      </Container>
    </>
  );
}
