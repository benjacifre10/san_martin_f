import clientAxios from '../../../config/axios';

export const addStudentTest = async (dispatch, item) => {
  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  }
  const result = await clientAxios.post('/studentxtest', 
    { 
      testid: item.testid,
      note: item.note,
      studentsubjectstudyplanid: item.studentsubjectstudyplanid,
    }, options);
  item.ID = result.data.data || '';

  dispatch({
    type: 'ADD_STUDENT_X_TEST',
    payload: item
  });

  return result.data;
};

export const updateStudentTest = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.put('/studentxtest', 
  {
    id: item.ID, note: item.note
  },
  {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  if (result.data.code !== 200) return result.data;

  dispatch({
    type: 'UPDATE_STUDENT_X_TEST',
    payload: item
  });

  return result.data;
};

export const getStudentTest = async (dispatch) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get('/studentxtest', {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });
  
  dispatch({
    type: 'GET_STUDENT_X_TEST',
    payload: result.data.data || []
  });

  return result.data.data;
};


