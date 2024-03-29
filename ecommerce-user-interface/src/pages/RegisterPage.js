import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  App,
  form,
  inputGroup,
  primary,
  secondary,
} from './RegisterPage.module.css';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  let query = useQuery();
  let redirect;
  if (query.get('redirect') && query.get('redirect').includes('shipping')) {
    redirect = '/shipping';
  } else {
    redirect = query.get('redirect') ? query.get('redirect') : '/';
  }

  useEffect(() => {
    if (userInfo) {
      console.log(redirect);
      // window.location.href = redirect;
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = e => {
    e.preventDefault();

    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      setMessage('Please enter all fields!');
      return;
    } else {
      setMessage(null);
    }

    if (password !== confirmPassword) {
      setMessage('Password and Confirm Password doesnot match!');
      return;
    } else {
      setMessage(null);
    }

    dispatch(register(name, email, password));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={App}>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form
          style={{ marginBottom: '.3rem' }}
          className={form}
          onSubmit={submitHandler}
        >
          <div className={inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              placeholder="John smith"
            />

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
              placeholder="Password"
            />
          </div>

          <div className={inputGroup}>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className={primary}>
            Register
          </button>
        </form>
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          <button className={secondary}>Have an account? Login</button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
