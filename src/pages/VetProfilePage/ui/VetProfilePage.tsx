import useVetsStore from '@/entities/Vets/model/vets.store';
import { useLocation } from 'react-router';
import { CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import Typography from '@/shared/ui/Typography/ui/Typography';
import { Badge } from '@/shared/ui/badge';

const VetProfilePage = () => {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const vet = useVetsStore((state) => state.vets?.find((vet) => vet.id === id));

  if (!vet) {
    return <div className="flex items-center justify-center h-full">Ветеринар не найден</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-sm flex-1">
        <CardHeader className="flex flex-col items-center gap-3 border-b pb-6 pt-4">
          <Avatar className="size-28 mb-2 border-2 border-primary/20">
            <AvatarImage src={vet.avatarUrl} alt={`${vet.firstName || ''} ${vet.lastName || ''}`} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg">
              {vet.firstName?.[0] || ''}
              {vet.lastName?.[0] || ''}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold text-center">
            {vet.firstName || ''} {vet.lastName || ''}
          </CardTitle>
          {vet.specialization && (
            <Badge className="px-3 py-1" variant="secondary">
              {vet.specialization}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-5 mt-4 pb-6">
          {vet.qualification && (
            <div className="bg-slate-50 p-3 rounded-md">
              <Typography variant="text-bold" color="primary" className="mb-1">
                Квалификация
              </Typography>
              <Typography variant="text-regular" color="secondary">
                {vet.qualification}
              </Typography>
            </div>
          )}

          {vet.bio && (
            <div>
              <Typography variant="text-bold" color="primary" className="mb-1">
                О специалисте
              </Typography>
              <Typography variant="text-regular" color="secondary">
                {vet.bio}
              </Typography>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vet.email && (
              <div className="border border-slate-100 p-3 rounded-md">
                <Typography variant="text-bold" color="primary" className="mb-1">
                  Контакты
                </Typography>
                <Typography variant="text-regular" color="secondary">
                  Email: {vet.email}
                </Typography>
              </div>
            )}

            {vet.clinic && (
              <div className="border border-slate-100 p-3 rounded-md">
                <Typography variant="text-bold" color="primary" className="mb-1">
                  Клиника
                </Typography>
                <div className="flex items-center gap-2">
                  {vet.clinic.logoUrl && (
                    <img
                      src={vet.clinic.logoUrl}
                      alt={vet.clinic.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                  )}
                  <Typography variant="text-medium" color="primary">
                    {vet.clinic.name}
                  </Typography>
                </div>
              </div>
            )}
          </div>

          {vet.address && (
            <div className="border border-slate-100 p-3 rounded-md">
              <Typography variant="text-bold" color="primary" className="mb-1">
                Адрес
              </Typography>
              <Typography variant="text-regular" color="secondary">
                {vet.address.city ? `г. ${vet.address.city}` : ''}
                {vet.address.street ? `, ул. ${vet.address.street}` : ''}
                {vet.address.building ? `, ${vet.address.building}` : ''}
              </Typography>
            </div>
          )}

          {vet.services && vet.services.length > 0 && (
            <div>
              <Typography variant="text-bold" color="primary" className="mb-2">
                Услуги
              </Typography>
              <div className="flex flex-wrap gap-2">
                {vet.services.map((service, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default VetProfilePage;
