import React, {useContext} from 'react';
import Switch from 'react-switch';
import { useDispatch } from 'react-redux';
import { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import { MdExitToApp, MdWbSunny } from 'react-icons/md';
import { BsMoon } from 'react-icons/bs';
import { signOut } from '../../store/modules/auth/actions';

import { Container, Content, ThemeSwitch, Profile } from './styles';

import logoHeader from '../../assets/fastfeet-logo2.png';

export default function Header({ toogleTheme }) {
  const dispatch = useDispatch();
  const { title } = useContext(ThemeContext);

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

        <ThemeSwitch>
          <MdWbSunny color="#fff" size={24} />
            <Switch
              onChange={toogleTheme}
              checked={title === 'dark'}
              checkedIcon={false}
              uncheckedIcon={false}
              height={15}
              width={40}
              handleDiameter={20}
              onColor="#7d40e7"
              offColor="#24292e"
              />
          <BsMoon color="#fff" size={24} />
        </ThemeSwitch>

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
