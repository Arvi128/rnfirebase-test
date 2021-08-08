import {LOGIN} from '../action.types';

const initialState = {
  user: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log('Payload', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
