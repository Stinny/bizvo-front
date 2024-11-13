import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
      //   dispatch(showNotification('You have been logged out'));
      navigate('/login');
    } else if (type === 'delete') {
      //   dispatch(showNotification('Account deleted'));
      navigate('/signup');
    }
  };

  return handleLogoutUser;
};

export default useHandleLogoutUser;
