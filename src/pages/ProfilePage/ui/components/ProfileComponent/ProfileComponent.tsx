import { FC } from 'react';
import { IUser } from '@/entities/User/types';
import { CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import Typography from '@/shared/ui/Typography/ui/Typography';
import { Button } from '@/shared/ui/button';
import authApi from '@/shared/api/auth.api';
import { clearUser } from '@/entities/User/model/user.store';
import { useNavigate } from 'react-router';

interface IProfileComponentProps {
  user: IUser | null;
}

const ProfileComponent: FC<IProfileComponentProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div className="">
      <div>
        <CardHeader className="flex flex-col items-center gap-2 border-b pb-6">
          <Avatar className="size-24 mb-2">
            <AvatarImage src={user.avatarUrl} alt={user.firstName + ' ' + user.lastName} />
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold text-center">
            {user.firstName} {user.lastName}
          </CardTitle>
          <Typography variant="text-regular" color="secondary" className="text-center">
            ID: {user.userId}
          </Typography>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-4">
          <div>
            <Typography variant="text-medium" color="primary">
              <span className="font-semibold">Телефон:</span> {user.phone}
            </Typography>
          </div>
          <div>
            <Typography variant="text-medium" color="primary">
              <span className="font-semibold">Адрес:</span> {user.addressDto?.city},{' '}
              {user.addressDto?.street}, {user.addressDto?.building}
            </Typography>
          </div>
          <div>
            <Typography variant="text-bold" color="primary" className="mb-1">
              Питомцы:
            </Typography>
            {user?.pets?.length === 0 ? (
              <Typography
                variant="caption2-medium"
                color="secondary"
                className="text-muted-foreground">
                Нет питомцев
              </Typography>
            ) : (
              <ul className="flex flex-col gap-2">
                {user?.pets?.map((pet) => (
                  <li key={pet.id} className="flex items-center gap-2">
                    <span className="font-medium">{pet.name}</span>
                    <Badge variant="secondary">{pet.type}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button variant="destructive" className="mt-4" onClick={handleLogout}>
            Выйти
          </Button>
        </CardContent>
      </div>
    </div>
  );
};

export default ProfileComponent;
