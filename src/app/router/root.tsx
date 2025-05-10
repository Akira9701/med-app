import { Outlet } from 'react-router';

import { useEffect, useMemo } from 'react';
import { loginRoute, profileRoute, rootRoute } from './lib/constants';
import { useNavigate } from 'react-router';
import PageLoader from '@/widgets/PageLoader/ui/PageLoader';
import useUserStore, { setUser } from '@/entities/User/model/user.store';
import userApi from '@/entities/User/api/user.api';
import { delay } from '@/shared/lib/utils/delay.utils';
import useAuthStore, { setIsShowLoader } from '@/entities/Auth/model/auth.store';
import { Toaster } from 'sonner';
import authToken from '@/shared/localstorage/authToken';
import { Home } from 'lucide-react';
import AuthProvider from '../providers/AuthProvider';
import { IUser } from '@/entities/User/types';

const Root = () => {
  const navigate = useNavigate();
  const isShowLoader = useAuthStore((state) => state.isShowLoader);
  const isUser = useUserStore((state) => !!state.user);

  const rootItems = useMemo(
    () => [
      {
        title: 'Profile',
        url: profileRoute,
        icon: Home,
      },
    ],
    [],
  );

  // TODO: пересмотреть авторизацию

  useEffect(() => {
    const token = authToken.get();
    if (!token) {
      navigate(loginRoute);
      delay(1000).then(() => {
        setIsShowLoader(false);
      });
    } else {
      userApi
        .getUser()
        .then((user) => {
          delay(300)
            .then(() => {
              navigate(rootRoute);
              setUser<IUser | null>(user);
            })
            .then(() => {
              delay(400).then(() => {
                setIsShowLoader(false);
              });
            });
        })
        .catch(() => {
          setIsShowLoader(false);
          navigate(loginRoute);
        });
    }
  }, []);
  return (
    <AuthProvider>
      <Toaster />
      {<PageLoader isShow={isShowLoader} />}

      {!isShowLoader && isUser ? (
        <>
          <main className="flex-1 p-4 h-dvh w-dvw flex flex-col gap-4">
            <div className="br-8 rounded-lg border-gray-200 w-full border p-4 flex-1">
              <Outlet />
            </div>
            <div className="h-[70px] br-8 rounded-lg border-gray-200 w-full border p-2 "></div>
          </main>
        </>
      ) : (
        <>
          {' '}
          <Outlet />
        </>
      )}
    </AuthProvider>
  );
};

export default Root;
