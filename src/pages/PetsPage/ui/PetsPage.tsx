import { useEffect } from 'react';
import usePetStore, { fetchPets, setSelectedPet } from '@/entities/Pet/model/pet.store';
import { useNavigate } from 'react-router';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';

const PetsPage = () => {
  const navigate = useNavigate();
  const pets = usePetStore((state) => state.pets);
  const loading = usePetStore((state) => state.loading);

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Список питомцев
      </h2>
      <div className="flex flex-col gap-4 overflow-y-auto flex-1">
        {loading ? (
          <div>Loading...</div>
        ) : (
          pets?.map((pet) => (
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
        )}
      </div>
    </div>
  );
};

export default PetsPage;
