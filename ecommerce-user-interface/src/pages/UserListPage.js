import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listUsers, deleteUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const UserListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, successDelete, navigate, userInfo]);

  const deleteHandler = id => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          style={{ maxWidth: '1200px', margin: '0 auto' }}
          striped
          bordered
          hover
          responsive
          className="table-sm"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a
                    style={{ textDecoration: 'none', color: 'black' }}
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <AiFillEdit style={{ color: 'black' }} />
                  </Link>

                  <AiFillDelete
                    style={{ cursor: 'pointer', marginLeft: '.5rem' }}
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;
