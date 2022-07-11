import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import lodash from 'lodash';

import { useGlobal } from "./../context/Global/GlobalProvider";
import { logout } from './../context/Global/actions/UserActions';

const Logout = () => {

  const [globalState, globalDispatch] = useGlobal();

  useEffect(() => {
    if (!lodash.isEmpty(globalState.userLogin)) {
      logout(globalDispatch, {});   
    }
  }, [])

  return <Navigate to ="/" replace />;

};

export default Logout;
