import React, { useContext, useReducer } from 'react';

import { GlobalContext } from './GlobalContext';
import combineReducers from './reducers';
import CorrelativeReducer from './reducers/CorrelativeReducer';
import DegreeReducer from './reducers/DegreeReducer';
import ProfessorReducer from './reducers/ProfessorReducer';
import PursueTypeReducer from './reducers/PursueTypeReducer';
import RoleReducer from './reducers/RoleReducer';
import ShiftReducer from './reducers/ShiftReducer';
import StudyPlanReducer from './reducers/StudyPlanReducer';
import SubjectReducer from './reducers/SubjectReducer';
import SubjectXStudyPlanReducer from './reducers/SubjectXStudyPlanReducer';
import StudentReducer from './reducers/StudentReducer';
import StudentXSubjectXStudyPlanReducer from './reducers/StudentXSubjectXStudyPlanReducer';
import StudentXTestReducer from './reducers/StudentXTestReducer';
import TestReducer from './reducers/TestReducer';
import TestTypeReducer from './reducers/TestTypeReducer';
import UserReducer  from './reducers/UserReducer';
import { GlobalState } from './GlobalState';

export const useGlobal = () => {
  const { state, dispatch } = useContext(GlobalContext);
  return [state, dispatch];
};

export const GlobalProvider = ({ children }) => {

  const GlobalReducer = combineReducers({
    correlatives: CorrelativeReducer,
    degrees: DegreeReducer,
    professors: ProfessorReducer,
    pursuetypes: PursueTypeReducer,
    roles: RoleReducer,
    shifts: ShiftReducer,
    studyplans: StudyPlanReducer,
    subjects: SubjectReducer,
    subjectsxstudyplan: SubjectXStudyPlanReducer,
    students: StudentReducer,
    studentxsubjectsxstudyplan: StudentXSubjectXStudyPlanReducer,
    studentxtest: StudentXTestReducer,
    test: TestReducer,
    testtypes: TestTypeReducer,
    users: UserReducer,
  });

  const [state, dispatch] = useReducer(GlobalReducer, GlobalState);

  return (
    <GlobalContext.Provider value = {{
      state: state,
      dispatch: dispatch
    }}>
      { children }
    </GlobalContext.Provider>
  );  
};
