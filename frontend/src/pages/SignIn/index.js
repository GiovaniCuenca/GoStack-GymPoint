import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import { ButtonGymPoint } from '../../components/ButtonGymPoint';

import logo from '../../assets/images/logo.svg';
import { colors } from '../../styles/colors';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <Input name="email" type="email" placeholder="exemplo@gympoint.com" />

        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="********" />

        <ButtonGymPoint
          buttonColor={colors.gympoint}
          text="Entrar no sistema"
          loading={loading}
          hideIcon
          buttonType="submit"
        />
      </Form>
    </>
  );
}
