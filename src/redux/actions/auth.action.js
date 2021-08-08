import {LOGIN} from '../action.types';

export const loginUser = payload => {
  return {
    type: LOGIN,
    payload,
  };
};
