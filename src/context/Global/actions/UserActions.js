import clientAxios from "../../../config/axios";

export const login = async (dispatch, item) => {
  const result = await clientAxios.post('/login', item);
  dispatch({
    type: 'LOGIN',
    payload: result.data.token
  });
};

export const logout = async (dispatch) => {
  dispatch({
    type: 'LOGOUT',
    payload: {},
  });
};
