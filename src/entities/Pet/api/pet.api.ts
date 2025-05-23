import apiInstance from '@/shared/api/api.instance';
import { IPet, IMedicalRecord } from '../types';
import { EPetType } from '@/shared/constants/pet.constants';
import { delay } from '@/shared/lib/utils/delay.utils';
import { petMedicalRecordsMock, petsMock } from '@/shared/mocks/pet.mock';

// Интерфейс для записи на прием
export interface IAppointmentRequest {
  vetId: string;
  petId: string;
  startTime: string;
  endTime: string;
  notes: string;
}

// Mock data for pets

// Simulate network delay

const petApi = {
  /**
   * Fetch all pets
   */

  getPets: async (): Promise<IPet[]> => {
    const response = await apiInstance.get<IPet[]>('/profiles/pets/my');
    return response.data;
  },

  /**
   * Get a pet by ID
   */
  getPetMedicalRecords: async (id: string): Promise<IMedicalRecord[]> => {
    await delay(600);
    console.log('id', id);
    return petMedicalRecordsMock;
  },

  /**
   * Add a new medical record to a pet
   */
  addMedicalRecord: async (petId: string, record: IMedicalRecord): Promise<boolean> => {
    console.log('petId', petId, record);
    await delay(600);
    return true;
  },

  /**
   * Create a new pet
   */
  createPet: async (pet: Omit<IPet, 'id'>): Promise<IPet> => {
    const response = await apiInstance.post<IPet>('/profiles/pets', pet);
    return response.data;
  },

  /**
   * Update an existing pet
   */
  updatePet: async (id: string, pet: Partial<IPet>): Promise<IPet> => {
    const response = await apiInstance.put<IPet>(`/profiles/pets/me/pets/${id}`, pet);
    return response.data;
  },

  /**
   * Delete a pet
   */
  deletePet: async (id: string): Promise<void> => {
    await delay(600);
    const petIndex = petsMock.findIndex((p) => p.id === id);
    if (petIndex >= 0) {
      petsMock.splice(petIndex, 1);
    } else {
      throw new Error(`Pet with id ${id} not found`);
    }
  },

  /**
   * Get pets by owner ID
   */
  //   getPetsByOwnerId: async (ownerId: string): Promise<IPet[]> => {
  //     await delay(800);
  //     return petsMock.filter((pet) => pet.owner.id === ownerId);
  //   },

  /**
   * Get pets by type
   */
  getPetsByType: async (type: EPetType): Promise<IPet[]> => {
    await delay(800);
    return petsMock.filter((pet) => pet.type === type);
  },

  getPetById: async (id: string): Promise<IPet> => {
    const response = await apiInstance.get<IPet>(`/profiles/pets/${id}`);
    return response.data;
  },

  /**
   * Book an appointment with a veterinarian
   */
  bookAppointment: async (
    appointmentData: IAppointmentRequest,
  ): Promise<{
    id: number;
    clinicId: string;
    vetId: string;
    petId: string;
    startTime: string;
    endTime: string;
    status: string;
    notes: string;
  }> => {
    try {
      const response = await apiInstance.post('/appointments/book', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Failed to book appointment:', error);
      throw error;
    }
  },
};

export default petApi;
