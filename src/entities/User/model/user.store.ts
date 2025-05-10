import { create } from 'zustand';
import { IUser } from '../types';

type userType = IUser | null;
interface IUserStore {
  user: userType;
}

const useUserStore = create<IUserStore>(() => ({
  user: null,
}));

export const setUser = <T extends userType>(user: T) => {
  useUserStore.setState({ user });
};

export const updateUser = <T extends userType>(user: Partial<T>) => {
  useUserStore.setState((state) => ({
    user: { ...state.user, ...user } as T,
  }));
};

export const clearUser = () => {
  useUserStore.setState({ user: null });
};

export default useUserStore;
