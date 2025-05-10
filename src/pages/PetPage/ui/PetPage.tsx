import petApi from '@/entities/Pet/api/pet.api';
import { IPet } from '@/entities/Pet/types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { LoadingState, EmptyState } from '@/shared/ui/LoadingState';
import { PawPrint, Edit2, Save, X, Calendar, Dna, Badge } from 'lucide-react';
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
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedPet(pet);
    }
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
    <div className="flex flex-col gap-6 p-4">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold tracking-tight">Профиль питомца</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary/20 text-5xl">
                  {getPetTypeIcon(pet.type)}
                </div>
              </div>

              <div className="flex-1 p-6">
                <h3 className="text-2xl font-bold mb-4">{pet.name}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <PawPrint className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Тип</p>
                      <p className="font-medium">{getPetTypeName(pet.type)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Dna className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Порода</p>
                      <p className="font-medium">{pet.breed}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Дата рождения</p>
                      <p className="font-medium">{pet.birthDate}</p>
                    </div>
                  </div>

                  {pet.chipNumber && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <Badge className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Номер чипа</p>
                        <p className="font-medium">{pet.chipNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button onClick={handleEditToggle} variant="outline" size="sm">
            <Edit2 className="h-4 w-4 mr-2" /> Редактировать
          </Button>
        </>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary/20 text-5xl">
                  {getPetTypeIcon(editedPet?.type || EPetType.DOG)}
                </div>
              </div>
              <div className="flex-1 p-6 min-h-[320px] flex flex-col">
                <div className="mb-4">
                  <Input
                    id="name"
                    name="name"
                    value={editedPet?.name || ''}
                    onChange={handleInputChange}
                    disabled={saving}
                    className="text-2xl font-bold mb-2 h-12 px-4"
                    placeholder="Имя питомца"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <PawPrint className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Тип</p>
                      <select
                        id="type"
                        name="type"
                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
                        value={editedPet?.type || ''}
                        onChange={(e) =>
                          setEditedPet(
                            editedPet ? { ...editedPet, type: e.target.value as EPetType } : null,
                          )
                        }
                        disabled={saving}>
                        {Object.values(EPetType).map((type) => (
                          <option key={type} value={type}>
                            {getPetTypeName(type)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Dna className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Порода</p>
                      <Input
                        id="breed"
                        name="breed"
                        value={editedPet?.breed || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="h-10 px-3"
                        placeholder="Порода"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Дата рождения</p>
                      <Input
                        id="birthDate"
                        name="birthDate"
                        value={editedPet?.birthDate || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="h-10 px-3"
                        placeholder="Дата рождения"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Badge className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Номер чипа</p>
                      <Input
                        id="chipNumber"
                        name="chipNumber"
                        value={editedPet?.chipNumber || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        className="h-10 px-3"
                        placeholder="Номер чипа"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 mb-2">
            <Button
              onClick={handleSave}
              variant="default"
              size="sm"
              disabled={saving}
              className="w-full">
              <Save className="h-4 w-4 mr-2" /> {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>
            <Button
              className="w-full"
              onClick={handleEditToggle}
              variant="outline"
              size="sm"
              disabled={saving}>
              <X className="h-4 w-4 mr-2" /> Отменить
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PetPage;
