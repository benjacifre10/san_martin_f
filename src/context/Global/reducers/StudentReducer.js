export default (state, action) => {
  switch(action.type) {
    case 'ADD_STUDENT':
      const student = action.payload;
      const newStudents = state.students;
      newStudents.push(student);
      return {
        ...state,
        students: newStudents
      };
    case 'UPDATE_STUDENT':
      const updatedStudents = state.students.map(s => {
        if (s.ID === action.payload.ID) {
          s.name = action.payload.name;
          s.surname = action.payload.surname;
          s.address = action.payload.address;
          s.phone = action.payload.phone;
          s.cuil = action.payload.cuil;
        }
        return s;
      });
      return {
        ...state,
        students: updatedStudents 
      };
    case 'CHANGE_STATE_STUDENT':
      const changedStudent = state.students.map(s => {
        if (s.ID === action.payload.ID) {
          s.state = action.payload.state;
        }
        return s;
      });
      return {
        ...state,
        students: changedStudent 
      };
    case 'GET_STUDENT':
      return {
        ...state,
        students: action.payload
      };
    case 'GET_STUDENTS':
      return {
        ...state,
        students: action.payload
      };
    default:
      return state;
  }
};
