import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsUser, updateUserAdmin } from '../action/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_ADMIN_RESET } from '../constant/userConstant';

export default function UserEditScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user} = userDetails;
  const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateAdmin;

  const {id: userID} = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({type: USER_UPDATE_ADMIN_RESET});
      navigate('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userID));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userID, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAdmin({
      _id: userID,
      name, 
      email,
      isSeller, 
      isAdmin
    }));
  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor='name'>Name</label>
              <input 
                id='name' 
                type='text' 
                placeholder='Enter name' 
                value={name} onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='price'>Email</label>
              <input 
                id='email' 
                type='email' 
                placeholder='Enter email' 
                value={email} onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isSeller">Is Seller</label>
              <input 
                type="checkbox" 
                id="isSeller" 
                checked={isSeller}
                onChange={e => setIsSeller(e.target.checked)}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input 
                type="checkbox" 
                id="isAdmin" 
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            <div>
              <label></label>
              <button className='primary' type='submit'>
                Update
              </button>
            </div>
          </>
        ) }
      </form>
    </div>
  )
}
