import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { GuardProps } from '../../types/auth';

const AuthGuard = ({ children }: GuardProps) => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(user);
  console.log(location);
  useEffect(() => {
    if (!isLoggedIn) {
      console.log('auth guard');
      
      navigate('login', {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    }
  }, [isLoggedIn, navigate, location, user]);

  return children;
};

export default AuthGuard;