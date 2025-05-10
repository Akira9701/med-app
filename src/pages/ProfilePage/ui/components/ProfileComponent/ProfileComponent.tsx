import { FC, useState } from 'react';
import { IUser } from '@/entities/User/types';
import { CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import Typography from '@/shared/ui/Typography/ui/Typography';
import { Button } from '@/shared/ui/button';
import authApi from '@/shared/api/auth.api';
import { clearUser, updateUser } from '@/entities/User/model/user.store';
import { useNavigate } from 'react-router';
import { Input } from '@/shared/ui/input';
import userApi from '@/entities/User/api/user.api';

interface IProfileComponentProps {
  user: IUser | null;
}

const ProfileComponent: FC<IProfileComponentProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    avatarUrl: user?.avatarUrl || '',
    city: user?.addressDto?.city || '',
    street: user?.addressDto?.street || '',
    building: user?.addressDto?.building || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        avatarUrl: formData.avatarUrl,
        address: {
          city: formData.city,
          street: formData.street,
          building: formData.building,
        },
      };

      const updatedUser = await userApi.updateProfile(updatedData);
      updateUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="h-full flex flex-col overflow-y-scroll max-h-[85dvh]">
      <div className="flex-1">
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
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="mt-2">
            {isEditing ? 'Отменить' : 'Редактировать профиль'}
          </Button>
        </CardHeader>

        {isEditing ? (
          <CardContent className="mt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography variant="caption2-medium" className="mb-1">
                    Имя
                  </Typography>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Имя"
                  />
                </div>
                <div>
                  <Typography variant="caption2-medium" className="mb-1">
                    Фамилия
                  </Typography>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Фамилия"
                  />
                </div>
              </div>
              <div>
                <Typography variant="caption2-medium" className="mb-1">
                  Телефон
                </Typography>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Телефон"
                />
              </div>
              <div>
                <Typography variant="caption2-medium" className="mb-1">
                  Ссылка на аватар
                </Typography>
                <Input
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleInputChange}
                  placeholder="URL аватара"
                />
              </div>
              <Typography variant="text-bold" color="primary" className="mt-2">
                Адрес
              </Typography>
              <div>
                <Typography variant="caption2-medium" className="mb-1">
                  Город
                </Typography>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Город"
                />
              </div>
              <div>
                <Typography variant="caption2-medium" className="mb-1">
                  Улица
                </Typography>
                <Input
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Улица"
                />
              </div>
              <div>
                <Typography variant="caption2-medium" className="mb-1">
                  Дом
                </Typography>
                <Input
                  name="building"
                  value={formData.building}
                  onChange={handleInputChange}
                  placeholder="Дом"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
