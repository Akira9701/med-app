import useUserStore from '@/entities/User/model/user.store';
import ProfileComponent from './components/ProfileComponent/ProfileComponent';
import { LoadingState, EmptyState } from '@/shared/ui/LoadingState';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for user data to be available
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingState message="Загрузка профиля..." />;
  }

  if (!user) {
    return <EmptyState message="Профиль не найден" icon={<User className="h-12 w-12" />} />;
  }

  return (
    <div className="relative">
      <ProfileComponent user={user} />
    </div>
  );
};

export default ProfilePage;
