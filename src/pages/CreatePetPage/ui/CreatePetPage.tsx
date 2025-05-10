import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { EPetType } from '@/shared/constants/pet.constants';
import petApi from '@/entities/Pet/api/pet.api';
import { toast } from 'sonner';
import { LoadingState } from '@/shared/ui/LoadingState';

const CreatePetPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: EPetType.DOG,
    breed: '',
    birthDate: '',
    chipNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: EPetType) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await petApi.createPet(formData);
      toast.success('Питомец успешно создан');
      navigate('/pets');
    } catch (error) {
      console.error('Failed to create pet:', error);
      toast.error('Не удалось создать питомца');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Создание питомца..." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Добавить питомца
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Имя питомца
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Введите имя питомца"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="text-sm font-medium">
            Тип животного
          </label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleTypeChange(value as EPetType)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип животного" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EPetType.DOG}>Собака</SelectItem>
              <SelectItem value={EPetType.CAT}>Кошка</SelectItem>
              <SelectItem value={EPetType.BIRD}>Птица</SelectItem>
              <SelectItem value={EPetType.RODENT}>Грызун</SelectItem>
              <SelectItem value={EPetType.REPTILE}>Рептилия</SelectItem>
              <SelectItem value={EPetType.OTHER}>Другое</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="breed" className="text-sm font-medium">
            Порода
          </label>
          <Input
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
            placeholder="Введите породу"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="birthDate" className="text-sm font-medium">
            Дата рождения
          </label>
          <Input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="chipNumber" className="text-sm font-medium">
            Номер чипа
          </label>
          <Input
            id="chipNumber"
            name="chipNumber"
            value={formData.chipNumber}
            onChange={handleChange}
            placeholder="Введите номер чипа (если есть)"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Button type="submit">Сохранить</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/pets')}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePetPage;
