import useUserStore from '@/entities/User/model/user.store';

import { IVet } from '@/entities/Vets/types';
import ProfileComponent from './components/ProfileComponent/ProfileComponent';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);

  return <div className="relative">{<ProfileComponent user={user} />}</div>;
};

export default ProfilePage;
