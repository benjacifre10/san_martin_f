export default (state, action) => {
  switch(action.type) {
    case 'ADD_SUBJECTS_X_STUDY_PLAN':
      return state;
    case 'UPDATE_SUBJECTS_X_STUDY_PLAN':
      return state;
    case 'DELETE_SUBJECTS_X_STUDY_PLAN':
      return state;
    case 'GET_SUBJECTS_X_STUDY_PLAN':
      return {
        ...state,
        subjectsxstudyplan: action.payload
      };
    default:
      return state;
  }
};
