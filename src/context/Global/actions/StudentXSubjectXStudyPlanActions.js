import clientAxios from '../../../config/axios';

export const addStudentXSubjectsXStudyPlan = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    },
  }
  const result = await clientAxios.post('/studentxsubjectxplan', 
    { 
      finalnote: item.finalnote,
      approved: item.approved,
      subjectstudyplanid: item.subjectstudyplanid,
      studentid: item.studentid,
    }, options);
  item.ID = result.data.data || '';
 
  dispatch({
    type: 'ADD_STUDENT_X_SUBJECTS_X_STUDY_PLAN',
    payload: item
  });

  return result.data;
};

export const getStudentXSubjectsXStudyPlan = async (dispatch, item) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get(`/studentxsubjectxplan?studentid=${item.ID}`, {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });
  
  dispatch({
    type: 'GET_STUDENT_X_SUBJECTS_X_STUDY_PLAN',
    payload: result.data.data || []
  });

  return result.data.data;
};

export const updateStudentXSubjectsXStudyPlan = async (dispatch, item) => {

  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.put('/studentxsubjectxplan', 
  {
    id: item.ID, finalnote: item.finalnote
  },
  {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  if (result.data.code !== 200) return result.data;

  dispatch({
    type: 'UPDATE_STUDENT_X_SUBJECTS_X_STUDY_PLAN',
    payload: item
  });

  return result.data;
};
