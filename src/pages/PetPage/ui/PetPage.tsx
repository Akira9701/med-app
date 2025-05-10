import petApi from '@/entities/Pet/api/pet.api';
import { IPet } from '@/entities/Pet/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { LoadingState, EmptyState } from '@/shared/ui/LoadingState';
import { PawPrint, Edit2, Save, Calendar, Dna, Badge, X } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { EPetType } from '@/shared/constants/pet.constants';

const PetPage = () => {
  const location = useLocation();
  const [pet, setPet] = useState<IPet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPet, setEditedPet] = useState<IPet | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        setError(false);
        const petId = location.pathname.split('/').pop();
        if (petId) {
          const petData = await petApi.getPetById(petId);
          setPet(petData);
          setEditedPet(petData);
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

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset to original data when canceling edit
      setEditedPet(pet);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedPet) {
      setEditedPet({
        ...editedPet,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    if (!editedPet || !pet) return;

    try {
      setSaving(true);
      const petId = location.pathname.split('/').pop();
      if (petId) {
        const updatedPet = await petApi.updatePet(petId, editedPet);
        setPet(updatedPet);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update pet:', error);
    } finally {
      setSaving(false);
    }
  };

  // Функция для получения иконки типа животного
  const getPetTypeIcon = (type: EPetType) => {
    switch (type) {
      case EPetType.DOG:
        return '🐕';
      case EPetType.CAT:
        return '🐈';
      case EPetType.BIRD:
        return '🦜';
      case EPetType.RODENT:
        return '🐹';
      case EPetType.REPTILE:
        return '🦎';
      default:
        return '🐾';
    }
  };

  // Функция для получения названия типа животного
  const getPetTypeName = (type: EPetType) => {
    switch (type) {
      case EPetType.DOG:
        return 'Собака';
      case EPetType.CAT:
        return 'Кошка';
      case EPetType.BIRD:
        return 'Птица';
      case EPetType.RODENT:
        return 'Грызун';
      case EPetType.REPTILE:
        return 'Рептилия';
      default:
        return 'Другое';
    }
  };

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
    <div className="flex flex-col gap-4 p-3 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Pet avatar */}
          <div className="flex items-center justify-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 md:w-1/4">
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-primary/20 text-5xl shadow-inner">
              {getPetTypeIcon(pet.type)}
            </div>
          </div>

          {/* Right side - Pet info */}
          <div className="flex-1 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Профиль питомца</h3>
            </div>

            {/* Pet name */}
            <div className="mb-4">
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={editedPet?.name || ''}
                  onChange={handleInputChange}
                  className="text-xl font-bold h-10 px-3"
                  placeholder="Имя питомца"
                />
              ) : (
                <h2 className="text-xl font-bold h-10 flex items-center">{pet.name}</h2>
              )}
            </div>

            {/* Pet details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type */}
              <div className="flex items-center gap-3 h-14">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                  <PawPrint className="h-5 w-5 text-primary" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Тип</p>
                  <p className="text-sm font-medium">{getPetTypeName(pet.type)}</p>
                </div>
              </div>

              {/* Breed */}
              <div className="flex items-center gap-3 h-14">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                  <Dna className="h-5 w-5 text-primary" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Порода</p>
                  {isEditing ? (
                    <Input
                      id="breed"
                      name="breed"
                      value={editedPet?.breed || ''}
                      onChange={handleInputChange}
                      className="h-8 text-sm"
                      placeholder="Порода"
                    />
                  ) : (
                    <p className="text-sm font-medium h-8 flex items-center">{pet.breed}</p>
                  )}
                </div>
              </div>

              {/* Birth date */}
              <div className="flex items-center gap-3 h-14">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Дата рождения</p>
                  {isEditing ? (
                    <Input
                      id="birthDate"
                      name="birthDate"
                      value={editedPet?.birthDate || ''}
                      onChange={handleInputChange}
                      className="h-8 text-sm"
                      placeholder="Дата рождения"
                    />
                  ) : (
                    <p className="text-sm font-medium h-8 flex items-center">{pet.birthDate}</p>
                  )}
                </div>
              </div>

              {/* Chip number */}
              <div className="flex items-center gap-3 h-14">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 flex-shrink-0">
                  <Badge className="h-5 w-5 text-primary" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Номер чипа</p>
                  {isEditing ? (
                    <Input
                      id="chipNumber"
                      name="chipNumber"
                      value={editedPet?.chipNumber || ''}
                      onChange={handleInputChange}
                      className="h-8 text-sm"
                      placeholder="Номер чипа"
                    />
                  ) : (
                    <p className="text-sm font-medium h-8 flex items-center">
                      {pet.chipNumber || '—'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Save button */}
            {isEditing && (
              <Button
                onClick={handleSave}
                variant="default"
                size="default"
                disabled={saving}
                className="mt-4">
                <Save className="h-3.5 w-3.5 mr-1.5" /> {saving ? 'Сохранение...' : 'Сохранить'}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={handleEditToggle}
        variant={isEditing ? 'outline' : 'default'}
        size="sm"
        className="min-w-[120px] mt-2">
        {isEditing ? (
          <>
            <X className="h-3.5 w-3.5 mr-1.5" /> Отменить
          </>
        ) : (
          <>
            <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Редактировать
          </>
        )}
      </Button>
    </div>
  );
};

export default PetPage;
