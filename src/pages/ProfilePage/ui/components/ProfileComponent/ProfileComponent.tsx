import { FC, useCallback, useRef, useState } from 'react';
import { IUser } from '@/entities/User/types';

interface IProfileComponentProps {
  user: IUser;
}

const ProfileComponent: FC<IProfileComponentProps> = ({ user }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
  const userDataRef = useRef<Partial<IUser>>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: vet?.email,
    specialization: vet?.specialization,
    avatarUrl: vet?.avatarUrl,
  });

  const handleChange = useCallback(
    (key: VetPageChangeHandlerKey, value: string) => {
      if (key === 'address') {
        userDataRef.current.address = userDataRef.current.address || {
          city: '',
          street: '',
          building: '',
        };
        userDataRef.current.address[key as keyof typeof userDataRef.current.address] = value; // Now you can safely assign
        return;
      }
      userDataRef.current[key] = value;
      if (!isSomeDataChanged) {
        console.log(isSomeDataChanged);
        setIsSomeDataChanged(true);
      }
    },
    [isSomeDataChanged],
  );

  return <></>;
};

export default ProfileComponent;
