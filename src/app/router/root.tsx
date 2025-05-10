import { Outlet } from 'react-router';

import { useEffect } from 'react';
import { loginRoute, profileRoute, rootRoute, petsRoute, vetsRoute } from './lib/constants';
import { useNavigate } from 'react-router';
import PageLoader from '@/widgets/PageLoader/ui/PageLoader';
import useUserStore, { setUser } from '@/entities/User/model/user.store';
import userApi from '@/entities/User/api/user.api';
import { delay } from '@/shared/lib/utils/delay.utils';
import useAuthStore, { setIsShowLoader } from '@/entities/Auth/model/auth.store';
import { Toaster } from 'sonner';
import authToken from '@/shared/localstorage/authToken';
import { Home, PawPrint, Stethoscope } from 'lucide-react';
import AuthProvider from '../providers/AuthProvider';
import { IUser } from '@/entities/User/types';
import BottomNav from './ui/BottomNav';

const rootItems = [
  {
    title: 'Profile',
    url: profileRoute,
    icon: Home,
  },
  {
    title: 'Pets',
    url: petsRoute,
    icon: PawPrint,
  },
  {
    title: 'Vets',
    url: vetsRoute,
    icon: Stethoscope,
  },
];

const Root = () => {
  const navigate = useNavigate();
  const isShowLoader = useAuthStore((state) => state.isShowLoader);
  const isUser = useUserStore((state) => !!state.user);

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
          <main className="flex-1 p-4 h-dvh w-dvw flex flex-col gap-4 pb-[80px]">
            <div className="br-8 rounded-lg border-gray-200 w-full border p-4 flex-1">
              <Outlet />
            </div>
          </main>
          <BottomNav items={rootItems} />
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
