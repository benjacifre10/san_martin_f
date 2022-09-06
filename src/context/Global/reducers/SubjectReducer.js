export default (state, action) => {
  switch(action.type) {
    case 'ADD_SUBJECT':
      const subject = action.payload;
      const newSubjects = state.subjects;
      newSubjects.push(subject);
      return {
        ...state,
        subjects: newSubjects
      };
    case 'UPDATE_SUBJECT':
      const updatedSubjects = state.subjects.map(s => {
        if (s.ID === action.payload.ID) {
          s.name = action.payload.name;
          s.professorId = action.payload.professorId;
          s.shiftId = action.payload.shiftId;
          s.pursueTypeId = action.payload.pursueTypeId;
          s.creditHours = action.payload.creditHours;
          s.days = action.payload.days;
          s.from = action.payload.from;
          s.to = action.payload.to;
        }
        return s;
      });
      return {
        ...state,
        subjects: updatedSubjects 
      };
    case 'DELETE_SUBJECT':
      const deletedSubjects = state.subjects.filter(f => f.ID !== action.payload.ID)
      return {
        ...state,
        subjects: deletedSubjects
      };
    case 'GET_SUBJECT':
      return {
        ...state,
        subjects: action.payload
      };
    default:
      return state;
  }
};

