import { FC, useCallback, useRef, useState } from 'react';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { IVet } from '@/entities/Vets/types';
import { VetPageChangeHandlerKey } from '@/types/profilePages.types';

interface IProfileComponentProps {
  vet: IVet;
}

const ProfileComponent: FC<IProfileComponentProps> = ({ vet }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isSomeDataChanged, setIsSomeDataChanged] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>(vet?.services || []);
  const userDataRef = useRef<Partial<IVet>>({
    firstName: vet?.firstName,
    lastName: vet?.lastName,
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
