import clientAxios from '../../../config/axios';

export const addSubject = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  }
  const result = await clientAxios.post('/subject', 
    { 
      name: item.name,
      professorId: item.professor,
      shiftId: item.shift,
      pursueTypeId: item.pursueType,
      creditHours: parseInt(item.creditHours),
      days: item.days,
      from: item.from,
      to: item.to,
    }, options);
  item.ID = result.data.data || '';
 
  dispatch({
    type: 'ADD_SUBJECT',
    payload: item
  });

  return result.data;
};

export const updateSubject = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  };
  const result = await clientAxios.put('/subject', 
    { 
      id: item.ID, 
      name: item.name,
      professorId: item.professor,
      shiftId: item.shift,
      pursueTypeId: item.pursueType,
      creditHours: parseInt(item.creditHours),
      days: item.days,
      from: item.from,
      to: item.to,
    }, options);

  dispatch({
    type: 'UPDATE_SUBJECT',
    payload: item
  });
  
  return result.data;
};

export const deleteSubject = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.delete(`/subject?id=${item.ID}`, {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  if (result.data.code !== 200) return result.data;

  dispatch({
    type: 'DELETE_SUBJECT',
    payload: item
  });

  return result.data;
};

export const getSubject = async (dispatch) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get('/subject', {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });
  
  dispatch({
    type: 'GET_SUBJECT',
    payload: result.data.data
  });

  return result.data.data;
};

