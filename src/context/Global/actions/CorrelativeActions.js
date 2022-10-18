import clientAxios from '../../../config/axios';

export const addCorrelative = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  }
  const result = await clientAxios.post('/correlative', { 
    Year: item.year, 
    Correlative: item.correlative,
    SubjectXStudyPlanId: item.subjectxstudyplanid
  }, options);
  item.ID = result.data.data || '';
  dispatch({
    type: 'ADD_CORRELATIVE',
    payload: item
  });

  return result.data;
};

export const getCorrelative = async (dispatch, item) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get(`/correlative?studyplanid=${item.id}`, {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  dispatch({
    type: 'GET_CORRELATIVE',
    payload: result.data.data ? result.data.data : []
  });

  return result.data.data;
};

export const deleteCorrelative = async (dispatch, item) => {
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.delete(`/correlative?studyplanid=${item}`, {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  if (result.data.code !== 200) return result.data;
  dispatch({
    type: 'DELETE_CORRELATIVE',
    payload: item
  });

  return result.data;
};
