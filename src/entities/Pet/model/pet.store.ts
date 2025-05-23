import { create } from 'zustand';
import { IPet } from '../types';
import { toast } from 'sonner';
import petApi from '../api/pet.api';

interface IPetStore {
  pets: IPet[];
  selectedPet: IPet | null;
  loading: boolean;
}

const usePetStore = create<IPetStore>(() => ({
  pets: [],
  selectedPet: null,
  loading: false,
}));

export const fetchPets = async () => {
  try {
    usePetStore.setState({ loading: true });
    const pets = await petApi.getPets();
    usePetStore.setState({ pets, loading: false });
  } catch (error) {
    console.error('Failed to fetch pets:', error);
    toast.error('Failed to fetch pets');
    usePetStore.setState({ loading: false });
  }
};

export const setSelectedPet = (pet: IPet) => {
  usePetStore.setState({ selectedPet: pet });
};

export const updatePet = async (id: string, settings: Partial<IPet>) => {
  try {
    usePetStore.setState({
      selectedPet: { ...usePetStore.getState().selectedPet, ...settings } as IPet,
      pets: usePetStore.getState().pets.map((p) => (p.id === id ? { ...p, ...settings } : p)),
    });
  } catch (error) {
    console.error('Failed to update pet:', error);
    toast.error('Failed to update pet');
  }
};

export default usePetStore;
