import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { MdRemoveRedEye, MdCancel } from 'react-icons/md';

import ScreenModal from '../../components/ScreenModal';
import MoreButton from '../../components/MoreButton';

import api from '../../services/api';

import { Container, Title, Content, NavPage, NavPageButton } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('/problems', {
        params: {
          page,
        },
      });

      setProblems(response.data);
    }

    loadProblems();
  }, [page]);

  function showModal(text) {
    setDescription(text);
    setVisible(!visible);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/problems/${id}`);

      toast.success('Order successfully canceled.');
    } catch ({ response }) {
      console.tron.log(response.data.error);
    }
  }

  return (
    <>
      <Container>
        <Title>
          <strong>ORDER PROBLEMS</strong>
        </Title>

        <Content>
          <thead>
            <tr>
              <th>Order</th>
              <th>Problem</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <>
                <tr key={problem.id}>
                  <td className="id">
                    {String(problem.id).length < 2
                      ? `0${problem.id}`
                      : problem.id}
                  </td>
                  <td>{problem.description}</td>
                  <td className="buttons">
                    <MoreButton className="menu">
                      <button
                        type="button"
                        onClick={() => showModal(problem.description)}
                      >
                        <MdRemoveRedEye color="#4D85EE" size={12} />
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(problem.id)}
                      >
                        <MdCancel color="#DE3B3B" size={12} />
                        Cancel
                      </button>
                    </MoreButton>
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
            onClick={() => setPage(page - 1)}
            type="button"
          >
            {'<'} Back
          </NavPageButton>
          <span>Page {page}</span>
          <NavPageButton
            disabled={problems.length <= 1}
            onClick={() => setPage(page + 1)}
            type="button"
          >
            Next {'>'}
          </NavPageButton>
        </NavPage>
        <ScreenModal title="PROBLEM DESCRIPTION" visible={visible}>
          {description}
        </ScreenModal>
      </Container>
    </>
  );
}
