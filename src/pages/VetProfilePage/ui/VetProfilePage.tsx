import useVetsStore from '@/entities/Vets/model/vets.store';
import { useLocation } from 'react-router';
import { CardTitle, CardContent } from '@/shared/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import Typography from '@/shared/ui/Typography/ui/Typography';
import { Badge } from '@/shared/ui/badge';
import { LoadingState, EmptyState } from '@/shared/ui/LoadingState';
import { Stethoscope, Mail, MapPin, Building, Award, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

const VetProfilePage = () => {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const vet = useVetsStore((state) => state.vets?.find((vet) => vet.id === id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for data to be available
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingState message="Загрузка информации о ветеринаре..." />;
  }

  if (!vet) {
    return (
      <EmptyState message="Ветеринар не найден" icon={<Stethoscope className="h-12 w-12" />} />
    );
  }

  return (
    <div className="flex flex-col p-4 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 pt-8 pb-20 px-6 relative">
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-800 to-transparent" />
        </div>

        {/* Avatar and name section */}
        <div className="relative px-6 pb-4 flex flex-col items-center -mt-16">
          <Avatar className="size-32 border-4 border-white dark:border-gray-800 shadow-md mb-4">
            <AvatarImage src={vet.avatarUrl} alt={`${vet.firstName || ''} ${vet.lastName || ''}`} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {vet.firstName?.[0] || ''}
              {vet.lastName?.[0] || ''}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-2xl font-bold text-center">
            {vet.firstName || ''} {vet.lastName || ''}
          </CardTitle>

          {vet.specialization && (
            <div className="mt-2">
              <Badge className="px-3 py-1" variant="secondary">
                {vet.specialization}
              </Badge>
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100 dark:bg-gray-700 mx-6" />

        {/* Content sections */}
        <CardContent className="p-6">
          <div className="space-y-6">
            {vet.qualification && (
              <div className="flex items-start gap-4 bg-slate-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Typography variant="text-bold" color="primary" className="mb-1.5">
                    Квалификация
                  </Typography>
                  <Typography variant="text-regular" color="secondary">
                    {vet.qualification}
                  </Typography>
                </div>
              </div>
            )}

            {vet.bio && (
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-lg">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Typography variant="text-bold" color="primary" className="mb-1.5">
                    О специалисте
                  </Typography>
                  <Typography variant="text-regular" color="secondary">
                    {vet.bio}
                  </Typography>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {vet.email && (
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-lg">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="text-bold" color="primary" className="mb-1.5">
                      Контакты
                    </Typography>
                    <Typography variant="text-regular" color="secondary">
                      {vet.email}
                    </Typography>
                  </div>
                </div>
              )}

              {vet.clinic && (
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-lg">
                  <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="text-bold" color="primary" className="mb-1.5">
                      Клиника
                    </Typography>
                    <div className="flex items-center gap-2">
                      {vet.clinic.logoUrl && (
                        <img
                          src={vet.clinic.logoUrl}
                          alt={vet.clinic.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                      )}
                      <Typography variant="text-medium" color="primary">
                        {vet.clinic.name}
                      </Typography>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {vet.address && (
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-lg">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Typography variant="text-bold" color="primary" className="mb-1.5">
                    Адрес
                  </Typography>
                  <Typography variant="text-regular" color="secondary">
                    {vet.address.city ? `г. ${vet.address.city}` : ''}
                    {vet.address.street ? `, ул. ${vet.address.street}` : ''}
                    {vet.address.building ? `, ${vet.address.building}` : ''}
                  </Typography>
                </div>
              </div>
            )}

            {vet.services && vet.services.length > 0 && (
              <div className="p-4 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <Typography variant="text-bold" color="primary">
                    Услуги специалиста
                  </Typography>
                </div>
                <div className="flex flex-wrap gap-2">
                  {vet.services.map((service, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1 bg-slate-50 dark:bg-gray-900/50 text-sm">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default VetProfilePage;
