import clientAxios from '../../../config/axios';

export const addStudent = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  }
  const result = await clientAxios.post('/student', 
    { 
      name: item.name, 
      surname: item.surname,
      identityNumber: item.identityNumber,
      address: item.address,
      phone: item.phone,
      cuil: item.cuil,
      arrears: true,
      state: true,
      userid: item.user,
      degreeid: item.degree
    }, options);
  
  item.ID = result.data.data || '';
  dispatch({
    type: 'ADD_DEGREE',
    payload: item
  });

  return result.data;
};

export const updateStudent = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  };
  const result = await clientAxios.put('/student', 
    { 
      id: item.ID, 
      name: item.name,
      surname: item.surname,
      address: item.address,
      phone: item.phone,
      cuil: item.cuil
    }, options);

  dispatch({
    type: 'UPDATE_STUDENT',
    payload: item
  });
  
  return result.data;
};

export const changeStateStudent = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  };
  const result = await clientAxios.put('/student/state', 
    { id: item.ID, state: item.state }, options);

  if (result.data.code !== 200) return result.data;

  dispatch({
    type: 'CHANGE_STATE_STUDENT',
    payload: item
  });

  return result.data;
};

export const getStudent = async (dispatch) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get('/student', {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  dispatch({
    type: 'GET_STUDENT',
    payload: result.data.data ? result.data.data : []
  });

  return result.data.data;
};

export const getStudents = async (dispatch) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get('/student', {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  dispatch({
    type: 'GET_STUDENTS',
    payload: result.data.data ? result.data.data : []
  });

  return result.data.data;
};
