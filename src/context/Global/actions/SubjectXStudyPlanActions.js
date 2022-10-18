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
    payload: result.data.data ? result.data.data : []
  });

  return result.data.data;
};

export const addSubjectsXStudyPlan = async (dispatch, item) => {
  const access_token = document.cookie.replace("token=", "");
  const options = {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  };
  const result = await clientAxios.post('/subjectxplan', {
    SubjectId: item.SubjectId,
    StudyPlanId: item.StudyPlanId,
  }, options);
  item.ID = result.data.data || '';
  dispatch({
    type: 'ADD_SUBJECTS_X_STUDY_PLAN',
    payload: item
  });

  return result.data;
};

export const deleteSubjectsXStudyPlan = async (dispatch, item) => {
  const access_token = document.cookie.replace("token=", "");
  const result = await clientAxios.delete(`/subjectxplan/studyplan?studyplanid=${item}`, {
    headers: {
      'Authorization': `Bearer${access_token}`
    }
  });

  if (result.data.code !== 200) return result.data;
  dispatch({
    type: 'DELETE_SUBJECTS_X_STUDY_PLAN',
    payload: item
  });

  return result.data;
};
