import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';
import logoHeader from '../../assets/images/logoHeader.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    const confirmation = window.confirm('Gostaria de sair da plataforma?');

    if (confirmation === true) {
      dispatch(signOut());
    }
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logoHeader} alt="GymPoint" />
          <NavLink
            className="navText"
            activeClassName="navTextSelected"
            to="/students"
          >
            ALUNOS
          </NavLink>
          <NavLink
            className="navText"
            activeClassName="navTextSelected"
            to="/plans"
          >
            PLANOS
          </NavLink>
          <NavLink
            className="navText"
            activeClassName="navTextSelected"
            to="/enrollments"
          >
            MATRÍCULAS
          </NavLink>
          <NavLink
            className="navText"
            activeClassName="navTextSelected"
            to="/help-orders"
          >
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
