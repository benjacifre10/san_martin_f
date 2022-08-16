export default (state, action) => {
  switch(action.type) {
    case 'ADD_PROFESSOR':
      const professor = action.payload;
      const newProfessors = state.professors;
      newProfessors.push(professor);
      return {
        ...state,
        professors: newProfessors
      };
    case 'UPDATE_PROFESSOR':
      const updatedProfessors = state.professors.map(p => {
        if (p.ID === action.payload.ID) {
          p.name = action.payload.name;
          p.surname = action.payload.surname;
        }
        return p;
      });
      return {
        ...state,
        professors: updatedProfessors 
      };
    case 'DELETE_PROFESSOR':
      const deletedProfessors = state.professors.filter(f => f.ID !== action.payload.ID)
      return {
        ...state,
        professors: deletedProfessors
      };
    case 'GET_PROFESSOR':
      return {
        ...state,
        professors: action.payload
      };
    default:
      return state;
  }
};

