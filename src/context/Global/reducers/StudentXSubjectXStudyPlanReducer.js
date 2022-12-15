export default (state, action) => {
  switch(action.type) {
    case 'ADD_STUDENT_X_SUBJECTS_X_STUDY_PLAN':
      const sxsxsp = action.payload;
      const newStudentXSubjectsXStudyPlan = state.studentxsubjectsxstudyplan;
      newStudentXSubjectsXStudyPlan.push(sxsxsp);
      return {
        ...state,
        studentxsubjectsxstudyplan: newStudentXSubjectsXStudyPlan
      };
    case 'UPDATE_STUDENT_X_SUBJECTS_X_STUDY_PLAN':
      return state;
    case 'DELETE_STUDENT_X_SUBJECTS_X_STUDY_PLAN':
      return state;
    case 'GET_STUDENT_X_SUBJECTS_X_STUDY_PLAN':
      return {
        ...state,
        studentxsubjectsxstudyplan: action.payload
      };
    default:
      return state;
  }
};

