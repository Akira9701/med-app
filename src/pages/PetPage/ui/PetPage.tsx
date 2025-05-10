import petApi from '@/entities/Pet/api/pet.api';
import { IPet } from '@/entities/Pet/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { LoadingState, EmptyState } from '@/shared/ui/LoadingState';
import { PawPrint } from 'lucide-react';

const PetPage = () => {
  const location = useLocation();
  const [pet, setPet] = useState<IPet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        setError(false);
        const petId = location.pathname.split('/').pop();
        if (petId) {
          const petData = await petApi.getPetById(petId);
          setPet(petData);
        }
      } catch (error) {
        console.error('Failed to fetch pet:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [location.pathname]);

  if (loading) {
    return <LoadingState message="Загрузка информации о питомце..." />;
  }

  if (error || !pet) {
    return (
      <EmptyState
        message="Не удалось загрузить информацию о питомце"
        icon={<PawPrint className="h-12 w-12" />}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {pet.name}
      </h2>
      <div className="flex flex-col gap-2">
        <p>
          <strong>Тип:</strong> {pet.type}
        </p>
        <p>
          <strong>Порода:</strong> {pet.breed}
        </p>
        <p>
          <strong>Дата рождения:</strong> {pet.birthDate}
        </p>
        {pet.chipNumber && (
          <p>
            <strong>Номер чипа:</strong> {pet.chipNumber}
          </p>
        )}
      </div>
    </div>
  );
};

export default PetPage;
