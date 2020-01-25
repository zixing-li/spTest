import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () =>
  // dispatch enabled by redux-thunk
  async dispatch => {
    const res = await axios.get('/api/current_user'); // route to API
    console.log('res', res);
    dispatch({ type: FETCH_USER, payload: res.data }); // dispatch only after we got response back
  };
