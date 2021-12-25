import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteUser, listUser } from '../action/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET, USER_DETAILS_RESET } from '../constant/userConstant';

export default function UserListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const {loading, error, users} = userList;
  const userDelete = useSelector(state => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = userDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({type: USER_DELETE_RESET})
    }
    dispatch(listUser());
    dispatch({type: USER_DETAILS_RESET});
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (user.isAdmin) {
      window.alert('You cannot delete admin')
    } else {
      if (window.confirm('Are you sure to delete this user?')) {
        dispatch(deleteUser(user._id));
      }
      // ADD: dispatch delete user'orders action
    }  
  };
  
  return (
    <div>
      <h1>User List</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (  
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'Yes' : 'No'}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    type='button'
                    className='small'
                    onClick={() => navigate(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type='button'
                    className='small'
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>  
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
