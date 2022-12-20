import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Protected from './utils/Protected';
import Logout from './utils/Logout';

import Login from './screens/Login/Login';
import Main from './screens/Main/Main';
import Degree from './screens/Degree/Degree';
import EnrollFinalTest from './screens/EnrollFinalTest/EnrollFinalTest';
import EnrollSubject from './screens/EnrollSubject/EnrollSubject';
import EnrollTest from './screens/EnrollTest/EnrollTest';
import Students from './screens/Students/Students';
import Roles from './screens/Roles/Roles';
import Shift from './screens/Shift/Shift';
import StudyPlan from './screens/StudyPlan/StudyPlan';
import Subject from './screens/Subject/Subject';
import Test from './screens/Test/Test';
import TestNote from './screens/TestNote/TestNote';
import TestType from './screens/TestType/TestType';
import PursueType from './screens/PursueType/PursueType';
import PasswordBlank from './screens/PasswordBlank/PasswordBlank';
import PasswordChange from './screens/PasswordChange/PasswordChange';
import Professor from './screens/Professor/Professor';
import Users from './screens/Users/Users';
import Home from './screens/Home/Home';
import Layout from './components/Layout/Layout';
import Help from './screens/Help/Help';

const App = () => {


  const routes = (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/main" element={<Protected><Main/></Protected>} />
      <Route exact path="/users" element={<Protected><Users/></Protected>} />
      <Route exact path="/roles" element={<Protected><Roles/></Protected>} />
      <Route exact path="/shift" element={<Protected><Shift/></Protected>} />
      <Route exact path="/studyplan" element={<Protected><StudyPlan/></Protected>} />
      <Route exact path="/test" element={<Protected><Test/></Protected>} />
      <Route exact path="/test/note" element={<Protected><TestNote/></Protected>} />
      <Route exact path="/testtype" element={<Protected><TestType/></Protected>} />
      <Route exact path="/pursuetype" element={<Protected><PursueType/></Protected>} />
      <Route exact path="/passwordblank" element={<Protected><PasswordBlank/></Protected>} />
      <Route exact path="/passwordchange" element={<Protected><PasswordChange/></Protected>} />
      <Route exact path="/professor" element={<Protected><Professor/></Protected>} />
      <Route exact path="/students" element={<Protected><Students/></Protected>} />
      <Route exact path="/subject" element={<Protected><Subject/></Protected>} />
      <Route exact path="/degree" element={<Protected><Degree/></Protected>} />
      <Route exact path="/enroll/final" element={<Protected><EnrollFinalTest/></Protected>} />
      <Route exact path="/enroll/subject" element={<Protected><EnrollSubject/></Protected>} />
      <Route exact path="/enroll/test" element={<Protected><EnrollTest/></Protected>} />
      <Route exact path="/help" element={<Help/>} />
    </Routes>
  );
  return (
      <Layout>
        {routes} 
      </Layout>
  );
}

export default App;
