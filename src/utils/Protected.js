import React from 'react';
import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {

  const response = isLoggedIn ? <Navigate to ="/" replace /> : children;

  return response;
};

export default Protected;
