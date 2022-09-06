import { useNavigate } from 'react-router-dom'; 

export const getToken = () => {
  const navigate = useNavigate();

  const token = document.cookie.replace("token=", "");
  
  return token ? token : navigate('/login');
};
