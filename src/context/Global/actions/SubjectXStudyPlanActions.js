import clientAxios from '../../../config/axios';

export const getSubjectsXStudyPlan = async (dispatch, item) => {
  
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.get(`/subjectxplan?studyplanid=${item.id}`, {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });
  
  dispatch({
    type: 'GET_SUBJECTS_X_STUDY_PLAN',
    payload: result.data.data
  });

  return result.data.data;
};
