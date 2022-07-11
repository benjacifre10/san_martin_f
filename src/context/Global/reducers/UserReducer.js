import decodeToken from '../../../utils/jwt';

export default (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      document.cookie = `token=${action.payload}; max-age=${60 * 60}; path=/; samesite=strict`; 
      return {
        ...state,
        userLogin: decodeToken(action.payload),
      };

    case 'LOGOUT': 
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      return {
        ...state,
        userLogin: {},
      };

    default:
      return state;
  }
};
