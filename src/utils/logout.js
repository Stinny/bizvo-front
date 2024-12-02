import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../api/toastSlice';

const useHandleLogoutUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutUser = (type) => {
    // Remove cookies
    Cookies.remove('currentUser');
    Cookies.remove('aToken');
    Cookies.remove('rToken');
    Cookies.remove('isAuth');

    // Show appropriate notification and navigate
    if (type === 'logout') {
      dispatch(showNotification('Logout Successful'));
      navigate('/login');
    } else if (type === 'delete') {
      dispatch(showNotification('Account Deleted'));
      navigate('/signup');
    }
  };

  return handleLogoutUser;
};

export default useHandleLogoutUser;
