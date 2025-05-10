import vetsApi from '@/entities/Vets/api';
import { setVets } from '@/entities/Vets/model/vets.store';
import { useEffect, useState } from 'react';
import useVetsStore from '@/entities/Vets/model/vets.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useNavigate } from 'react-router';
import { LoadingState, EmptyState } from '@/shared/ui/LoadingState';
import { Stethoscope } from 'lucide-react';

const VetsListPage = () => {
  const navigate = useNavigate();
  const vets = useVetsStore((state) => state.vets);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        setLoading(true);
        const vetsData = await vetsApi.getVets();
        setVets(vetsData);
      } catch (error) {
        console.error('Failed to fetch vets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Список ветеринаров
      </h2>
      <div className="flex flex-col gap-4 overflow-y-auto flex-1">
        {loading ? (
          <LoadingState message="Загрузка ветеринаров..." />
        ) : vets && vets.length > 0 ? (
          vets.map((vet) => (
            <div
              key={vet.id}
              className="br-8 rounded-lg border-gray-200 w-full border p-4 flex-1 cursor-pointer"
              onClick={() => {
                navigate(`/vets/${vet.id}`);
              }}>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarImage src={vet.avatarUrl} alt={vet.firstName} />
                    <AvatarFallback>{vet?.firstName?.[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{vet.firstName}</h3>
                  <p className="text-sm text-gray-500">{vet.specialization}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            message="Список ветеринаров пуст"
            icon={<Stethoscope className="h-12 w-12" />}
          />
        )}
      </div>
    </div>
  );
};

export default VetsListPage;
