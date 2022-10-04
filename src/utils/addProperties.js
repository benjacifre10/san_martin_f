export const addPropertyToStudyPlan = (studyplans) => {
  return studyplans.map(st => {
    st["subjects"] = { id: st.ID };
    return st;
  });
};
