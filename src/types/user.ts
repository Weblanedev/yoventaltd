export type UserProfile = {
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
};

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  profile: UserProfile;
  createdAt: string;
};

export type PublicUser = Omit<UserRecord, 'passwordHash'>;
