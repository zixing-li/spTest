import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  console.log('action', action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // makes sure that the reducer will only return null, user model, or false
    default:
      return state;
  }
}
