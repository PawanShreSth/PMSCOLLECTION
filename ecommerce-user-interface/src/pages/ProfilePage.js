import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import {
  html,
  body,
  App,
  logo,
  form,
  inputGroup,
  secondary,
  primary,
} from './RegisterPage.module.css';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  let query = useQuery();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user]);

  const submitHandler = e => {
    e.preventDefault();

    if (name.trim() === '' || email.trim() === '') {
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

    // DISPATCH UPDATE PROFILE
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">Profile Updated Successfully</Message>
        )}
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
              type="name"
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
            Update
          </button>
        </form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfilePage;
