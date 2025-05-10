import useVetsStore from '@/entities/Vets/model/vets.store';
import { useLocation } from 'react-router';
import { CardTitle, CardContent } from '@/shared/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import Typography from '@/shared/ui/Typography/ui/Typography';
import { Badge } from '@/shared/ui/badge';
import { LoadingState, EmptyState } from '@/shared/ui/LoadingState';
import { Stethoscope, Mail, MapPin, Building, Award, Info, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { format } from 'date-fns';

// Интерфейс для формы записи на прием
interface AppointmentForm {
  vetId: string;
  petId: string;
  startTime: string;
  endTime: string;
  notes: string;
}

const VetProfilePage = () => {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const vet = useVetsStore((state) => state.vets?.find((vet) => vet.id === id));
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState<{ id: string; name: string }[]>([]);
  const [isBooking, setIsBooking] = useState(false);

  // Состояние формы записи
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>({
    vetId: id || '',
    petId: '',
    startTime: format(new Date().setHours(9, 0, 0), "yyyy-MM-dd'T'HH:mm"),
    endTime: format(new Date().setHours(10, 0, 0), "yyyy-MM-dd'T'HH:mm"),
    notes: '',
  });

  useEffect(() => {
    // Simulate loading time for data to be available
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Загрузка списка питомцев пользователя
    const fetchPets = async () => {
      try {
        // Здесь будет реальный запрос к API
        // Пока используем моковые данные
        setPets([
          { id: 'pet1', name: 'Барсик' },
          { id: 'pet2', name: 'Шарик' },
          { id: 'pet3', name: 'Пушок' },
        ]);
      } catch (error) {
        console.error('Failed to fetch pets:', error);
      }
    };

    fetchPets();
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePetChange = (value: string) => {
    setAppointmentForm((prev) => ({
      ...prev,
      petId: value,
    }));
  };

  const handleBookAppointment = async () => {
    try {
      setIsBooking(true);
      // Здесь будет реальный запрос к API
      console.log('Booking appointment:', appointmentForm);

      // Имитация запроса к API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Сбросить форму после успешной записи
      setAppointmentForm({
        vetId: id || '',
        petId: '',
        startTime: format(new Date().setHours(9, 0, 0), "yyyy-MM-dd'T'HH:mm"),
        endTime: format(new Date().setHours(10, 0, 0), "yyyy-MM-dd'T'HH:mm"),
        notes: '',
      });

      setIsBooking(false);
      // Здесь можно добавить уведомление об успешной записи
    } catch (error) {
      console.error('Failed to book appointment:', error);
      setIsBooking(false);
      // Здесь можно добавить уведомление об ошибке
    }
  };

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

          {/* Кнопка записи на прием */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="mt-4 gap-2">
                <Calendar className="h-4 w-4" />
                Записаться на прием
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Запись на прием</AlertDialogTitle>
                <AlertDialogDescription>
                  Заполните форму для записи на прием к ветеринару {vet.firstName} {vet.lastName}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="pet" className="text-sm font-medium">
                    Выберите питомца
                  </label>
                  <Select value={appointmentForm.petId} onValueChange={handlePetChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите питомца" />
                    </SelectTrigger>
                    <SelectContent>
                      {pets.map((pet) => (
                        <SelectItem key={pet.id} value={pet.id}>
                          {pet.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="startTime" className="text-sm font-medium">
                    Дата и время начала
                  </label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="datetime-local"
                    value={appointmentForm.startTime}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="endTime" className="text-sm font-medium">
                    Дата и время окончания
                  </label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="datetime-local"
                    value={appointmentForm.endTime}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Комментарий
                  </label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Опишите причину визита"
                    value={appointmentForm.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleBookAppointment}
                  disabled={isBooking || !appointmentForm.petId}>
                  {isBooking ? 'Отправка...' : 'Записаться'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
