import { rootRoute } from '@/app/router/lib/constants';
import { useNavigate } from 'react-router';
import LoginForm from './components/LoginForm';
import userApi from '@/entities/User/api/user.api';
import { setUser } from '@/entities/User/model/user.store';
import { delay } from '@/shared/lib/utils/delay.utils';
import { useState } from 'react';
import { setIsShowLoader } from '@/entities/Auth/model/auth.store';
import { toast } from 'sonner';
import authApi from '@/shared/api/auth.api';
import authToken from '@/shared/localstorage/authToken';
import { decodeToken } from '@/shared/lib/utils/jwt.utils';
import { IUser } from '@/entities/User/types';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(email: string, password: string) {
    setIsLoading(true);
    try {
      // Authenticate user
      const { token } = await authApi.login(email, password);

      // Set authentication token
      authToken.set(token);

      // Decode the JWT token
      const decodedToken = decodeToken(token);

      if (!decodedToken) {
        throw new Error('Invalid token received');
      }

      const userResponse = await userApi.getUser();
      setUser(userResponse as IUser | null);
      // Determine user type from token

      setIsShowLoader(true);

      await delay(300);
      navigate(rootRoute);
      toast.success('Login successful');
      await delay(400);
      setIsShowLoader(false);
      await delay(400);
      setIsShowLoader(false);
    } catch (error) {
      console.error('Login error', error);
      toast.error('Failed to login. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Handle clinic/vet toggle

  return (
    <>
      <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
    </>
  );
}
