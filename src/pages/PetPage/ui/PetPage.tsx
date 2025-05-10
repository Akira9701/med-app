import petApi from '@/entities/Pet/api/pet.api';
import { IPet } from '@/entities/Pet/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const PetPage = () => {
  const location = useLocation();
  const [pet, setPet] = useState<IPet | null>(null);

  useEffect(() => {
    const petId = location.pathname.split('/').pop();
    if (petId) {
      petApi.getPetById(petId).then((pet) => {
        setPet(pet);
      });
    }
  }, [location.pathname]);

  console.log(pet);

  return <div>PetPage</div>;
};

export default PetPage;
