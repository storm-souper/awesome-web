import Axios from 'axios';
import { 
  PRODUCT_LIST_FAIL, 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESSS, 
  PRODUCT_DETAILS_REQUEST, 
  PRODUCT_DETAILS_SUCCESSS, 
  PRODUCT_DETAILS_FAIL, 
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL
} from "../constant/productConstants"

export const listProducts = ({seller = ''}) => async(dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST
  });
  try {
    const { data } = await Axios.get(`/api/products?seller=${seller}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESSS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message
    });
  }
};

export const detailsProduct = (productID) => async(dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productID
  });
  try {
    const { data } = await Axios.get(`/api/products/${productID}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESSS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message 
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(
      '/api/products', 
      // post method require payload to 'post'
      // so need to add empty object
      {},
      {
        headers: {Authorization: `Bearer ${userInfo.token}`}
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message = 
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({type: PRODUCT_UPDATE_REQUEST, payload: product});
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.put(
      `/api/products/${product._id}`,
      product,
      {
        headers: {Authorization: `Bearer ${userInfo.token}`}
      }
    );
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = 
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message
    });
  }
};

export const deleteProduct = (productID) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
    payload: productID
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const { data } = await Axios.delete(
      `/api/products/${productID}`,
      {
        headers: {Authorization: `Bearer ${userInfo.token}`}
      }
    );
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message = 
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message
    });
  }
};