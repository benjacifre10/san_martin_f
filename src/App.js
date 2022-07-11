import React from 'react';
import lodash from 'lodash';
import { Routes, Route } from 'react-router-dom';

import { useGlobal } from './context/Global/GlobalProvider';

import Protected from './utils/Protected';
import Logout from './utils/Logout';

import Login from './screens/Login/Login';
import Main from './screens/Main/Main';
import Roles from './screens/Roles/Roles';
import Users from './screens/Users/Users';
import Home from './screens/Home/Home';
import Layout from './components/Layout/Layout';

const App = () => {

  const [globalState] = useGlobal();
  const isLoggedInd = !lodash.isEmpty(globalState.userLogin);

  const routes = (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/logout" element={<Protected isLoggedInd={isLoggedInd}> <Logout /> </Protected>} />
      <Route exact path="/main" element={<Protected isLoggedInd={isLoggedInd}> <Main/> </Protected>} />
      <Route exact path="/roles" element={<Protected isLoggedInd={isLoggedInd}> <Roles/> </Protected>} />
      <Route exact path="/users" element={<Protected isLoggedInd={isLoggedInd}> <Users/> </Protected>} />
    </Routes>
  );
  return (
      <Layout>
        {routes} 
      </Layout>
  );
}

export default App;
