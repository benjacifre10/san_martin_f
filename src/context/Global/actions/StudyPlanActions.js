import clientAxios from '../../../config/axios';

export const addStudyPlan = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  }
  const result = await clientAxios.post('/studyplan', 
    { name: item.name, code: item.code, degreeId: item.degree, state: true }, options);
  item.ID = result.data.data || '';
 
  dispatch({
    type: 'ADD_STUDY_PLAN',
    payload: item
  });

  return result.data;
};

export const updateStudyPlan = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  };
  const result = await clientAxios.put('/studyplan', 
    { id: item.ID, name: item.name }, options);

  dispatch({
    type: 'UPDATE_STUDY_PLAN',
    payload: item
  });
  
  return result.data;
};

export const changeStateStudyPlan = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  };
  const result = await clientAxios.put('/studyplan/state', 
    { id: item.ID, state: item.state }, options);

  if (result.data.code !== 200) return result.data;

  dispatch({
    type: 'CHANGE_STATE_STUDY_PLAN',
    payload: item
  });

  return result.data;
};

export const getStudyPlan = async (dispatch) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get('/studyplan', {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });
  
  dispatch({
    type: 'GET_STUDY_PLAN',
    payload: result.data.data || []
  });

  return result.data.data;
};
