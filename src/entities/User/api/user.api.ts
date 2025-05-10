import { IUser } from '../types';
import apiInstance from '@/shared/api/api.instance';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

interface IUpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    city?: string;
    street?: string;
    building?: string;
  };
  avatarUrl?: string;
}

const userApi = {
  getUser: async (): Promise<IUser | null> => {
    const response = await apiInstance.get('/profiles/users/me');
    return response.data;
  },
  createUser: async (user: ICreateUser): Promise<IUser> => {
    const response = await apiInstance.post('/profiles/users/create', {
      ...user,
      userType: 'USER',
    });
    return response.data;
  },
  updateProfile: async (data: IUpdateProfileData): Promise<IUser> => {
    const response = await apiInstance.put('/profiles/users/me', data);
    return response.data;
  },
};

export default userApi;
