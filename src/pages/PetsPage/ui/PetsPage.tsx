import { useEffect } from 'react';
import usePetStore, { fetchPets, setSelectedPet } from '@/entities/Pet/model/pet.store';
import { useNavigate } from 'react-router';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { PlusIcon, PawPrint } from 'lucide-react';
import { LoadingState, EmptyState } from '@/shared/ui/LoadingState';

const PetsPage = () => {
  const navigate = useNavigate();
  const pets = usePetStore((state) => state.pets);
  const loading = usePetStore((state) => state.loading);

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center border-b pb-2 ">
        <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Список питомцев
        </h2>
        <Button onClick={() => navigate('/pets/create')} className="flex items-center gap-2">
          <PlusIcon size={18} />
        </Button>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto flex-1">
        {loading ? (
          <LoadingState message="Загрузка питомцев..." />
        ) : pets && pets.length > 0 ? (
          pets.map((pet) => (
            <div
              key={pet.id}
              className="br-8 rounded-lg border-gray-200 w-full border p-4 flex-1 cursor-pointer"
              onClick={() => {
                setSelectedPet(pet);
                navigate(`/pets/${pet.id}`);
              }}>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarFallback>{pet.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{pet.name}</h3>
                  <p className="text-sm text-gray-500">
                    {pet.breed} • {pet.type}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            message="У вас пока нет добавленных питомцев"
            icon={<PawPrint className="h-12 w-12" />}
          />
        )}
      </div>
    </div>
  );
};

export default PetsPage;
