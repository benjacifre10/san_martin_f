export default (state, action) => {
  switch(action.type) {
    case 'ADD_STUDENT_X_TEST':
      const studentxtest = action.payload;
      const newStudentTest = state.studentxtest;
      newStudentTest.push(studentxtest);
      return {
        ...state,
        studentxtest: newStudentTest
      };
    case 'UPDATE_STUDENT_X_TEST':
      const updatedStudentXTest = state.studentxtest.map(s => {
        if (s.ID === action.payload.ID) {
          s.note = action.payload.note;
        }
        return s;
      });
      return {
        ...state,
        studentxtest: updatedStudentXTest 
      };
    case 'GET_STUDENT_X_TEST':
      return {
        ...state,
        studentxtest: action.payload
      };
    default:
      return state;
  }
};


