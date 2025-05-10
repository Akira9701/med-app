import vetsApi from '@/entities/Vets/api';
import { setVets } from '@/entities/Vets/model/vets.store';
import { useEffect } from 'react';
import useVetsStore from '@/entities/Vets/model/vets.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { useNavigate } from 'react-router';
const VetsListPage = () => {
  const navigate = useNavigate();
  const vets = useVetsStore((state) => state.vets);
  useEffect(() => {
    vetsApi.getVets().then((vets) => {
      setVets(vets);
    });
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Список ветеринаров
      </h2>
      <div className="flex flex-col gap-4 overflow-y-auto flex-1">
        {vets?.map((vet) => (
          <div
            key={vet.id}
            className="br-8 rounded-lg border-gray-200 w-full border p-4 flex-1"
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
        ))}
      </div>
    </div>
  );
};

export default VetsListPage;
