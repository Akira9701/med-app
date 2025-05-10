export interface IUser {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  addressDto?: {
    city?: string;
    street?: string;
    building?: string;
  };
  pets?: {
    id: string;
    name: string;
    type: 'DOG';
  }[];
}
