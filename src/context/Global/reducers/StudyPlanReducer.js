export default (state, action) => {
  switch(action.type) {
    case 'ADD_STUDY_PLAN':
      const studyPlan = action.payload;
      const newStudyPlans = state.studyplans;
      newStudyPlans.push(studyPlan);
      return {
        ...state,
        studyplans: newStudyPlans
      };
    case 'UPDATE_STUDY_PLAN':
      const updatedStudyPlans = state.studyplans.map(d => {
        if (d.ID === action.payload.ID) {
          d.name = action.payload.name;
        }
        return d;
      });
      return {
        ...state,
        studyplans: updatedStudyPlans 
      };
    case 'CHANGE_STATE_STUDY_PLAN':
      const changedStudyPlans = state.studyplans.map(d => {
        if (d.ID === action.payload.ID) {
          d.state = action.payload.state;
        }
        return d;
      });
      return {
        ...state,
        studyplans: changedStudyPlans 
      };
    case 'GET_STUDY_PLAN':
      return {
        ...state,
        studyplans: action.payload
      };
    default:
      return state;
  }
};
