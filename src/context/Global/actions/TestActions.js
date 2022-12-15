import clientAxios from '../../../config/axios';

export const addTest = async (dispatch, item) => {
  console.log('item', item);
  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  }
  const result = await clientAxios.post('/test', 
    { 
      testdate: item.testDate,
      sheet: item.sheet,
      form: item.form,
      subjectstudyplanid: item.subjectXStudyPlanId,
      professorid: item.professorId,
      testtypeid: item.testTypeId
    }, options);
  item.ID = result.data.data || '';

  console.log('resultado del action', result);
 
  dispatch({
    type: 'ADD_TEST',
    payload: item
  });

  return result.data;
};

export const deleteTest = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.delete(`/test?id=${item.ID}`, {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  if (result.data.code !== 200) return result.data;

  dispatch({
    type: 'DELETE_TEST',
    payload: item
  });

  return result.data;
};

export const getTest = async (dispatch) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get('/test', {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });
  
  dispatch({
    type: 'GET_TEST',
    payload: result.data.data || []
  });

  return result.data.data;
};

