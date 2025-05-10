import { IUser } from '../types';
import apiInstance from '@/shared/api/api.instance';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
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
};

export default userApi;
