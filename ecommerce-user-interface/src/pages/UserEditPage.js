import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constant/userConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  App,
  form,
  inputGroup,
  primary,
  uniqueInputGroup,
} from './RegisterPage.module.css';

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const UserEditPage = () => {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, successUpdate, navigate]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link
        style={{ textDecoration: 'none', color: 'gray' }}
        to="/admin/userList"
      >
        Go Back
      </Link>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className={App}>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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

              <div className={uniqueInputGroup}>
                <label htmlFor="isAdmin">Is Admin</label>
                <input
                  onChange={e => {
                    setIsAdmin(e.target.checked);
                  }}
                  checked={isAdmin}
                  type="checkbox"
                  name="isAdmin"
                />
              </div>
              <button type="submit" className={primary}>
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserEditPage;
