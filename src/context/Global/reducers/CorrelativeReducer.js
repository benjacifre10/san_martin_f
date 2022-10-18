export default (state, action) => {
  switch(action.type) {
    case 'ADD_CORRELATIVE':
      const correlatives = action.payload;
      const newCorrelatives = state.correlatives;
      newCorrelatives.push(correlatives);
      return {
        ...state,
        correlatives: newCorrelatives
      };
    case 'GET_CORRELATIVE':
      return {
        ...state,
        correlatives: action.payload
      };
    case 'DELETE_CORRELATIVE':
      return {
        ...state,
        correlatives: []
      };
    default:
      return state;
  }
};
