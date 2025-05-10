import ProfilePage from '@/pages/ProfilePage/ui/ProfilePage';
import { createBrowserRouter } from 'react-router';
import {
  loginRoute,
  petCreateRoute,
  petDetailRoute,
  petsRoute,
  profileRoute,
  registerRoute,
  rootRoute,
  vetDetailRoute,
  vetsRoute,
} from './lib/constants';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import Root from './root';
import VetsListPage from '@/pages/VetsListPage';
import VetProfilePage from '@/pages/VetProfilePage/ui/VetProfilePage';
import PetsPage from '@/pages/PetsPage';
import CreatePetPage from '@/pages/CreatePetPage';
import PetPage from '@/pages/PetPage/ui/PetPage';

const router = createBrowserRouter([
  {
    path: rootRoute,
    element: <Root />,
    children: [
      {
        path: profileRoute,
        element: <ProfilePage />,
      },
      {
        path: loginRoute,
        element: <LoginPage />,
      },
      {
        path: registerRoute,
        element: <RegisterPage />,
      },
      {
        path: vetsRoute,
        element: <VetsListPage />,
      },
      {
        path: vetDetailRoute,
        element: <VetProfilePage />,
      },
      {
        path: petsRoute,
        element: <PetsPage />,
      },
      {
        path: petDetailRoute,
        element: <PetPage />,
      },
      {
        path: petCreateRoute,
        element: <CreatePetPage />,
      },
    ],
  },
]);

export default router;
