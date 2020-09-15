import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md';
import { signOut } from '../../store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

import logoHeader from '../../assets/fastfeet-logo.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logoHeader} alt="FastFeet" />
          <ul>
            <li>
              <Link to="/orders">ORDERS</Link>
            </li>
            <li>
              <Link to="/deliverymans">DELIVERYMANS</Link>
            </li>
            <li>
              <Link to="/recipients">RECIPIENTS</Link>
            </li>
            <li>
              <Link to="/problems">PROBLEMS</Link>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>ADMIN DASHBOARD</strong>
              <p>admin@fastfeet.com</p>
            </div>
            <button type="button" onClick={handleLogOut}>
              <MdExitToApp color="#121212" size={20} />
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
