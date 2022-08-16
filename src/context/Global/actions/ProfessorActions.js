import clientAxios from '../../../config/axios';

export const addProfessor = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  }
  const result = await clientAxios.post('/professor', 
    { name: item.name, surname: item.surname, identityNumber: item.identityNumber }, options);
  item.ID = result.data.data || '';
 
  dispatch({
    type: 'ADD_PROFESSOR',
    payload: item
  });

  return result.data;
};

export const updateProfessor = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  };
  const result = await clientAxios.put('/professor', 
    { id: item.ID, name: item.name, surname: item.surname }, options);

  dispatch({
    type: 'UPDATE_PROFESSOR',
    payload: item
  });
  
  return result.data;
};

export const deleteProfessor = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.delete(`/professor?id=${item.ID}`, {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  if (result.data.code !== 200) return result.data;

  dispatch({
    type: 'DELETE_PROFESSOR',
    payload: item
  });

  return result.data;
};

export const getProfessor = async (dispatch) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get('/professor', {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });
  
  dispatch({
    type: 'GET_PROFESSOR',
    payload: result.data.data
  });

  return result.data.data;
};

