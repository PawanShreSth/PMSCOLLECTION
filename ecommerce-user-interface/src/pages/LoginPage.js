import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  App,
  form,
  inputGroup,
  primary,
  secondary,
} from './LoginPage.module.css';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  let query = useQuery();

  // If there is redirect query param then it will redirect to shipping instead of /.
  const redirect = query.get('redirect') ? query.get('redirect') : '/';

  useEffect(() => {
    if (userInfo) {
      console.log(redirect);
      navigate(redirect !== '/' ? '/' + redirect : '/');
    }
  }, [userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      message.error('Please enter email and password!');
      return;
    }

    dispatch(login(email, password));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={App}>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form className={form} onSubmit={submitHandler}>
          <div className={inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              placeholder="nome@email.com.br"
            />
          </div>
          <div className={inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
            />
          </div>
          <button type="submit" className={primary}>
            Login
          </button>
        </form>
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          <button className={secondary}>Don't have an account? Register</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
