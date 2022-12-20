export default (state, action) => {
  switch(action.type) {
    case 'ADD_TEST':
      const test = action.payload;
      const newTest = state.test;
      newTest.push(test);
      return {
        ...state,
        test: newTest
      };
    case 'DELETE_TEST':
      const deletedTest = state.test.filter(f => f.ID !== action.payload.ID)
      return {
        ...state,
        test: deletedTest
      };
    case 'GET_TEST':
      return {
        ...state,
        test: action.payload
      };
    default:
      return state;
  }
};

